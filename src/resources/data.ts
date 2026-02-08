import { HttpClient } from '../core/httpClient';
import { Endpoints, DEFAULT_CONFIG } from '../core/constants';
import { GetDataParams, DataResponse } from '../types';
import { ValidationError } from '../core/exceptions';

/**
 * Resource class for data retrieval operations.
 * Provides methods to query and retrieve sensor data from datatables.
 * 
 * @remarks
 * This class follows the Single Responsibility Principle by focusing solely
 * on data retrieval operations. It validates input and delegates HTTP
 * communication to HttpClient.
 */
export class DataResource {
    private readonly client: HttpClient;

    /**
     * Creates a new DataResource instance.
     * 
     * @param client - HTTP client for making API requests
     */
    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Retrieves data from a specified datatable with optional filtering and pagination.
     * 
     * @param params - Query parameters for data retrieval
     * @returns Promise resolving to data response containing query results
     * @throws {ValidationError} When required parameters are missing or invalid
     * @throws {AuthenticationError} When credentials are invalid
     * @throws {AuthorizationError} When lacking permissions
     * @throws {NotFoundError} When datatable is not found
     * @throws {NetworkError} When network connectivity fails
     * 
     * @example
     * ```typescript
     * // Retrieve all data from a datatable
     * const data = await client.data.list({
     *   table_name: 'temperature_sensors'
     * });
     * 
     * // Retrieve data with filtering and pagination
     * const filteredData = await client.data.list({
     *   table_name: 'temperature_sensors',
     *   devices: [1, 2, 3],
     *   page: 0,
     *   limit: 50,
     *   order: SortOrder.DESC
     * });
     * ```
     */
    public async list(params: GetDataParams): Promise<DataResponse> {
        // Validate required parameters
        this.validateParams(params);

        // Apply defaults for optional parameters
        const requestBody = {
            datatable_name: params.table_name,
            devices: params.devices || [],
            page: params.page ?? DEFAULT_CONFIG.DEFAULT_PAGE,
            limit: params.limit ?? DEFAULT_CONFIG.DEFAULT_LIMIT,
            order: params.order ?? DEFAULT_CONFIG.DEFAULT_ORDER,
        };

        // Validate limit doesn't exceed maximum
        if (requestBody.limit > DEFAULT_CONFIG.MAX_LIMIT) {
            throw new ValidationError(
                `Limit cannot exceed ${DEFAULT_CONFIG.MAX_LIMIT}. Requested: ${requestBody.limit}`
            );
        }

        return this.client.post<DataResponse>(Endpoints.DATA, requestBody);
    }

    /**
     * Validates data retrieval parameters.
     * 
     * @param params - Parameters to validate
     * @throws {ValidationError} When validation fails
     */
    private validateParams(params: GetDataParams): void {
        if (!params.table_name) {
            throw new ValidationError('table_name is required and cannot be empty.');
        }

        if (typeof params.table_name !== 'string') {
            throw new ValidationError('table_name must be a string.');
        }

        if (params.table_name.trim().length === 0) {
            throw new ValidationError('table_name cannot be empty or whitespace.');
        }

        if (params.page !== undefined && (params.page < 0 || !Number.isInteger(params.page))) {
            throw new ValidationError('page must be a non-negative integer.');
        }

        if (params.limit !== undefined && (params.limit <= 0 || !Number.isInteger(params.limit))) {
            throw new ValidationError('limit must be a positive integer.');
        }

        if (params.devices !== undefined) {
            if (!Array.isArray(params.devices)) {
                throw new ValidationError('devices must be an array.');
            }

            if (params.devices.some((id) => !Number.isInteger(id) || id <= 0)) {
                throw new ValidationError('All devices must be positive integers.');
            }
        }
    }
}
