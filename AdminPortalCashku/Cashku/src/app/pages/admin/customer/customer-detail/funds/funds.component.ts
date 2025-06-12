import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';
import { PortfolioStatus, PortfolioType } from 'src/app/core/constants/portfolio-management.constants';
import { CustomerFundListModel, CustomerListingFilterModel } from 'src/app/core/models/customer/customer.model';
import { StatementPeriod } from 'src/app/core/models/statement/statement.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { StatementService } from 'src/app/core/services/api/statement.service';
import { BaseSubTabPageInterface } from 'src/app/pages/admin/listing-popup/base-listing-popup-page.interface';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { ListingFilterModel, ListingResponseModel } from 'src/app/pages/admin/listing-popup/base-listing.model';

@Component({
    selector: 'app-funds',
    templateUrl: './funds.component.html',
    styleUrls: ['./funds.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    standalone: false
})
export class FundsComponent extends ListingPopupBaseComponent implements BaseSubTabPageInterface  {

    displayedColumns: string[] = ['index', 'fundName', 'assetClass', 'currentAmount', 'totalInvestment', 'profitLoss', 'riskLevel', 'action'];
    expandedElement: null;
    listingDataSource: CustomerFundListModel[] = [];
    PortfolioStatus = PortfolioStatus;
    PortfolioType = PortfolioType;
    statementPeriods: StatementPeriod[] = [];
    statementPeriodFormControl = new UntypedFormControl('');

    readonly templateForRole: string = 'admin'

    protected customerID: string;

    constructor(
        protected apiService: CustomerService,
        protected formBuilder: UntypedFormBuilder,
        protected activatedRoute: ActivatedRoute,
        private statementApiService: StatementService,
    ) {
        super(apiService, formBuilder);
    }

    ngOnInit(): void {
        this.setupFilterFormGroup();
        this.setupSearchBar();
        this.getCustomerIDFromParent();
    }

    getSubTab(): DetailSubTab {
        return DetailSubTab.Funds;
    }

    getListing(): void {
        this.isListingLoading = true;
        let filter: CustomerListingFilterModel = this.generateListingFilterParam();

        this.apiService.getFundList(this.customerID, filter)
        .pipe(takeUntil(this.componentInstance$))
        .subscribe((success) => {
                this.handleSuccessListingResponse(success);
            },
            (error) => { console.log(error); }
        ).add(
            () => { this.isListingLoading = false; }
        );
    }

    onStatementDownload(): void {
        const statementPeriod = this.statementPeriods[this.statementPeriodFormControl.value];
        if (!statementPeriod) {
            return;
        }

        this.statementApiService.download(this.customerID, statementPeriod.startDate, statementPeriod.endDate).subscribe({
            next: success => {
                window.open(success.url)
            }
        });
    }

    protected generateListingFilterParam(): CustomerListingFilterModel {
        let parentFilter: ListingFilterModel = super.generateListingFilterParam();
        let newFilter: CustomerListingFilterModel = new CustomerListingFilterModel();

        Object.assign(newFilter, parentFilter);

        newFilter.endorseStatus = `${this.filterFormGroup.get('endorseStatus').value}`;
        newFilter.keywordsField = 'Title';

        return newFilter;
    }

    protected getCustomerIDFromParent(): void {
        this.activatedRoute.parent.params.subscribe(
            (params) => {
                this.customerID = params.id || null;
                this.getListing();
                this.getStatementPeriod();
            }
        );
    }

    protected handleSuccessListingResponse(responseData: ListingResponseModel<CustomerFundListModel>): void {
        super.handleSuccessListingResponse(responseData);

        this.listingDataSource.forEach(
            customerFund => {
                let symbol = '-';
                if (customerFund.profitLoss >= 0) {
                    symbol = '+';
                }

                customerFund.uiProfitLoss = `${symbol}RM${Math.abs(customerFund.profitLoss).toFixed(2)} (${symbol}${Math.abs(customerFund.profitLossPercentage)}%)`;

                customerFund.uiWithdrawable = +customerFund.currentAmount - +customerFund.wrapFeeAmount;
            }
        );
    }

    protected setupFilterFormGroup(): void {
        this.filterFormGroup = this.formBuilder.group({
            endorseStatus: '-1',
        });

        this.filterFormGroup.valueChanges.subscribe(
            () => {
                this.getListing();
            },
        );
    }

    private getStatementPeriod(): void {
        this.statementApiService.getPeriod(this.customerID).subscribe({
            next: success => {
                this.statementPeriods = success.map(
                    period => {
                        period.uiLabel = `${moment(period.startDate).format('DD MMM YY')} till ${moment(period.endDate).format('DD MMM YY')}`;
                        return period;
                    }
                );
            }
        });
    }
}
