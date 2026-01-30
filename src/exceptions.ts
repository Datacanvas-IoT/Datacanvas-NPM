export class DataCanvasError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DataCanvasError';
  }
}

export class AuthenticationError extends DataCanvasError {
  constructor() {
    super('Authentication failed. Invalid access key or secret.');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends DataCanvasError {
  constructor() {
    super('Access denied. Insufficient permissions.');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends DataCanvasError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found.`);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends DataCanvasError {
  constructor() {
    super('Invalid request parameters.');
    this.name = 'ValidationError';
  }
}

export class ServerError extends DataCanvasError {
  constructor() {
    super('Internal server error. Please try again later.');
    this.name = 'ServerError';
  }
}

export class NetworkError extends DataCanvasError {
  constructor() {
    super('Network error. Please check your connection.');
    this.name = 'NetworkError';
  }
}

export class RateLimitError extends DataCanvasError {
  constructor() {
    super('Rate limit exceeded. Please try again later.');
    this.name = 'RateLimitError';
  }
}
