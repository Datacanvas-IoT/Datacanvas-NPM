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

        if (!params.tableName) {
            throw new Error("SDK Error: tableName is required.");
        }
        return this.client.post<DataResponse>("/access-keys/external/data", {
            datatable_name: params.tableName,
            devices: params.deviceIds,
            page: params.page || 0,
            limit: params.limit || 20,
            order: params.order || 'DESC'
        });
    }
}