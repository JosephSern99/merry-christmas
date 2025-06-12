import { GetCustomerDataModel } from './GetCustomer-data-model';
import { Moment } from "moment";
import moment from 'moment';

export class GetCustomerData {
    advisor: string;
    advisorId: string;
    advisorName: number;
    assets: number;
    createdAt: Moment | null;
    email: string;
    fullname: string;
    fullPhoneNumber: string;
    id: string;
    liabilities: number;
    netWorth: number;
    registerStep: number;

constructor(model:  GetCustomerDataModel) {
        this.id = model.id;
        this.fullname = model.fullname;
        this.email = model.email;
        this.fullPhoneNumber = model.fullPhoneNumber;
        this.netWorth = model.netWorth;
        this.assets = model.assets;
        this.liabilities = model.liabilities;
        this.createdAt = model.createdAt ? moment(model.createdAt + "Z") :  null;
        this.advisor = model.advisor;
        this.advisorId = model.advisorId;
        this.email = model.email;
        this.registerStep = model.registerStep;
        this.advisorName = model.advisorName;
    }
}

