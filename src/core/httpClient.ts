import { SDKConfig } from "../types";

export class HttpClient {
    private readonly baseUrl: string;
    private readonly headers: Record<string, string>;
    private readonly defaultBodyParams: Record<string, any>;

    constructor(config: SDKConfig) {
        // 1. Validate Base URL
        if (!config.baseUrl) {
            throw new Error("SDKConfig Error: 'baseUrl' is required.");
        }

        // 2. SECURITY (STRIDE): Enforce HTTPS in production
        if (config.baseUrl.startsWith("http://") && !config.baseUrl.includes("localhost")) {
            throw new Error("Security Error: SDK must use HTTPS in production.");
        }

        // Remove trailing slash if present (to avoid double slashes later)
        //this.baseUrl = config.baseUrl.replace(/\/$/, "");
        this.baseUrl = "http://localhost:4000/api/access-key";
        // 3. Prepare Headers
        this.headers = {
            "Content-Type": "application/json",
            "User-Agent": "MyAppSDK/1.0.0"
        };

        // SECURITY: Spoof Origin for Node.js to pass 'validateDomain' middleware
        if (typeof window === 'undefined' && config.origin) {
            this.headers["Origin"] = config.origin;
        }

        // 4. Prepare Auth Body (CRITICAL STEP)
        // Your backend 'verifyAccessKeys.js' specifically looks for these snake_case names:
        this.defaultBodyParams = {
            access_key_client: config.accessKeyId,      // Maps to backend 'access_key_client'
            access_key_secret: config.secretAccessKey,  // Maps to backend 'access_key_secret'

            // Include project_id if it was provided in config
            ...(config.projectId && { project_id: config.projectId })
        };
    }

    public async post<T>(endpoint: string, body: any): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        // Merge the Auth keys with the user's specific request data
        const finalBody = {
            ...this.defaultBodyParams,
            ...body
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(finalBody),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            return (await response.json()) as T;
        } catch (error) {
            // SECURITY: Hide raw request details in error messages
            throw new Error(`SDK Request Failed: ${(error as Error).message}`);
        }
    }
}