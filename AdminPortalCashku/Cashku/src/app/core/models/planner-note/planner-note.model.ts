import { DetailInterface, ListingDataInterface, ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { EndorseStatusType, PlannerNoteStatus } from 'src/app/core/constants/planner-note.constants';

export interface PlannerNoteListModel extends ListingDataInterface {
    id: string;
    createdAt: string;
    customerInformation: CustomerInformation[];
    description: string;
    fullname: string;
    status: number;
    title: string;
}

export interface PlannerNoteDetailModel extends DetailInterface {
    advisorId: string;
    createdAt: string;
    customerInformation: CustomerInformation[];
    description: string;
    id: number;
    portfolioInformation: PortfolioInformation[];
    title: string;
    totalCustomer: number;
}

export interface CustomerInformation extends ListingDataInterface {
    email: string;
    fullname: string;
    id: string;
    status: EndorseStatusType;
}

export interface PortfolioInformation extends ListingDataInterface {
    portfolio: string;
    riskType: string;
    status: string;
}

export class PlannerNoteCreate {
    customerList: any[];
    description: string;
    title: number;
    status: PlannerNoteStatus;
}

export class AdvisorListingFilterModel extends ListingFilterModel {
    advisorId: string;
}
