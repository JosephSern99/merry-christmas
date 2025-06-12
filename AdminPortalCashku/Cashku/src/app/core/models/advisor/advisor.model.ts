import { DetailInterface, ListingDataInterface, ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';

export class AdvisorListModel implements ListingDataInterface {
    fullname: string;
    id: string;
    index: number;
    isActive: boolean;
    uiAccountStatus: { label: string; cssClass: string; }
}

export class AdvisorDetailModel extends AdvisorListModel implements DetailInterface {
    fullName = '';
    calendlyLink: string;
    email: string;
    fullPhoneNumber: string;
    easyRename_userPicture: string;
    suspendReason: string;
}

export class AssignableAdvisorModel {
    advisoryPlan: number;
    calendlyLink: null
    countryCode: number;
    email: string;
    fullName: string;
    fullPhoneNumber: string;
    id: string;
    phoneNumber: number;
    registerStep: number;
}

export class AssignableCustomerModel {
    advisoryPlan: number;
    email:string;
    fullName: string;
    fullPhoneNumber: string;
    id: string;
    registerStep: number;
    index: number;
}

export class CreateAdvisorModel {
    calendlyLink: string;
    countryCode: number;
    email: string;
    fullName: string;
    phoneNumber: number;
}

export interface SuspendAdvisorSubmissionModel {
    advisorId: string;
    reason: string;
    clientReassignList: ClientReassignList[];
}

export interface ClientReassignList {
    userId: string;
    advisorId: string;
}
