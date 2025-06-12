import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';
import { TRANSACTION_TYPE, TransactionStatus } from 'src/app/core/constants/withdrawal.constant';
import { CustomerGoal, CustomerTransactionHistoryList } from 'src/app/core/models/customer/customer.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { GoalSubPage } from 'src/app/pages/admin/customer/customer-detail/goals/goal.interface';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';

@Component({
    selector: 'app-transaction-history',
    templateUrl: './transaction-history.component.html',
    styleUrls: ['./transaction-history.component.scss'],
    standalone: false
})
export class TransactionHistoryComponent extends ListingPopupBaseComponent implements GoalSubPage {
    displayedColumns: string[] = [
        'index',
        'transactionType',
        'sellerOrderNo',
        'ihNo',
        'fundName',
        'amount',
        'wrapFee',
        'grossAmount',
        'transactionStatus',
        'transactionAt',
        'transactionConfirmationDate',
    ];
    listingDataSource: CustomerTransactionHistoryList[] = [];
    private customerID: string;
    private goal: CustomerGoal;
    TransactionStatus = TransactionStatus;
    TRANSACTION_TYPE = TRANSACTION_TYPE;

    constructor(
        protected apiService: CustomerService,
        protected formBuilder: UntypedFormBuilder,
        protected activatedRoute: ActivatedRoute,
    ) {
        super(apiService, formBuilder);
    }

    ngOnInit(): void {}

    setCustomerID(id: string): void {
        this.customerID = id;
    }

    setCustomerGoal(goal: CustomerGoal): void {
        this.goal = goal;
        this.getListing();
    }

    getListing(): void {
        this.isListingLoading = true;
        let filter: ListingFilterModel = this.generateListingFilterParam();

        this.apiService.getGoalTransactionHistories(this.customerID, this.goal.id, filter)
            .pipe(takeUntil(this.componentInstance$))
            .subscribe(
                (success) => {
                    this.handleSuccessListingResponse(success);
                    this.setupFilterFormGroup();
                },
                (error) => {
                    this.listingDataSource = [];
                    console.log(error);
                }
            ).add(
                () => { this.isListingLoading = false; }
            );
    }

    getSubTab(): DetailSubTab {
        return DetailSubTab.GoalTransactionHistory;
    }
}
