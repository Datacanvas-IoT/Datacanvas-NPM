import { HttpClient } from './core/httpClient';
import { DevicesResource } from './resources/devices';
import { DataResource } from './resources/data';
import { SDKConfig } from './types';

/**
 * DataCanvas SDK - Main client for interacting with the DataCanvas IoT platform.
 * 
 * @example
 * ```typescript
 * import { DataCanvas, SortOrder } from 'datacanvas-sdk';
 * 
 * // Initialize SDK with default API endpoint
 * const client = new DataCanvas({
 *   access_key_client: process.env.DATACANVAS_ACCESS_KEY_ID!,
 *   access_key_secret: process.env.DATACANVAS_SECRET_KEY!,
 *   project_id: parseInt(process.env.DATACANVAS_PROJECT_ID!),
 * });
 * 
 * // Or with a custom base URL (e.g., for testing or self-hosted instances)
 * const customClient = new DataCanvas({
 *   access_key_client: process.env.DATACANVAS_ACCESS_KEY_ID!,
 *   access_key_secret: process.env.DATACANVAS_SECRET_KEY!,
 *   project_id: parseInt(process.env.DATACANVAS_PROJECT_ID!),
 *   base_url: 'https://api.<something>.<something>',
 * });
 * 
 * // List all devices
 * const devices = await client.devices.list();
 * 
 * // Retrieve data with filtering
 * const data = await client.data.list({
 *   table_name: 'temperature_sensors',
 *   devices: [1, 2, 3],
 *   limit: 50,
 *   order: SortOrder.DESC,
 * });
 * ```
 */
export class DataCanvas {
    /**
     * Resource for device management operations.
     * Provides methods to list and interact with IoT devices.
     */
    public readonly devices: DevicesResource;

    /**
     * Resource for data retrieval operations.
     * Provides methods to query sensor data from datatables.
     */
    public readonly data: DataResource;

    private readonly httpClient: HttpClient;

    /**
     * Creates a new DataCanvas SDK instance.
     * 
     * @param config - SDK configuration containing authentication credentials and optional base URL
     * @throws {ValidationError} When configuration is invalid
     * 
     * @example
     * ```typescript
     * // Using default API endpoint
     * const client = new DataCanvas({
     *   access_key_client: 'your-access-key-id',
     *   access_key_secret: 'your-secret-key',
     *   project_id: 123,
     * });
     * 
     * // Using custom API endpoint
     * const customClient = new DataCanvas({
     *   access_key_client: 'your-access-key-id',
     *   access_key_secret: 'your-secret-key',
     *   project_id: 123,
     *   base_url: 'https://custom.<something>.<something>/api',
     * });
     * ```
     */
    constructor(config: SDKConfig) {
        // Validate configuration
        this.validateConfig(config);

        // Initialize HTTP client with configuration
        this.httpClient = new HttpClient(config);

        // Initialize resource classes with dependency injection
        this.devices = new DevicesResource(this.httpClient);
        this.data = new DataResource(this.httpClient);
    }

    /**
     * Validates SDK configuration parameters.
     * 
     * @param config - Configuration to validate
     * @throws {Error} When configuration is invalid
     */
    private validateConfig(config: SDKConfig): void {
        if (!config.access_key_client || typeof config.access_key_client !== 'string') {
            throw new Error('Invalid configuration: access_key_client is required and must be a string.');
        }

        if (!config.access_key_secret || typeof config.access_key_secret !== 'string') {
            throw new Error('Invalid configuration: access_key_secret is required and must be a string.');
        }

        if (!config.project_id || !Number.isInteger(config.project_id) || config.project_id <= 0) {
            throw new Error('Invalid configuration: project_id is required and must be a positive integer.');
        }
    }
}

// Export all type definitions
export * from './types';

// Export all constants and enums
export * from './core/constants';

// Export all error classes
export * from './core/exceptions';
