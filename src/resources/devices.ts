import { HttpClient } from "../core/httpClient";
import { DeviceResponse } from "../types";

export class DevicesResource {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Fetch all devices associated with the project.
     */
    public async list(): Promise<DeviceResponse> {
        // The project_id is automatically injected by HttpClient defaultBodyParams
        return this.client.post<DeviceResponse>("/access-keys/external/devices", {});
    }
}