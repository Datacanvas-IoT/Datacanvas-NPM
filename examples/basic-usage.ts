/**
 * Basic Usage Example for DataCanvas SDK
 * 
 * This example demonstrates how to use the DataCanvas SDK to:
 * 1. Initialize the client with access keys
 * 2. Retrieve all devices in your project
 * 3. Query data from specific devices
 * 4. Handle errors gracefully
 */

import 'dotenv/config';
import { 
  DataCanvas,
  AuthenticationError,
  ValidationError,
  RateLimitError,
  NetworkError,
} from '../src/index';

// Load environment variables (recommended approach)
// Create a .env file with:
// DATACANVAS_CLIENT_KEY=your_client_key
// DATACANVAS_SECRET_KEY=your_secret_key
// DATACANVAS_PROJECT_ID=10
// DATACANVAS_API_URL=http://localhost:3001

async function main() {
  try {
    // Initialize the DataCanvas client
    const client = new DataCanvas({
      access_key_client: process.env.DATACANVAS_CLIENT_KEY || "your_access_key_client",
      access_key_secret: process.env.DATACANVAS_SECRET_KEY || "your_access_key_secret",
      project_id: parseInt(process.env.DATACANVAS_PROJECT_ID || "10"),
      baseUrl: process.env.DATACANVAS_API_URL, // Optional: defaults to http://localhost:3001
    });

    console.log('✅ DataCanvas client initialized');
    console.log(`📍 Base URL: ${client.getBaseUrl()}`);
    console.log(`📁 Project ID: ${client.getProjectId()}\n`);

    // ============================================
    // Example 1: Get All Devices
    // ============================================
    console.log('📱 Fetching all devices...');
    const devicesResponse = await client.getAllDevices();

    console.log(`✅ Success: ${devicesResponse.success}`);
    console.log(`📊 Found ${devicesResponse.devices.length} devices:\n`);

    devicesResponse.devices.forEach(device => {
      console.log(`  • ${device.device_name} (ID: ${device.device_id})`);
    });
    console.log();

    // ============================================
    // Example 2: Get Data from All Devices
    // ============================================
    console.log('📊 Fetching data from all devices...');
    const allDataResponse = await client.getData({
      datatable_name: "sensor_readings", // Replace with your datatable name
      page: 0,
      limit: 10,
    });

    console.log(`✅ Total records: ${allDataResponse.count}`);
    console.log('📈 Data by device:');
    Object.entries(allDataResponse.data).forEach(([deviceId, dataPoints]) => {
      console.log(`  Device ${deviceId}: ${dataPoints.length} records`);
    });
    console.log();

    // ============================================
    // Example 3: Get Data from Specific Devices
    // ============================================
    if (devicesResponse.devices.length > 0) {
      const deviceIds = devicesResponse.devices.slice(0, 2).map(d => d.device_id);
      
      console.log(`📊 Fetching data from specific devices: ${deviceIds.join(', ')}`);
      const specificDataResponse = await client.getData({
        datatable_name: "sensor_readings",
        devices: deviceIds,
        page: 0,
        limit: 5,
      });

      console.log(`✅ Total records: ${specificDataResponse.count}`);
      
      // Display data for each device
      deviceIds.forEach(deviceId => {
        const deviceData = specificDataResponse.data[deviceId] || [];
        console.log(`\n  📱 Device ${deviceId}:`);
        if (deviceData.length > 0) {
          console.log(`     Records: ${deviceData.length}`);
          console.log(`     Sample data:`, JSON.stringify(deviceData[0], null, 2));
        } else {
          console.log(`     No data found`);
        }
      });
    }

    // ============================================
    // Example 4: Pagination
    // ============================================
    console.log('\n📄 Demonstrating pagination...');
    for (let page = 0; page < 3; page++) {
      const paginatedResponse = await client.getData({
        datatable_name: "sensor_readings",
        page: page,
        limit: 5,
      });
      console.log(`  Page ${page}: ${paginatedResponse.count} total records`);
    }

    // ============================================
    // Example 5: Filter Devices by Name
    // ============================================
    console.log('\n🔍 Finding temperature sensors...');
    const tempSensors = devicesResponse.devices.filter(d =>
      d.device_name.toLowerCase().includes('temperature')
    );
    
    if (tempSensors.length > 0) {
      console.log(`✅ Found ${tempSensors.length} temperature sensors`);
      const tempSensorIds = tempSensors.map(d => d.device_id);
      
      const tempDataResponse = await client.getData({
        datatable_name: "sensor_readings",
        devices: tempSensorIds,
        limit: 5,
      });
      
      console.log(`📊 Temperature data records: ${tempDataResponse.count}`);
    } else {
      console.log('❌ No temperature sensors found');
    }

    console.log('\n✅ All examples completed successfully!');

  } catch (error) {
    console.error('\n❌ Error occurred:');

    // Handle specific error types
    if (error instanceof AuthenticationError) {
      console.error('🔒 Authentication failed. Please check your API keys.');
      console.error('   Make sure your access_key_client and access_key_secret are correct.');
    } else if (error instanceof ValidationError) {
      console.error('⚠️  Validation error. Please check your request parameters.');
      console.error('   Error:', error.message);
    } else if (error instanceof RateLimitError) {
      console.error('⏱️  Rate limit exceeded. Please wait before retrying.');
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network error. Please check your connection and API URL.');
      console.error('   Error:', error.message);
    } else {
      console.error('💥 Unexpected error:', error);
    }

    process.exit(1);
  }
}

// Run the example
main();
