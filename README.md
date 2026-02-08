# DataCanvas SDK for Node.js

[![npm version](https://img.shields.io/npm/v/datacanvas-sdk.svg)](https://www.npmjs.com/package/datacanvas-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

Official Node.js SDK for the **DataCanvas IoT Platform**. A modern, type-safe, and resource-based client library for seamless integration with DataCanvas API.

## ✨ Features

- 🎯 **Resource-Based Architecture** - Intuitive API organized by domain concepts
- 🔒 **Type-Safe** - Full TypeScript support with comprehensive type definitions
- ⚡ **Modern** - Built with ES2020+, supports both ESM and CommonJS
- 🛡️ **Robust Error Handling** - Comprehensive error hierarchy for precise error management
- 📦 **Zero Dependencies** - Uses native `fetch` API for minimal bundle size

## 📦 Installation

```bash
npm install datacanvas-sdk
```

```bash
yarn add datacanvas-sdk
```

```bash
pnpm add datacanvas-sdk
```

## 🚀 Quick Start

### TypeScript / ES Modules

```typescript
import { DataCanvas, SortOrder } from 'datacanvas-sdk';

// Initialize SDK with default API endpoint
const client = new DataCanvas({
  access_key_client: process.env.DATACANVAS_ACCESS_KEY_ID!,
  access_key_secret: process.env.DATACANVAS_SECRET_KEY!,
  projectId: parseInt(process.env.DATACANVAS_PROJECT_ID!),
});

// Or with a custom base URL (optional)
const customClient = new DataCanvas({
  access_key_client: process.env.DATACANVAS_ACCESS_KEY_ID!,
  access_key_secret: process.env.DATACANVAS_SECRET_KEY!,
  projectId: parseInt(process.env.DATACANVAS_PROJECT_ID!),
  baseUrl: 'https://api.<something>.<something>', // Optional: for regional endpoints or self-hosted instances
});

// List all devices
const devices = await client.devices.list();
console.log(`Found ${devices.devices.length} devices`);

// Retrieve data from a datatable
const data = await client.data.list({
  tableName: 'temperature_sensors',
  deviceIds: [1, 2, 3],
  page: 0,
  limit: 50,
  order: SortOrder.DESC,
});
console.log(`Retrieved ${data.count} data points`);
```

### JavaScript / CommonJS

```javascript
const { DataCanvas, SortOrder } = require('datacanvas-sdk');

// Initialize SDK with default API endpoint
const client = new DataCanvas({
  access_key_client: process.env.DATACANVAS_ACCESS_KEY_ID,
  access_key_secret: process.env.DATACANVAS_SECRET_KEY,
  projectId: parseInt(process.env.DATACANVAS_PROJECT_ID),
});

// Or with a custom base URL (optional)
const customClient = new DataCanvas({
  access_key_client: process.env.DATACANVAS_ACCESS_KEY_ID,
  access_key_secret: process.env.DATACANVAS_SECRET_KEY,
  projectId: parseInt(process.env.DATACANVAS_PROJECT_ID),
  baseUrl: 'https://api.<something>.<something>', // Optional
});

// Use async/await in an async function
async function main() {
  const devices = await client.devices.list();
  console.log(`Found ${devices.devices.length} devices`);
}

main().catch(console.error);
```

## 📚 API Reference

### Configuration

#### `new DataCanvas(config: SDKConfig)`

Creates a new SDK instance with the provided configuration.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `access_key_client` | `string` | ✅ | Client access key ID from DataCanvas dashboard |
| `access_key_secret` | `string` | ✅ | Secret access key for authentication |
| `projectId` | `number` | ✅ | Project ID to scope API requests |
| `baseUrl` | `string` | ❌ | Custom API base URL (defaults to standard DataCanvas endpoint) |

**Example:**

```typescript
// Using default API endpoint
const client = new DataCanvas({
  access_key_client: 'your-access-key-id',
  access_key_secret: 'your-secret-key',
  projectId: 123,
});

// Using custom API endpoint (for testing or self-hosted instances)
const customClient = new DataCanvas({
  access_key_client: 'your-access-key-id',
  access_key_secret: 'your-secret-key',
  projectId: 123,
  baseUrl: 'https://custom.<something>.<something>/api',
});
```

---

### Device Management

#### `client.devices.list(): Promise<DeviceResponse>`

Retrieves all devices associated with the configured project.

**Returns:** `Promise<DeviceResponse>`

**Example:**

```typescript
const response = await client.devices.list();

response.devices.forEach(device => {
  console.log(`Device: ${device.device_name} (ID: ${device.device_id})`);
});
```

**Response Type:**

```typescript
interface DeviceResponse {
  success: boolean;
  devices: Device[];
}

interface Device {
  device_id: number;
  device_name: string;
}
```

---

### Data Retrieval

#### `client.data.list(params: GetDataParams): Promise<DataResponse>`

Retrieves data from a specified datatable with optional filtering and pagination.

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `tableName` | `string` | ✅ | - | Name of the datatable to query |
| `deviceIds` | `number[]` | ❌ | `[]` | Array of device IDs to filter |
| `page` | `number` | ❌ | `0` | Page number (0-indexed) |
| `limit` | `number` | ❌ | `20` | Items per page (max: 1000) |
| `order` | `SortOrder` | ❌ | `DESC` | Sort order (ASC or DESC) |

**Returns:** `Promise<DataResponse>`

**Example:**

```typescript
import { SortOrder } from 'datacanvas-sdk';

// Retrieve all data
const allData = await client.data.list({
  tableName: 'temperature_sensors',
});

// Retrieve with filtering and pagination
const filteredData = await client.data.list({
  tableName: 'temperature_sensors',
  deviceIds: [1, 2, 3],
  page: 0,
  limit: 50,
  order: SortOrder.DESC,
});

console.log(`Total records: ${filteredData.count}`);

// Process data by device
Object.entries(filteredData.data).forEach(([deviceId, dataPoints]) => {
  console.log(`Device ${deviceId}: ${dataPoints.length} data points`);
  dataPoints.forEach(point => {
    console.log(`  - Value: ${point.value}, Timestamp: ${point.timestamp}`);
  });
});
```

**Response Type:**

```typescript
interface DataResponse {
  count: number;
  data: Record<string, DataPoint[]>;
}

interface DataPoint {
  id: number;
  device: number;
  [key: string]: any; // Dynamic fields from datatable schema
}
```

---

## 🛡️ Error Handling

The SDK provides comprehensive error handling with specific error types for different scenarios.

### Error Types

| Error Class | Description | HTTP Status |
|-------------|-------------|-------------|
| `AuthenticationError` | Invalid credentials | 401 |
| `AuthorizationError` | Insufficient permissions | 403 |
| `ValidationError` | Invalid request parameters | 400, 422 |
| `NotFoundError` | Resource not found | 404 |
| `RateLimitError` | Rate limit exceeded | 429 |
| `ServerError` | Server-side error | 500+ |
| `NetworkError` | Network connectivity issue | - |

### Handling Errors

```typescript
import {
  DataCanvas,
  AuthenticationError,
  ValidationError,
  RateLimitError,
  NetworkError,
} from 'datacanvas-sdk';

try {
  const data = await client.data.list({
    tableName: 'sensors',
    limit: 100,
  });
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Authentication failed. Check your credentials.');
    // Redirect to login or refresh tokens
  } else if (error instanceof ValidationError) {
    console.error('Invalid request:', error.message);
    // Show validation error to user
  } else if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded. Please wait.');
    // Implement retry with exponential backoff
  } else if (error instanceof NetworkError) {
    console.error('Network error:', error.message);
    // Show offline UI or retry
  } else {
    console.error('Unexpected error:', error);
  }
}
```

---

## 🏗️ Architecture

The SDK follows a **resource-based OOP architecture** with clear separation of concerns:

```
DataCanvas SDK
├── DataCanvas (Main Client)
│   ├── devices (DevicesResource)
│   └── data (DataResource)
├── HttpClient (HTTP Communication)
├── Exceptions (Error Hierarchy)
├── Constants (Enums & Defaults)
└── Types (TypeScript Definitions)
```

---

## 📄 TypeScript Support

The SDK is written in TypeScript and provides comprehensive type definitions.

```typescript
import type {
  SDKConfig,
  DeviceResponse,
  Device,
  DataResponse,
  DataPoint,
  GetDataParams,
} from 'datacanvas-sdk';

// All types are exported and available for use
const config: SDKConfig = {
  access_key_client: 'key',
  access_key_secret: 'secret',
  projectId: 123,
  baseUrl: 'https://api.<something>.<something>', // Optional
};
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone repository
git clone https://github.com/Datacanvas-IoT/Datacanvas-NPM
cd datacanvas-sdk

# Install dependencies
npm install

# Build project
npm run build

# Run tests
npm test
```

---

## 📝 License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Resources

- [DataCanvas Platform](http://192.248.11.33/)
- [Issue Tracker](https://github.com/Datacanvas-IoT/Datacanvas-NPM/issues)
- [Changelog](CHANGELOG.md)

---

## 💬 Support

For questions, issues, or feature requests:

- 📧 Email: sankha.b21@gmail.com, rathnayakenethmiit@gmail.com, pramodyalakmina@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/Datacanvas-IoT/Datacanvas-NPM/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/Datacanvas-IoT/Datacanvas-NPM/discussions)

---

<p align="center">
  Made with ❤️ by the DataCanvas Team
</p>
