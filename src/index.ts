import { DataCanvasConfig, DataRetrievalOptions, DevicesResponse, DataResponse, Endpoints } from './types';
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  ServerError,
  NetworkError,
  RateLimitError,
} from './exceptions';

export class DataCanvas {
  private config: DataCanvasConfig;
  private baseUrl: string;

  constructor(config: DataCanvasConfig) {
    this.config = config;
    this.baseUrl = "http://192.248.11.33/api/access-keys/external"
  }

  private async request<T>(endpoint: Endpoints, method: string, bodyData: any = {}): Promise<T> {
    const payload = {
      ...bodyData,
      access_key_client: this.config.access_key_client,
      access_key_secret: this.config.access_key_secret,
      project_id: this.config.project_id,
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        this.handleErrorResponse(response.status);
      }

      return response.json();
    } catch (error) {
      if (error instanceof AuthenticationError || 
          error instanceof AuthorizationError || 
          error instanceof NotFoundError || 
          error instanceof ValidationError || 
          error instanceof ServerError || 
          error instanceof RateLimitError) {
        throw error;
      }
      throw new NetworkError();
    }
  }

  private handleErrorResponse(status: number): never {
    switch (status) {
      case 401:
        throw new AuthenticationError();
      case 403:
        throw new AuthorizationError();
      case 404:
        throw new NotFoundError();
      case 400:
      case 422:
        throw new ValidationError();
      case 429:
        throw new RateLimitError();
      case 500:
      case 502:
      case 503:
      case 504:
        throw new ServerError();
      default:
        throw new ServerError();
    }
  }

  public async getAllDevices(): Promise<DevicesResponse> {
    return this.request<DevicesResponse>(Endpoints.DEVICES, 'POST');
  }

  public async getData(filters: DataRetrievalOptions): Promise<DataResponse> {
    const processedFilters = {
      ...filters,
      devices: filters.devices || [],
      page: filters.page || 0,
      limit: filters.limit || 10,
    };

    return this.request<DataResponse>(Endpoints.DATA, 'POST', processedFilters);
  }
}