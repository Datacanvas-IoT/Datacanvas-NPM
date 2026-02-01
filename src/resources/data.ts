import { HttpClient } from "../core/httpClient";
import { GetDataParams, DataResponse } from "../types";

export class DataResource {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Fetch rows from a datatable.
     */
    public async list(params: GetDataParams): Promise<DataResponse> {
        // FIXED: Backend uses 'datatable_name' to find the table
        if (!params.tableName) {
            throw new Error("SDK Error: tableName is required.");
        }

        return this.client.post<DataResponse>("/access-keys/external/data", {
            datatable_name: params.tableName,
            devices: params.deviceIds, // Backend expects 'devices' as an array of IDs
            page: params.page || 0,    // Backend uses page-based pagination
            limit: params.limit || 20,
            order: params.order || 'DESC'
        });
    }
}