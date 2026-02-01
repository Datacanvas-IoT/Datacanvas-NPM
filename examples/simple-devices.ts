/**
 * Simple Example - Get All Devices
 * This example only fetches devices, no datatable required
 */

import 'dotenv/config';
import { DataCanvas, AuthenticationError, NetworkError } from '../src/index';

async function main() {
  try {
    // Initialize the DataCanvas client
    const client = new DataCanvas({
      access_key_client: process.env.DATACANVAS_CLIENT_KEY!,
      access_key_secret: process.env.DATACANVAS_SECRET_KEY!,
      project_id: parseInt(process.env.DATACANVAS_PROJECT_ID!),
    });

    console.log('✅ DataCanvas client initialized');
    console.log(`📍 Base URL: ${client.getBaseUrl()}`);
    console.log(`📁 Project ID: ${client.getProjectId()}\n`);

    // Get all devices
    console.log('📱 Fetching all devices...');
    const response = await client.getAllDevices();

    console.log(`✅ Success: ${response.success}`);
    console.log(`📊 Found ${response.devices.length} device(s):\n`);

    response.devices.forEach(device => {
      console.log(`  • ${device.device_name} (ID: ${device.device_id})`);
    });

    console.log('\n✅ SDK is working perfectly!');
    console.log('\n💡 To fetch data, you need a datatable in your project.');
    console.log('   Use client.getData({ datatable_name: "your_table_name" })');

  } catch (error) {
    console.error('\n❌ Error occurred:');
    
    if (error instanceof AuthenticationError) {
      console.error('🔒 Invalid credentials. Check your access keys in .env file');
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network error. Make sure the backend is running on http://localhost:3001');
    } else {
      console.error('💥', error);
    }
    
    process.exit(1);
  }
}

main();
