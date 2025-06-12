import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { CustomerTransactionHistoryList } from 'src/app/core/models/customer/customer.model';
import { UntypedFormBuilder } from '@angular/forms';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { takeUntil } from 'rxjs/operators';
import { TransactionDisplayType, TransactionStatus } from 'src/app/core/constants/withdrawal.constant';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFooterCell,
    MatFooterRow,
    MatHeaderCell,
    MatHeaderCellDef, MatHeaderRow, MatRow,
    MatTable
} from '@angular/material/table';
import {NgClass} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
    selector: 'app-fund-details',
    templateUrl: './fund-details.component.html',
    styleUrls: ['./fund-details.component.scss'],
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatSort,
        MatCell,
        MatHeaderCellDef,
        MatCellDef,
        NgClass,
        MatFooterRow,
        MatFooterCell,
        MatHeaderRow,
        MatRow,
        MatProgressBar,
        MatPaginator,
        RouterOutlet,
        MatProgressSpinner
    ],
    standalone: true
})
export class FundDetailsComponent extends ListingPopupBaseComponent {

    @Input() fundCode : string;
    @Output() fundCodeChange = new EventEmitter<string>();


    onFundCodeChange(newValue: string) {
        this.fundCode = newValue;
        this.fundCodeChange.emit(newValue);
    }

    displayedColumns: string[] = [
        'index',
        'transactionType',
        'sellerOrderNo',
        'ihNo',
        'amount',
        'wrapFee',
        'paymentMode',
        'grossAmount',
        'transactionStatus',
        'transactionAt',
        'confirmedAt',
    ];
    listingDataSource: CustomerTransactionHistoryList[] = [];
    TransactionStatus = TransactionStatus;
    TransactionDisplayType = TransactionDisplayType;

    protected customerID: string;

    constructor(
        protected apiService: CustomerService,
        protected formBuilder: UntypedFormBuilder,
        protected activatedRoute: ActivatedRoute,
    ) {
        super(apiService, formBuilder);
    }

    ngOnInit(): void {
        this.getCustomerIDFromParent();
    }

    protected getCustomerIDFromParent(): void {
        this.activatedRoute.parent.params.subscribe(
            (params) => {
                this.customerID = params.id || null;
                this.getListing();
            }
        );
    }

    getListing(): void {
        this.isListingLoading = true;
        let filter: ListingFilterModel = this.generateListingFilterParam();

        this.apiService.getFundsTransactionHistories(this.customerID, this.fundCode, filter)
        .pipe(takeUntil(this.componentInstance$))
        .subscribe((success) => {
                this.handleSuccessListingResponse(success);
            },
            (error) => { console.log(error); }
        ).add(
            () => { this.isListingLoading = false; }
        );
    }

    protected setupFilterFormGroup(): void {
        this.filterFormGroup = this.formBuilder.group({
            transactionStatus: 0,
        });

        this.filterFormGroup.valueChanges.subscribe(
            () => {
                this.getListing();
            },
        );
    }
}
