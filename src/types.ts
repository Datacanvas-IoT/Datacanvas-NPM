import { SortOrder } from './core/constants';

/**
 * Configuration options for initializing the DataCanvas SDK.
 * All credentials should be obtained from the DataCanvas dashboard.
 */
export interface SDKConfig {
    /** Client access key ID for API authentication */
    access_key_client: string;
    
    /** Secret access key for API authentication */
    access_key_secret: string;
    
    /** Project ID to scope API requests */
    project_id: number;
    
    /** 
     * Optional custom base URL for the DataCanvas API.
     * If not provided, defaults to the standard DataCanvas API endpoint.
     * Useful for testing, regional endpoints, or self-hosted instances.
     * 
     * @example 'https://api.<something>.<something>'
     * @example 'http://localhost:3000/api'
     */
    base_url?: string;
}

/**
 * Parameters for retrieving data from a datatable.
 * Only tableName is required as mandatory; other parameters have sensible defaults.
 */
export interface GetDataParams {
    /** Name of the datatable to query (required) */
    table_name: string;
    
    /** Optional array of device IDs to filter results */
    devices?: number[];
    
    /** Page number for pagination (0-indexed, default: 0) */
    page?: number;
    
    /** Number of items per page (default: 20, max: 1000) */
    limit?: number;
    
    /** Sort order for results (default: DESC) */
    order?: SortOrder;
}

/**
 * Response structure for device listing operations.
 */
export interface DeviceResponse {
    /** Indicates if the request was successful */
    success: boolean;
    
    /** Array of devices associated with the project */
    devices: Device[];
}

/**
 * Represents an IoT device in the DataCanvas platform.
 */
export interface Device {
    /** Unique identifier for the device */
    device_id: number;
    
    /** Human-readable name for the device */
    device_name: string;
}

/**
 * Response structure for data retrieval operations.
 */
export interface DataResponse {
    /** Total number of records matching the query */
    count: number;
    
    /** 
     * Data organized by device ID.
     * Each key is a device ID (as string), and the value is an array of data points.
     */
    data: Record<string, DataPoint[]>;
}

/**
 * Represents a single data point from a device.
 * Contains standard fields plus dynamic fields based on the datatable schema.
 */
export interface DataPoint {
    /** Unique identifier for the data point */
    id: number;
    
    /** Device ID that generated this data point */
    device: number;
    
    /** 
     * Additional dynamic fields from the datatable.
     * Field names and types depend on the datatable schema.
     */
    [key: string]: any;
}