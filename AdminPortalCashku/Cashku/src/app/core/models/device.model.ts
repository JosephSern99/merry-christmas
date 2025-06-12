export class DeviceThreeModel {
    deviceNo: string;
    deviceType: number = 3;

    constructor(devideID: string = null) {
        this.deviceNo = devideID;
    }
}
