import { HttpClient } from "./core/httpClient";
import { DevicesResource } from "./resources/devices";
import { DataResource } from "./resources/data";
import { SDKConfig } from "./types";

export class MyAppSDK {
    // Public: The features the user interacts with
    public readonly devices: DevicesResource;
    public readonly data: DataResource;

    // Private: The engine (hidden from user)
    private httpClient: HttpClient;

    constructor(config: SDKConfig) {
        // 1. Start the secure engine
        this.httpClient = new HttpClient(config);

        // 2. Pass the engine to the features
        this.devices = new DevicesResource(this.httpClient);
        this.data = new DataResource(this.httpClient);
    }
}

// Export the types so the user can import them (e.g. 'import { SDKConfig } ...')
export * from "./types";