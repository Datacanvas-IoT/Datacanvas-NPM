import { SDKConfig } from '../types';
import {
    DataCanvasError,
    AuthenticationError,
    AuthorizationError,
    ValidationError,
    NotFoundError,
    RateLimitError,
    ServerError,
    NetworkError,
} from './exceptions';

/**
 * HTTP client for making requests to the DataCanvas API.
 * Handles authentication, error mapping, and request/response processing.
 * 
 * @remarks
 * This class follows the Single Responsibility Principle by focusing solely
 * on HTTP communication. It automatically injects authentication credentials
 * and maps HTTP status codes to appropriate error types.
 * 
 * The base URL can be customized via the SDKConfig for testing, regional endpoints,
 * or self-hosted DataCanvas instances. If not provided, it defaults to the standard
 * DataCanvas API endpoint.
 */
export class HttpClient {
    private static readonly DEFAULT_BASE_URL = 'http://192.248.11.33/api';
    
    private readonly baseUrl: string;
    private readonly headers: Record<string, string>;
    private readonly credentials: {
        project_id: number;
        access_key_client: string;
        access_key_secret: string;
    };

    /**
     * Creates a new HttpClient instance.
     * 
     * @param config - SDK configuration containing credentials and optional base URL.
     *                 If baseUrl is not provided, uses the default DataCanvas API endpoint.
     */
    constructor(config: SDKConfig) {
        this.baseUrl = config.base_url || HttpClient.DEFAULT_BASE_URL;
        
        this.headers = {
            'Content-Type': 'application/json',
            'User-Agent': '@datacanvas/sdk/1.0.0',
        };

        this.credentials = {
            project_id: config.project_id,
            access_key_client: config.access_key_client,
            access_key_secret: config.access_key_secret,
        };
    }

    /**
     * Executes a POST request to the specified endpoint.
     * Automatically injects authentication credentials into the request body.
     * 
     * @template T - Expected response type
     * @param endpoint - API endpoint path
     * @param body - Request body data (credentials will be merged automatically)
     * @returns Promise resolving to the typed response
     * @throws {AuthenticationError} When credentials are invalid (401)
     * @throws {AuthorizationError} When lacking permissions (403)
     * @throws {ValidationError} When request validation fails (400, 422)
     * @throws {NotFoundError} When resource is not found (404)
     * @throws {RateLimitError} When rate limit is exceeded (429)
     * @throws {ServerError} When server encounters an error (500+)
     * @throws {NetworkError} When network connectivity fails
     */
    public async post<T>(endpoint: string, body: Record<string, any> = {}): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        // Merge credentials with request body (credentials override user data)
        const requestBody = {
            ...body,
            ...this.credentials,
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(requestBody),
            });

            // Handle non-OK HTTP responses
            if (!response.ok) {
                await this.handleErrorResponse(response);
            }

            return (await response.json()) as T;
        } catch (error) {
            // Re-throw known DataCanvas errors
            if (error instanceof DataCanvasError) {
                throw error;
            }

            // Wrap unknown errors as NetworkError
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            throw new NetworkError(`Network request failed: ${errorMessage}`);
        }
    }

    /**
     * Maps HTTP status codes to appropriate error types and throws them.
     * This method never returns normally (return type: never).
     * 
     * @param response - The failed HTTP response
     * @throws Appropriate error based on HTTP status code
     */
    private async handleErrorResponse(response: Response): Promise<never> {
        const status = response.status;
        let errorMessage: string;

        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || 'An error occurred';
        } catch {
            errorMessage = response.statusText || 'An error occurred';
        }

        // Map HTTP status codes to specific error types
        switch (status) {
            case 401:
                throw new AuthenticationError(errorMessage);
            
            case 403:
                throw new AuthorizationError(errorMessage);
            
            case 400:
            case 422:
                throw new ValidationError(errorMessage);
            
            case 404:
                throw new NotFoundError(errorMessage);
            
            case 429:
                throw new RateLimitError(errorMessage);
            
            case 500:
            case 502:
            case 503:
            case 504:
                throw new ServerError(errorMessage);
            
            default:
                // Fallback for unexpected status codes
                if (status >= 500) {
                    throw new ServerError(errorMessage);
                } else if (status >= 400) {
                    throw new ValidationError(errorMessage);
                }
                throw new DataCanvasError(errorMessage);
        }
    }
}
