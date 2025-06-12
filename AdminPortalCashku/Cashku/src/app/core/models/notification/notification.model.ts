import { ListingDataInterface } from "src/app/pages/admin/listing-popup/base-listing.model";

export class NotificationListModel implements ListingDataInterface {
    index: number;
    easeRename_title: string;
    easeRename_descripton: string;
    easeRename_sentDate: string;
}
