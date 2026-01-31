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
        // Validation: This is a client-side check to save an API call
        if (!params.datatableId) {
            throw new Error("SDK Error: datatableId is required.");
        }

        return this.client.post<DataResponse>("/external/data", {
            // Map SDK params to API snake_case fields
            datatable_id: params.datatableId,
            device_id: params.deviceId,
            start_time: params.startTime,
            end_time: params.endTime,
            columns: params.columns,
            sort: params.sort,
            filters: params.filters,
            limit: params.limit,
            offset: params.offset
        });
    }
}