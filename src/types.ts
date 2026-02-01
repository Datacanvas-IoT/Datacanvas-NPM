export interface SDKConfig {
    accessKeyId: string;
    secretAccessKey: string;
    projectId: number;
    origin?: string;
}

export interface GetDataParams {
    tableName: string;
    deviceIds?: number[];
    page?: number;
    limit?: number;
    order?: 'ASC' | 'DESC';
}

export interface DeviceResponse {
    success: boolean;
    devices: Device[];
}

export interface Device {
    device_id: number;
    device_name: string;
}

export interface DataResponse {
    count: number;
    data: Record<string, any[]>;
}