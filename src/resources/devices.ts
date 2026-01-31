import { HttpClient } from "../core/httpClient";
import { GetDevicesParams, DeviceResponse } from "../types";

export class DevicesResource {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Fetch a list of devices.
     * @param params - Optional filters (limit, offset, specific device IDs)
     */
    public async list(params: GetDevicesParams = {}): Promise<DeviceResponse> {
        return this.client.post<DeviceResponse>("/external/devices", {
            project_id: params.projectId,
            device_id_array: params.deviceIds,
            include_inactive: params.includeInactive,
            limit: params.limit,
            offset: params.offset
        });
    }
}