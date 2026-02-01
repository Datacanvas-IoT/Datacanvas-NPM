import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  DataCanvasConfig,
  DevicesResponse,
  DataResponse,
  DataRetrievalOptions,
  AuthPayload,
} from './types';
import { DataCanvasError, NetworkError, mapErrorFromStatus } from './errors';
import { DEFAULT_BASE_URL, ENDPOINTS, DEFAULT_PAGE, DEFAULT_LIMIT, REQUEST_TIMEOUT } from './constants';

export class DataCanvas {
  private readonly config: Required<Omit<DataCanvasConfig, 'baseUrl' | 'timeout'>> & {
    baseUrl: string;
    timeout: number;
  };
  private readonly axiosInstance: AxiosInstance;

  /**
   * Creates a new DataCanvas client instance
   * 
   * @param config - Configuration object with authentication credentials
   * @throws {Error} If required configuration parameters are missing
   */
  constructor(config: DataCanvasConfig) {
    // Validate required fields
    if (!config.access_key_client) {
      throw new Error('access_key_client is required');
    }
    if (!config.access_key_secret) {
      throw new Error('access_key_secret is required');
    }
    if (!config.project_id) {
      throw new Error('project_id is required');
    }

    // Store configuration with defaults
    this.config = {
      access_key_client: config.access_key_client,
      access_key_secret: config.access_key_secret,
      project_id: config.project_id,
      baseUrl: config.baseUrl || DEFAULT_BASE_URL,
      timeout: config.timeout || REQUEST_TIMEOUT,
    };

    this.axiosInstance = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  private getAuthPayload(): AuthPayload {
    return {
      project_id: this.config.project_id,
      access_key_client: this.config.access_key_client,
      access_key_secret: this.config.access_key_secret,
    };
  }

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (!axiosError.response) {
        throw new NetworkError(axiosError.message || 'Network error occurred', axiosError);
      }
      const status = axiosError.response.status;
      const message = (axiosError.response.data as any)?.message || axiosError.message;
      throw mapErrorFromStatus(status, message, axiosError);
    }
    throw new DataCanvasError('An unexpected error occurred', undefined, error);
  }

  async getAllDevices(): Promise<DevicesResponse> {
    try {
      const response = await this.axiosInstance.post<DevicesResponse>(ENDPOINTS.DEVICES, this.getAuthPayload());
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getData(options: DataRetrievalOptions): Promise<DataResponse> {
    try {
      if (!options.datatable_name) throw new Error('datatable_name is required');

      const payload = {
        ...this.getAuthPayload(),
        datatable_name: options.datatable_name,
        devices: options.devices || [],
        page: options.page ?? DEFAULT_PAGE,
        limit: options.limit ?? DEFAULT_LIMIT,
      };

      const response = await this.axiosInstance.post<DataResponse>(ENDPOINTS.DATA, payload);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  getBaseUrl(): string {
    return this.config.baseUrl;
  }

  getProjectId(): number {
    return this.config.project_id;
  }
}

// Export all types and errors for convenience
export * from './types';
export * from './errors';
export * from './constants';
