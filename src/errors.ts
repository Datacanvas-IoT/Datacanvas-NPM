export class DataCanvasError extends Error {
  public readonly statusCode?: number;
  public readonly originalError?: any;

  constructor(message: string, statusCode?: number, originalError?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.originalError = originalError;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class AuthenticationError extends DataCanvasError {
  constructor(message: string = 'Authentication failed. Please check your access keys.', originalError?: any) {
    super(message, 401, originalError);
  }
}

export class AuthorizationError extends DataCanvasError {
  constructor(message: string = 'Authorization failed. Insufficient permissions or domain not allowed.', originalError?: any) {
    super(message, 403, originalError);
  }
}

export class NotFoundError extends DataCanvasError {
  constructor(message: string = 'Resource not found.', originalError?: any) {
    super(message, 404, originalError);
  }
}

export class ValidationError extends DataCanvasError {
  constructor(message: string = 'Invalid request parameters.', statusCode: number = 400, originalError?: any) {
    super(message, statusCode, originalError);
  }
}

export class RateLimitError extends DataCanvasError {
  constructor(message: string = 'Rate limit exceeded. Please wait before retrying.', originalError?: any) {
    super(message, 429, originalError);
  }
}

export class ServerError extends DataCanvasError {
  constructor(message: string = 'Internal server error. Please try again later.', statusCode: number = 500, originalError?: any) {
    super(message, statusCode, originalError);
  }
}

export class NetworkError extends DataCanvasError {
  constructor(message: string = 'Network error. Please check your connection.', originalError?: any) {
    super(message, undefined, originalError);
  }
}

export function mapErrorFromStatus(statusCode: number, message?: string, originalError?: any): DataCanvasError {
  const defaultMessage = message || `Request failed with status ${statusCode}`;

  switch (statusCode) {
    case 400:
    case 422:
      return new ValidationError(message || 'Invalid request parameters.', statusCode, originalError);
    case 401:
      return new AuthenticationError(message, originalError);
    case 403:
      return new AuthorizationError(message, originalError);
    case 404:
      return new NotFoundError(message, originalError);
    case 429:
      return new RateLimitError(message, originalError);
    case 500:
    case 502:
    case 503:
    case 504:
      return new ServerError(message || 'Internal server error.', statusCode, originalError);
    default:
      return new DataCanvasError(defaultMessage, statusCode, originalError);
  }
}
