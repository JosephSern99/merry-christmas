import { ListingDataInterface } from 'src/app/pages/admin/listing-popup/base-listing.model';

export class FeesManagementListModel implements ListingDataInterface {
    fundName: string;
    modifiedAt: string;
    index: number;
    wrapFee: number;
}

export class FundsListModel implements ListingDataInterface {
    fundName: string;
    fundOption: string;
    index: number;
    scheme: string;
}
