import { GoalTypeEnum } from 'src/app/core/constants/goal.constant';
import { ListingDataInterface, ListingFilterModel } from "src/app/pages/admin/listing-popup/base-listing.model";
import { TransactionStatus } from "src/app/core/constants/withdrawal.constant";

export class WithdrawalListModel implements ListingDataInterface {
    amount: number;
    createdAt: string;
    fullname: string;
    goalName: string;
    goalType: GoalTypeEnum;
    id: number;
    index: number;
    redemptionReason: string;
    redemptionType: number;
    transactionStatus: number;
    transactionType: typeof TransactionStatus;
    userId: string;
}


export class WithdrawListingFilterModel extends ListingFilterModel{
    transactionStatus: string;
}
