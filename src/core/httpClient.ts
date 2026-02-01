import { SDKConfig } from "../types";

export class HttpClient {
    private static readonly BASE_URL = "http://localhost:4000/api";
    private readonly headers: Record<string, string>;
    private readonly defaultBodyParams: Record<string, any>;

    constructor(config: SDKConfig) {
        this.headers = {
            "Content-Type": "application/json",
            "User-Agent": "Datacanvas/1.0.0"
        };

        // If running in Node.js, spoof Origin for middleware
        if (typeof window === "undefined" && config.origin) {
            this.headers["Origin"] = config.origin;
        }

        this.defaultBodyParams = {
            project_id: config.projectId,
            access_key_client: config.accessKeyId,
            access_key_secret: config.secretAccessKey
        };
    }

    public async post<T>(endpoint: string, body: any): Promise<T> {
        const url = `${HttpClient.BASE_URL}${endpoint}`;

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
