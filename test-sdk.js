// 1. Point to the built version of your SDK
const { MyAppSDK } = require('./dist/index.js');

async function runTest() {
    console.log("1. Initializing SDK...");

    const sdk = new MyAppSDK({
        //    baseUrl: "http://localhost:4000/api/access-key",
        // accessKeyId: "4c47fc081ef4830dc9033f4c0ff6fb3c7adf047eeb0242d2",
        // secretAccessKey: "aaa30482981ac8f95a4f33454315e6cfc3e0b5c88f5c2bb7",
        accessKeyId: "aaa30482981ac8f95a4f33454315e6cfc3e0b5c88f5c2bb7",
        secretAccessKey: "4c47fc081ef4830dc9033f4c0ff6fb3c7adf047eeb0242d2",
        projectId: 14, // A valid project ID from your DB

        // CRITICAL: Since you are running this in Node (not a browser),
        // you MUST spoof the origin to pass your backend's 'validateDomain' check.
        origin: "http://example.com"
    });

    try {
        console.log("2. Testing getDevices()...");
        const devices = await sdk.devices.list({ limit: 5 });
        console.log("✅ Devices Success:", devices);

        console.log("3. Testing getData()...");
        const data = await sdk.data.list({
            datatableId: 101, // Change to a valid table ID
            limit: 1
        });
        console.log("✅ Data Success:", data);

    } catch (error) {
        console.error("❌ Test Failed:", error.message);
    }
}

runTest();