import { DetailInterface, ListingDataInterface } from 'src/app/pages/admin/listing-popup/base-listing.model';

export class RecurringSystemListModel implements ListingDataInterface {
    clientBatchReferenceNumber: string;
    corporateId: string;
    createdAt: string;
    documentName: string;
    documentStatus: number;
    documentUrl: string;
    exchangeId: string;
    fileRemark: string;
    fileReturnStatus: string;
    id: string;
    index: number;
    sellerId: string;
    totalCount: number;
    totalCreditingAmount: number;
}

export class RecurringPaymentDetailModel extends RecurringSystemListModel implements DetailInterface {}

export class AssignableRecurringPaymentModel {
    clientBatchReferenceNumber: string;
    corporateId: string;
    createdAt: string;
    documentName: string;
    documentStatus: number;
    documentUrl: string;
    exchangeId: string;
    fileRemark: string;
    fileReturnStatus: string;
    id: string;
    index: number;
    sellerId: string;
    totalCount: number;
    totalCreditingAmount: number;
}
