export interface DataCanvasConfig {
  access_key_client: string;
  access_key_secret: string;
  project_id: number;
}

export interface DataRetrievalOptions {
  datatable_name: string;
  devices?: number[];
  page?: number;
  limit?: number;
}

export enum Endpoints {
    DEVICES = '/devices',
    DATA = '/data',
}

export interface Device {
  device_id: number;
  device_name: string;
}

export interface DevicesResponse {
  success: boolean;
  devices: Device[];
}

export interface DataPoint {
  id: number;
  device: number;
  [key: string]: any;
}

export interface DataResponse {
  count: number;
  data: {
    [deviceId: number]: DataPoint[];
  };
}