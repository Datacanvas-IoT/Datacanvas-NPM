/**
 * Base error class for all DataCanvas SDK errors.
 * Extends the native JavaScript Error class to maintain stack traces.
 */
export class DataCanvasError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DataCanvasError';
        
        // Maintains proper stack trace for where error was thrown (V8 engines only)
        const errorConstructor = Error as typeof Error & {
            captureStackTrace?: (target: object, constructor: Function) => void;
        };
        
        if (errorConstructor.captureStackTrace) {
            errorConstructor.captureStackTrace(this, this.constructor);
        }
        
        // Ensures proper prototype chain in ES5/ES6 transpilation
        Object.setPrototypeOf(this, DataCanvasError.prototype);
    }
}

/**
 * Thrown when authentication credentials are invalid or missing.
 * HTTP Status: 401 Unauthorized
 */
export class AuthenticationError extends DataCanvasError {
    constructor(message: string = 'Authentication failed. Invalid access key or secret.') {
        super(message);
        this.name = 'AuthenticationError';
    }
}

/**
 * Thrown when the authenticated user lacks permission for the requested resource.
 * HTTP Status: 403 Forbidden
 */
export class AuthorizationError extends DataCanvasError {
    constructor(message: string = 'Authorization failed. Insufficient permissions.') {
        super(message);
        this.name = 'AuthorizationError';
    }
}

/**
 * Thrown when request parameters fail validation.
 * HTTP Status: 400 Bad Request, 422 Unprocessable Entity
 */
export class ValidationError extends DataCanvasError {
    constructor(message: string = 'Validation failed. Invalid request parameters.') {
        super(message);
        this.name = 'ValidationError';
    }
}

/**
 * Thrown when the requested resource cannot be found.
 * HTTP Status: 404 Not Found
 */
export class NotFoundError extends DataCanvasError {
    constructor(resource: string = 'Resource') {
        super(`${resource} not found.`);
        this.name = 'NotFoundError';
    }
}

/**
 * Thrown when rate limiting threshold is exceeded.
 * HTTP Status: 429 Too Many Requests
 */
export class RateLimitError extends DataCanvasError {
    constructor(message: string = 'Rate limit exceeded. Please wait before making more requests.') {
        super(message);
        this.name = 'RateLimitError';
    }
}

/**
 * Thrown when the server encounters an internal error.
 * HTTP Status: 500+ Server Errors
 */
export class ServerError extends DataCanvasError {
    constructor(message: string = 'Server error occurred. Please try again later.') {
        super(message);
        this.name = 'ServerError';
    }
}

/**
 * Thrown when a network-level error occurs (connection timeout, DNS failure, etc.).
 * Used for non-HTTP errors like network connectivity issues.
 */
export class NetworkError extends DataCanvasError {
    constructor(message: string = 'Network error. Please check your connection and try again.') {
        super(message);
        this.name = 'NetworkError';
    }
}
