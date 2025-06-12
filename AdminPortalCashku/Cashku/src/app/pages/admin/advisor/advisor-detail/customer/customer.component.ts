import { ActivatedRoute } from '@angular/router';
import { AdvisorAssignCustomerTabInterface, BaseSubTabPageInterface } from 'src/app/pages/admin/listing-popup/base-listing-popup-page.interface';
import { AdvisorService } from 'src/app/core/services/api/advisor.service';
import { Component } from '@angular/core';
import { CustomerDetailModel } from 'src/app/core/models/customer/customer.model';
import { CustomerPlan, NewRegisterStep } from 'src/app/core/constants/customer.constants';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';
import { UntypedFormBuilder } from '@angular/forms';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
    standalone: false
})
export class CustomerComponent extends ListingPopupBaseComponent implements BaseSubTabPageInterface, AdvisorAssignCustomerTabInterface {

    displayedColumns: string[] = ['index', 'fullname', 'planStatus', 'email', 'phoneNo', 'networth', 'registerStep', 'threeDotMenu'];
    listingDataSource: CustomerDetailModel[] = [];
    isListingLoading: boolean = false;
    RegisterStep = NewRegisterStep;
    CustomerPlan = CustomerPlan;

    protected customerID: string;

    constructor(
        protected apiService: AdvisorService,
        protected formBuilder: UntypedFormBuilder,
        protected activatedRoute: ActivatedRoute,
        private popupService: PopupService,
    ) {
        super(apiService, formBuilder);
    }

    ngOnInit(): void {
        this.setupFilterFormGroup();
        this.setupSearchBar();
        this.getCustomerIDFromParent();
    }


    getListing(): void {
        this.isListingLoading = true;
        let filter: ListingFilterModel = this.generateListingFilterParam();

        this.apiService.getAdvisorCustomerList(this.customerID, filter).pipe(takeUntil(this.componentInstance$)).subscribe(
            (success) => {
                this.handleSuccessListingResponse(success);
            },
            (error) => {
                if (error.error.messages[0].message) {
                    this.popupService.alert(error.error.messages[0].message)
                }
                else {
                    this.popupService.alert("Server Error");
                }
            }
        ).add(
            () => { this.isListingLoading = false; }
        );
    }

    getSubTab(): DetailSubTab {
        return DetailSubTab.Customer;
    }

    protected generateListingFilterParam(): ListingFilterModel {
        let newFilter: ListingFilterModel = super.generateListingFilterParam();
        if (newFilter.keywords.length > 0) {
            newFilter.keywordsField = 'fullname';
        }

        return newFilter;
    }

    protected getCustomerIDFromParent(): void {
        this.activatedRoute.parent.params.subscribe(
            (params) => {
                this.customerID = params.id || null;
                this.getListing();
            }
        );
    }

    removeCustomer(customerID: string): void {
        this.popupService.confirm('Are you sure want to remove this customer from this Advisor?').then(
            () => {
                this.apiService.removeAssignedCustomer(this.customerID, [customerID]).subscribe((data) => {
                    this.getListing();
                    this.popupService.alert("Customer successfully removed from the Advisor.");
                });
            },
            () => { }
        );
    }

}
