const { MyAppSDK } = require('./dist/index.js');

async function runTest() {
    console.log("🚀 Starting SDK Integration Test...");

    const sdk = new MyAppSDK({

        baseUrl: "http://localhost:4000/api",
        accessKeyId: "c3db11f30498795a24c023a2c987152056ff8eff7af2216c",
        secretAccessKey: "49b50aecee022f1900623f5f24a6cb475aac9e5420965cee",
        projectId: 15,
        origin: "http://example.com"
    });

    try {
        // --- 2. Test Devices ---
        console.log("\n2. Testing devices.list()...");
        const devices = await sdk.devices.list();
        console.log("✅ Devices Success!");
        console.dir(devices, { depth: null });

        // --- 3. Test Data ---
        console.log("\n3. Testing data.list()...");
        const data = await sdk.data.list({
            tableName: "sensor_logs",
            deviceIds: [1, 2],
            page: 0,
            limit: 5,
            order: 'DESC'
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