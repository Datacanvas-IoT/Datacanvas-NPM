// 1. Point to the built version of your SDK
const { MyAppSDK } = require('./dist/index.js');

async function runTest() {
    console.log("🚀 Starting SDK Integration Test...");

    const sdk = new MyAppSDK({
        // Note: In index.js you use app.use("/api/access-keys", accessKeyRoute)
        // If your baseUrl includes /api, the resource calls /access-keys/...
        baseUrl: "http://localhost:4000/api",
        accessKeyId: "c3db11f30498795a24c023a2c987152056ff8eff7af2216c",
        secretAccessKey: "49b50aecee022f1900623f5f24a6cb475aac9e5420965cee",
        projectId: 15,
        origin: "http://example.com" // Must match a domain in your AccessKeyDomain table
    });

    try {
        // --- 2. Test Devices ---
        // Backend: getAllDevicesForExternal(req.body.project_id)
        console.log("\n2. Testing devices.list()...");
        const devices = await sdk.devices.list();
        console.log("✅ Devices Success!");
        console.dir(devices, { depth: null });

        // --- 3. Test Data ---
        // Backend: getAllDataForExternal expects 'datatable_name' and 'devices' array
        console.log("\n3. Testing data.list()...");
        const data = await sdk.data.list({
            tableName: "sensor_logs", // FIXED: Must be the 'tbl_name' string from your database
            deviceIds: [1, 2],       // Optional: Filter by specific device IDs
            page: 0,                 // Pagination start
            limit: 5,                // Items per page
            order: 'DESC'            // Sort order
        });

        console.log("✅ Data Success!");
        console.log(`Total Count: ${data.count}`);
        console.log("Grouped Data (by Device ID):");
        console.dir(data.data, { depth: null });

    } catch (error) {
        // This will now catch "Domain not allowed", "Expired Key", or "Invalid Pair" 
        // messages directly from your backend middlewares.
        console.error("\n❌ Test Failed:", error.message);
    }
}

runTest();