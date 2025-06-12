import { AppointmentType } from "src/app/core/constants/appointment.constants";
import { ListingDataInterface, ListingFilterModel } from "src/app/pages/admin/listing-popup/base-listing.model";

export class AppointmentListModel implements ListingDataInterface {
    advisorId: string;
    advisorName: string;
    appointmentStatus: number;
    appointmentType: typeof AppointmentType;
    createdAt: string;
    email: string;
    fullname: string;
    fullPhoneNumber: string;
    id: number;
    index: number;
    userId: string;
}

export class AppointmentListFilterModel extends ListingFilterModel{
    appointmentStatus: string;
    keywords: any;
    keywordsField: string;
}
