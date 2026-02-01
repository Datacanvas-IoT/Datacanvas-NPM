import { SDKConfig } from "../types";

export class HttpClient {
    private readonly baseUrl: string;
    private readonly headers: Record<string, string>;
    private readonly defaultBodyParams: Record<string, any>;

    constructor(config: SDKConfig) {
        if (!config.baseUrl) {
            throw new Error("SDKConfig Error: 'baseUrl' is required.");
        }

        // Enforce HTTPS for non-localhost
        if (config.baseUrl.startsWith("http://") && !config.baseUrl.includes("localhost")) {
            throw new Error("Security Error: SDK must use HTTPS in production.");
        }

        this.baseUrl = config.baseUrl.replace(/\/$/, "");

        this.headers = {
            "Content-Type": "application/json",
            "User-Agent": "MyAppSDK/1.0.0"
        };

        // If running in Node.js, we must spoof the Origin for the 'validateDomain' middleware
        if (typeof window === 'undefined' && config.origin) {
            this.headers["Origin"] = config.origin;
        }

        // FIXED: Mapping to backend's verifyAccessKeys.js expectations
        this.defaultBodyParams = {
            project_id: config.projectId,
            access_key_client: config.accessKeyId,     // Matches backend variable
            access_key_secret: config.secretAccessKey  // Matches backend variable
        };
    }

    public async post<T>(endpoint: string, body: any): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        // Merge Auth keys with request data
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

            const data = await response.json();

            if (!response.ok) {

                throw new Error(data.message || `API Error: ${response.status}`);
            }

            return data as T;
        } catch (error) {
            throw new Error(`SDK Request Failed: ${(error as Error).message}`);
        }
    }
}