/**
 * @deprecated Please use DeviceThreeModel.
 */
export class DeviceModel {
  deviceNo: string | null;
  deviceType: number;

  constructor(id: string | null) {
    this.deviceNo = id ? id : null;
    this.deviceType = 3;
  }
}
