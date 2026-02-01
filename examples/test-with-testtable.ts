/**
 * Test with TestTable
 */

import 'dotenv/config';
import { DataCanvas } from '../src/index';

async function main() {
  try {
    const client = new DataCanvas({
      access_key_client: process.env.DATACANVAS_CLIENT_KEY!,
      access_key_secret: process.env.DATACANVAS_SECRET_KEY!,
      project_id: parseInt(process.env.DATACANVAS_PROJECT_ID!),
    });

    console.log('✅ DataCanvas client initialized');
    console.log(`📁 Project ID: ${client.getProjectId()}\n`);

    // Get all devices
    console.log('📱 Fetching devices...');
    const devices = await client.getAllDevices();
    console.log(`✅ Found ${devices.devices.length} device(s)`);
    devices.devices.forEach(d => console.log(`   - ${d.device_name} (ID: ${d.device_id})`));

    // Get data from TestTable
    console.log('\n📊 Fetching data from TestTable...');
    const data = await client.getData({
      datatable_name: 'TestTable',
      page: 0,
      limit: 10,
    });

    console.log(`✅ Total records: ${data.count}`);
    console.log(`📈 Data by device:`);
    
    Object.entries(data.data).forEach(([deviceId, records]) => {
      console.log(`\n   Device ${deviceId}: ${records.length} record(s)`);
      records.forEach(record => {
        console.log(`      Record ID: ${record.id}, Device: ${record.device}`);
        // Show other fields
        const otherFields = Object.keys(record).filter(k => k !== 'id' && k !== 'device');
        otherFields.forEach(field => {
          console.log(`      ${field}: ${JSON.stringify(record[field])}`);
        });
      });
    });

    console.log('\n✅ All tests passed!');

  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    if (error.statusCode) {
      console.error(`   Status: ${error.statusCode}`);
    }
    process.exit(1);
  }
}

main();
