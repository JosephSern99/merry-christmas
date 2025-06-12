import { ListingDataInterface } from 'src/app/pages/admin/listing-popup/base-listing.model';

export interface DashboardModel extends ListingDataInterface {
    newUserCountList: NewUserCountList[];
    topCustomersList: TopCustomersList[];
    totalAdvisorsCount: number;
    totalCustomersCount: number;
    totalAmountUnderManagement: number;
}

export interface TopCustomersList {
    advisorId: number;
    advisorName: string;
    createdAt: string;
    email: string;
    fullname: string;
    fullPhoneNmber: string;
    id: number;
    netWorth: number;
    registerStep: number;
}

export interface NewUserCountList {
    title: string;
    value: number;
}

export interface GetTotalClientsApiModel {
    clientSummaryList: ClientSummary[];
    clientSummaryTotal: ClientSummary;
}

interface ClientSummary {
    partnership: string;
    cashkuSaveClients: Client;
    cashkuInvestClients: Client;
    cashkuInvestAndSaveClients: Client;
    totalClients: number;
}

interface Client {
    singlePaymentClients: number;
    directDebitClients: number;
    bothPaymentModeClients: number;
    totalClients: number;
}

export interface GetTotalAumApiModel {
    aumSummaryList: AumSummary[];
    aumSummaryTotal: AumSummary;
}

interface AumSummary {
    partnership: string;
    cashkuSave: number;
    cashkuInvest: number;
    singlePayment: number;
    directDebit: number;
    totalAums: number;
}
