/**
 * DataCanvas SDK Type Definitions
 */

/**
 * Configuration for initializing the DataCanvas client
 */
export interface DataCanvasConfig {
  /**
   * Your DataCanvas client access key
   */
  access_key_client: string;

  /**
   * Your DataCanvas secret access key
   */
  access_key_secret: string;

  /**
   * Your DataCanvas project ID
   */
  project_id: number;

  /**
   * Optional: Custom base URL for DataCanvas API
   * @default http://localhost:3001
   */
  baseUrl?: string;

  /**
   * Optional: Request timeout in milliseconds
   * @default 30000
   */
  timeout?: number;
}

/**
 * Represents an IoT device in DataCanvas
 */
export interface Device {
  /**
   * Unique identifier for the device
   */
  device_id: number;

  /**
   * Human-readable name of the device
   */
  device_name: string;
}

/**
 * Response from getAllDevices() method
 */
export interface DevicesResponse {
  /**
   * Indicates if the request was successful
   */
  success: boolean;

  /**
   * Array of devices in the project
   */
  devices: Device[];
}

/**
 * A single data point from a device
 */
export interface DataPoint {
  /**
   * Unique identifier for the data point
   */
  id: number;

  /**
   * Device ID this data point belongs to
   */
  device: number;

  /**
   * Additional fields specific to your datatable
   * These fields are dynamic and depend on your datatable schema
   */
  [key: string]: any;
}

/**
 * Response from getData() method
 */
export interface DataResponse {
  /**
   * Total count of data points across all devices
   */
  count: number;

  /**
   * Data grouped by device ID
   * Key: device_id, Value: array of data points
   */
  data: {
    [deviceId: number]: DataPoint[];
  };
}

/**
 * Options for retrieving data from devices
 */
export interface DataRetrievalOptions {
  /**
   * Name of the datatable to query
   */
  datatable_name: string;

  /**
   * Optional: Array of device IDs to retrieve data from
   * If not provided or empty, data from all devices will be retrieved
   * @default []
   */
  devices?: number[];

  /**
   * Optional: Page number for pagination (0-indexed)
   * @default 0
   */
  page?: number;

  /**
   * Optional: Number of records per page
   * @default 10
   */
  limit?: number;
}

/**
 * Internal request payload for authentication
 */
export interface AuthPayload {
  project_id: number;
  access_key_client: string;
  access_key_secret: string;
}
