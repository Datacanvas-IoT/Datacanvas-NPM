export const DEFAULT_BASE_URL = process.env.DATACANVAS_API_URL || 'http://localhost:3001';

export const ENDPOINTS = {
  DEVICES: '/api/access-keys/external/devices',
  DATA: '/api/access-keys/external/data',
} as const;

export const DEFAULT_PAGE = 0;
export const DEFAULT_LIMIT = 10;
export const REQUEST_TIMEOUT = 30000;
