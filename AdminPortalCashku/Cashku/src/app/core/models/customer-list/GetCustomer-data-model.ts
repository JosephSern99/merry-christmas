import { GetCustomerData } from './GetCustomer-data';


export class GetCustomerDataModel {
    advisor: string;
    advisorId: string;
    advisorName: number;
    assets: number;
    createdAt: string;
    email: string;
    fullname: string;
    fullPhoneNumber: string;
    id: string;
    liabilities: number;
    netWorth: number;
    registerStep: number;

    static getInputModel(data: GetCustomerData): GetCustomerDataModel {
        const model = new GetCustomerDataModel();
        model.id = data.id;
        model.fullname = data.fullname;
        model.email = data.email;
        model.fullPhoneNumber = data.fullPhoneNumber;
        model.netWorth = data.netWorth;
        model.assets = data.assets;
        model.liabilities = data.liabilities;
        model.createdAt = data.createdAt ? data.createdAt.toString() : null;
        model.advisor = data.advisor;
        model.advisorId = data.advisorId;

        return model;
    }
}

