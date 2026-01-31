export interface SDKConfig {
    baseUrl: string;
    accessKeyId: string;
    secretAccessKey: string;
    projectId?: number;
    origin?: string;
}

export interface PaginationParams {
    limit?: number;
    offset?: number;
}

export interface GetDevicesParams extends PaginationParams {
    projectId?: number;
    deviceIds?: number[];
    includeInactive?: boolean;
}

export interface GetDataParams extends PaginationParams {
    datatableId: number;
    deviceId?: number;
    startTime?: string;
    endTime?: string;
    columns?: string[];
    sort?: Record<string, "asc" | "desc">;
    filters?: Record<string, any>;
}

// Generic responses based on your backend structure
export interface DeviceResponse {
    success: boolean;
    count: number;
    devices: any[];
}

export interface DataResponse {
    success: boolean;
    count: number;
    data: any[];
    columns: any[];
}