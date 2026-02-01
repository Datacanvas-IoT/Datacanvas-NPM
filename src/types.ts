export interface SDKConfig {
    baseUrl: string;
    accessKeyId: string;
    secretAccessKey: string;
    projectId: number; // Required for verifyAccessKeys middleware
    origin?: string;   // Required if using from Node.js (for domain validation)
}

export interface GetDataParams {
    tableName: string;      // Matches backend 'datatable_name'
    deviceIds?: number[];   // Matches backend 'devices'
    page?: number;          // Backend uses page instead of offset
    limit?: number;
    order?: 'ASC' | 'DESC';
}

export interface DeviceResponse {
    success: boolean;
    devices: Array<{
        device_id: number;
        device_name: string;
    }>;
}

export interface DataResponse {
    count: number;
    data: Record<string, any[]>; // Backend groups data by Device ID: { "123": [rows] }
}