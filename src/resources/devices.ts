import { HttpClient } from '../core/httpClient';
import { Endpoints } from '../core/constants';
import { DeviceResponse } from '../types';

/**
 * Resource class for device management operations.
 * Provides methods to interact with IoT devices in the DataCanvas platform.
 * 
 * @remarks
 * This class follows the Single Responsibility Principle by focusing solely
 * on device-related operations. It delegates HTTP communication to HttpClient.
 */
export class DevicesResource {
    private readonly client: HttpClient;

    /**
     * Creates a new DevicesResource instance.
     * 
     * @param client - HTTP client for making API requests
     */
    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Retrieves all devices associated with the configured project.
     * 
     * @returns Promise resolving to device response containing all devices
     * @throws {AuthenticationError} When credentials are invalid
     * @throws {AuthorizationError} When lacking permissions
     * @throws {NetworkError} When network connectivity fails
     * 
     * @example
     * ```typescript
     * const devices = await client.devices.list();
     * console.log(`Found ${devices.devices.length} devices`);
     * ```
     */
    public async list(): Promise<DeviceResponse> {
        return this.client.post<DeviceResponse>(Endpoints.DEVICES, {});
    }
}
