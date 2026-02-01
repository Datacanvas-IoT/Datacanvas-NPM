import { HttpClient } from "./core/httpClient";
import { DevicesResource } from "./resources/devices";
import { DataResource } from "./resources/data";
import { SDKConfig } from "./types";

export class MyAppSDK {
    public readonly devices: DevicesResource;
    public readonly data: DataResource;

    private httpClient: HttpClient;

    constructor(config: SDKConfig) {
        this.httpClient = new HttpClient(config);
        this.devices = new DevicesResource(this.httpClient);
        this.data = new DataResource(this.httpClient);
    }
}
export * from "./types";