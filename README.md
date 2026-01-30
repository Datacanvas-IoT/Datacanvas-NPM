# DataCanvas NPM SDK

[![npm version](https://img.shields.io/npm/v/datacanvas-npm-sankha.svg)](https://www.npmjs.com/package/datacanvas-npm-sankha)
[![License](https://img.shields.io/badge/license-UNLICENSED-blue.svg)](LICENSE)

Official Node.js SDK for interacting with the DataCanvas IoT platform. This package provides a simple and intuitive interface to access DataCanvas API endpoints, manage IoT devices, and retrieve sensor data without manually handling HTTP requests.

## Table of Contents

- [What is DataCanvas?](#what-is-datacanvas)
- [Why Use This SDK?](#why-use-this-sdk)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
  - [TypeScript / ES Modules](#typescript--es-modules)
  - [JavaScript / CommonJS](#javascript--commonjs)
- [API Reference](#api-reference)
  - [Constructor](#constructor)
  - [Methods](#methods)
- [Configuration](#configuration)
- [Error Handling](#error-handling)
- [Architecture](#architecture)
- [TypeScript Support](#typescript-support)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## What is DataCanvas?

DataCanvas is a powerful IoT data storage and management platform designed to streamline the way you collect, store, and access data from IoT devices. The platform provides:

- **Secure API Key-based Authentication**: Each user receives a pair of API keys (client key and secret) for secure access
- **Domain-based Access Control**: Pre-register allowed domains for enhanced security
- **Real-time Data Access**: Query and retrieve data from connected IoT devices
- **Device Management**: Organize and manage multiple IoT devices within projects
- **RESTful API**: Standards-based REST API architecture for easy integration

## Why Use This SDK?

While you can interact with DataCanvas using direct HTTP requests, this SDK offers several advantages:

- **Simplified API Calls**: No need to manually construct HTTP requests or manage authentication headers
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Built-in Error Handling**: Graceful error handling with descriptive error classes
- **Automatic Authentication**: API keys are automatically included in all requests
- **Cleaner Code**: Write less boilerplate code and focus on your application logic
- **Universal Compatibility**: Works seamlessly with both TypeScript and JavaScript projects

## Features

✨ **Easy to Use** - Simple, intuitive API that abstracts away complexity

🔐 **Secure** - Built-in authentication and authorization handling

📦 **Lightweight** - Minimal dependencies, small bundle size

🎯 **Type-Safe** - Full TypeScript support with comprehensive type definitions

🔄 **Promise-based** - Modern async/await API

🛡️ **Error Handling** - Comprehensive error types for better error management

🌐 **Universal** - Works in both Node.js and browser environments

📱 **IoT-Focused** - Purpose-built for IoT device data management

## Installation

```bash
# Using npm
npm install datacanvas-npm-sankha

# Using yarn
yarn add datacanvas-npm-sankha

# Using pnpm
pnpm add datacanvas-npm-sankha
```

> **Note**: This package is currently in development. Once published to npm registry, it will be available for installation using the above commands.

## Quick Start

```typescript
import { DataCanvas } from 'datacanvas-npm-sankha';

// Initialize the client
const client = new DataCanvas({
    access_key_client: "your_access_key_client",
    access_key_secret: "your_access_key_secret",
    project_id: 10
});

// Get all devices
const devices = await client.getAllDevices();
console.log(devices);

// Get data from specific devices
const data = await client.getData({
    datatable_name: "sensor_readings",
    devices: [1, 2, 3],
    page: 0,
    limit: 10
});
console.log(data);
```

## Usage

### TypeScript / ES Modules

```typescript
import { DataCanvas } from 'datacanvas-npm-sankha';

// Initialize client
const client = new DataCanvas({
    access_key_client: "your_access_key_client",
    access_key_secret: "your_access_key_secret",
    project_id: 10
});

// Get all devices
const devicesResponse = await client.getAllDevices();

// Get data from devices
const dataResponse = await client.getData({
    datatable_name: "your_datatable_name",
    devices: [1, 2, 3],
    page: 0,
    limit: 10
});
```

### JavaScript / CommonJS

```javascript
const { DataCanvas } = require('datacanvas-npm-sankha');

// Initialize client
const client = new DataCanvas({
    access_key_client: "your_access_key_client",
    access_key_secret: "your_access_key_secret",
    project_id: 10
});

// Get all devices
const devicesResponse = await client.getAllDevices();

// Get data from devices
const dataResponse = await client.getData({
    datatable_name: "your_datatable_name",
    devices: [1, 2, 3],
    page: 0,
    limit: 10
});
```

## API Reference

### Constructor

#### `new DataCanvas(config: DataCanvasConfig)`

Creates a new DataCanvas client instance.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config` | `DataCanvasConfig` | Yes | Configuration object containing authentication credentials |
| `config.access_key_client` | `string` | Yes | Your DataCanvas client access key |
| `config.access_key_secret` | `string` | Yes | Your DataCanvas secret access key |
| `config.project_id` | `number` | Yes | Your DataCanvas project ID |

**Example:**

```typescript
const client = new DataCanvas({
    access_key_client: "your_client_key",
    access_key_secret: "your_secret_key",
    project_id: 10
});
```

### Methods

#### `getAllDevices(): Promise<DevicesResponse>`

Retrieves all IoT devices associated with your project.

**Returns:**

```typescript
interface DevicesResponse {
    success: boolean;
    devices: Device[];
}

interface Device {
    device_id: number;
    device_name: string;
}
```

**Example:**

```typescript
const response = await client.getAllDevices();
console.log(response.devices);
// Output: [{ device_id: 1, device_name: "Sensor A" }, ...]
```

---

#### `getData(filters: DataRetrievalOptions): Promise<DataResponse>`

Retrieves data from specified devices with optional filtering and pagination.

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `datatable_name` | `string` | Yes | - | Name of the datatable to query |
| `devices` | `number[]` | No | `[]` | Array of device IDs to retrieve data from |
| `page` | `number` | No | `0` | Page number for pagination (0-indexed) |
| `limit` | `number` | No | `10` | Number of records per page |

**Returns:**

```typescript
interface DataResponse {
    count: number;
    data: {
        [deviceId: number]: DataPoint[];
    };
}

interface DataPoint {
    id: number;
    device: number;
    [key: string]: any; // Additional fields specific to your datatable
}
```

**Example:**

```typescript
const response = await client.getData({
    datatable_name: "temperature_readings",
    devices: [1, 2, 3],
    page: 0,
    limit: 20
});

console.log(`Total records: ${response.count}`);
console.log('Device 1 data:', response.data[1]);
```

## Configuration

Before using the SDK, you need to obtain API credentials from your DataCanvas account:

1. **Log in to DataCanvas**: Access your DataCanvas dashboard
2. **Create API Keys**: Navigate to API Keys section and generate a new key pair
3. **Register Domains** (if applicable): Add allowed domains for the API key
4. **Note Your Project ID**: Find your project ID in the project settings

Keep your API keys secure and never commit them to version control. Consider using environment variables:

```typescript
// .env file
DATACANVAS_CLIENT_KEY=your_client_key
DATACANVAS_SECRET_KEY=your_secret_key
DATACANVAS_PROJECT_ID=10

// In your code
import { DataCanvas } from 'datacanvas-npm-sankha';

const client = new DataCanvas({
    access_key_client: process.env.DATACANVAS_CLIENT_KEY!,
    access_key_secret: process.env.DATACANVAS_SECRET_KEY!,
    project_id: parseInt(process.env.DATACANVAS_PROJECT_ID!)
});
```

## Error Handling

The SDK provides specific error classes for different types of failures:

| Error Class | HTTP Status | Description |
|-------------|-------------|-------------|
| `AuthenticationError` | 401 | Invalid access key or secret |
| `AuthorizationError` | 403 | Insufficient permissions or domain not allowed |
| `NotFoundError` | 404 | Resource not found |
| `ValidationError` | 400, 422 | Invalid request parameters |
| `RateLimitError` | 429 | Too many requests, rate limit exceeded |
| `ServerError` | 500, 502, 503, 504 | Internal server error |
| `NetworkError` | - | Network connectivity issues |

**Example Error Handling:**

```typescript
import { 
    DataCanvas,
    AuthenticationError,
    ValidationError,
    RateLimitError 
} from 'datacanvas-npm-sankha';

try {
    const devices = await client.getAllDevices();
} catch (error) {
    if (error instanceof AuthenticationError) {
        console.error('Invalid credentials. Please check your API keys.');
    } else if (error instanceof ValidationError) {
        console.error('Invalid request parameters.');
    } else if (error instanceof RateLimitError) {
        console.error('Rate limit exceeded. Please wait before retrying.');
    } else {
        console.error('An unexpected error occurred:', error);
    }
}
```

## Architecture

The DataCanvas NPM SDK is built with a clean, modular architecture:

```
┌─────────────────────────────────────────────────────┐
│                Your Application                     │
│              (Next.js, Node.js, etc.)               │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│              DataCanvas SDK Client                  │
│  ┌──────────────────────────────────────────────┐  │
│  │  • getAllDevices()                           │  │
│  │  • getData(filters)                          │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │  Authentication Layer                        │  │
│  │  • API Key Management                        │  │
│  │  • Request Signing                           │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │  Error Handling Layer                        │  │
│  │  • HTTP Status Code Mapping                  │  │
│  │  • Custom Error Classes                      │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│            DataCanvas REST API                      │
│  ┌──────────────────────────────────────────────┐  │
│  │  • API Key Validation                        │  │
│  │  • Domain Verification                       │  │
│  │  • Access Control                            │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│         DataCanvas IoT Platform                     │
│      (Device Data Storage & Management)             │
└─────────────────────────────────────────────────────┘
```

### How It Works

1. **Client Initialization**: Your application creates a DataCanvas client instance with API credentials
2. **Method Invocation**: You call SDK methods like `getAllDevices()` or `getData()`
3. **Request Construction**: The SDK automatically constructs the HTTP request with:
   - Proper endpoint URL
   - Authentication credentials in request body
   - Required headers
   - Request payload
4. **API Communication**: The SDK sends the request to DataCanvas REST API
5. **Validation & Processing**: DataCanvas validates:
   - API key authenticity
   - Domain authorization
   - Access permissions
   - Request parameters
6. **Response Handling**: The SDK receives the response and:
   - Parses JSON data
   - Maps HTTP errors to specific error classes
   - Returns typed data to your application
7. **Error Management**: If errors occur, appropriate error classes are thrown with descriptive messages

### Security Flow

```
Your App → SDK (adds API keys) → HTTPS → DataCanvas API
                                          ↓
                                    Validates:
                                    • API Keys
                                    • Domain
                                    • Permissions
                                          ↓
                                    Returns Data
```

## TypeScript Support

This package is written in TypeScript and provides complete type definitions. All types are exported for your convenience:

```typescript
import { 
    DataCanvas,
    DataCanvasConfig,
    Device,
    DevicesResponse,
    DataPoint,
    DataResponse,
    DataRetrievalOptions,
    // Error classes
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    ValidationError,
    ServerError,
    NetworkError,
    RateLimitError
} from 'datacanvas-npm-sankha';
```

## Examples

### Fetching and Filtering Device Data

```typescript
async function getTemperatureData() {
    // Get all devices
    const { devices } = await client.getAllDevices();
    
    // Filter temperature sensors
    const tempSensors = devices.filter(d => 
        d.device_name.toLowerCase().includes('temperature')
    );
    
    // Get their IDs
    const sensorIds = tempSensors.map(d => d.device_id);
    
    // Fetch data
    const data = await client.getData({
        datatable_name: "sensor_readings",
        devices: sensorIds,
        page: 0,
        limit: 50
    });
    
    return data;
}
```

### Pagination Example

```typescript
async function fetchAllData(deviceId: number, datatableName: string) {
    const allData = [];
    let page = 0;
    const limit = 100;
    
    while (true) {
        const response = await client.getData({
            datatable_name: datatableName,
            devices: [deviceId],
            page,
            limit
        });
        
        const deviceData = response.data[deviceId] || [];
        allData.push(...deviceData);
        
        // Check if we've fetched all data
        if (deviceData.length < limit) {
            break;
        }
        
        page++;
    }
    
    return allData;
}
```

### Fetching Latest Data

```typescript
async function getLatestReading(deviceId: number, datatableName: string) {
    // Get only the most recent data point by setting limit to 1
    const response = await client.getData({
        datatable_name: datatableName,
        devices: [deviceId],
        page: 0,
        limit: 1
    });
    
    const latestData = response.data[deviceId]?.[0];
    return latestData;
}
```

## Contributing

Contributions are welcome! This project is open source and publicly available.

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Datacanvas-IoT/Datacanvas-NPM.git
   cd Datacanvas-NPM
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Make your changes and test thoroughly

5. Submit a pull request

### Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed

## License

This project is currently unlicensed. Please refer to the [LICENSE](LICENSE) file for more information.

## Support

- **Issues**: Report bugs or request features on [GitHub Issues](https://github.com/Datacanvas-IoT/Datacanvas-NPM/issues)
- **Documentation**: Visit the [official documentation](https://github.com/Datacanvas-IoT/Datacanvas-NPM)
- **Contact**: For general inquiries about DataCanvas platform, visit our website

---

Made with ❤️ by IoT and Embedded System Labs, University of Moratuwa
