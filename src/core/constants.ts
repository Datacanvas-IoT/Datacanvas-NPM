/**
 * API endpoint paths used by the DataCanvas SDK.
 * Centralized endpoint management for maintainability.
 */
export enum Endpoints {
    /** Endpoint for device management operations */
    DEVICES = '/access-keys/external/devices',
    
    /** Endpoint for data retrieval operations */
    DATA = '/access-keys/external/data',
}

/**
 * Supported HTTP methods for API requests.
 */
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
}

/**
 * Sort order options for data queries.
 */
export enum SortOrder {
    /** Ascending order (oldest to newest, A-Z) */
    ASC = 'ASC',
    
    /** Descending order (newest to oldest, Z-A) */
    DESC = 'DESC',
}

/**
 * Default configuration values for the SDK.
 */
export const DEFAULT_CONFIG = {
    /** Default page number for pagination (0-indexed) */
    DEFAULT_PAGE: 0,
    
    /** Default number of items per page */
    DEFAULT_LIMIT: 20,
    
    /** Default sort order for data retrieval */
    DEFAULT_ORDER: SortOrder.DESC,
    
    /** Maximum items per page to prevent excessive data retrieval */
    MAX_LIMIT: 1000,
} as const;
