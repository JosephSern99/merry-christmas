import { ListingDataInterface, ListingFilterModel } from "src/app/pages/admin/listing-popup/base-listing.model";

export class ReferralListModel implements ListingDataInterface {
    index: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    associationNumber: string;
    appType: string;
    referralStatus: number;
}

export class ReferralListFilterModel extends ListingFilterModel {
    referralStatus: number;
}
