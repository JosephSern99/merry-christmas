import { ListingDataInterface, ListingFilterModel } from "src/app/pages/admin/listing-popup/base-listing.model";

export class PassportVerificationListModel implements ListingDataInterface {
    email: string;
    fullname: string;
    index: number;
    passportVerificationStatus: string;
    submissionDate: string;
    submittedDocumentName: string;
}

export class PassportVerificationFilterModel extends ListingFilterModel{
    passportVerificationStatus: string;
}

export class PassportImageModel implements ListingDataInterface {
    index: number;
    userId: string;
    utilityBillImageUrl: string;
}
