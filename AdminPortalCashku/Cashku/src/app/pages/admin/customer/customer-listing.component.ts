import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { CustomerRegistrationStatus, NewRegisterStep, OrderedCustomerRegistrationStatus } from 'src/app/core/constants/customer.constants';
import { CustomerListModel, CustomerListingFilterModel } from 'src/app/core/models/customer/customer.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { ListingFilterModel, ListingResponseModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-customer-listing',
    templateUrl: './customer-listing.component.html',
    styleUrls: ['./customer-listing.component.scss'],
    standalone: false
})
export class CustomerListingComponent extends ListingPopupBaseComponent {

    CustomerRegistrationStatus = CustomerRegistrationStatus;
    displayedColumns: string[] = ['index', 'fullname', 'email', 'fullPhoneNumber', 'advisorName', 'netWorth', 'registerStep', 'threeDotMenu'];
    listingDataSource: CustomerListModel[] = [];
    RegisterStep = NewRegisterStep;
    UI_CustomerRegistrationStatus = OrderedCustomerRegistrationStatus.map(key => ({
        value: CustomerRegistrationStatus[key],
        label: key,
    }));

    constructor(
        protected apiService: CustomerService,
        protected baseApi: BaseApiService,
        protected formBuilder: UntypedFormBuilder,
        private popupService: PopupService,
    ) {
        super(apiService, formBuilder);
    }

    protected generateListingFilterParam(): CustomerListingFilterModel {
        let parentFilter: ListingFilterModel = super.generateListingFilterParam();
        let newFilter: CustomerListingFilterModel = new CustomerListingFilterModel();

        Object.assign(newFilter, parentFilter);

        if (newFilter.keywords.length > 0) {
            newFilter.keywordsField = 'FullName';
        }

        newFilter.RegisterStep = this.filterFormGroup.get('RegisterStep').value;

        return newFilter;
    }

    protected setupFilterFormGroup(): void {
        this.filterFormGroup = this.formBuilder.group({
            RegisterStep: CustomerRegistrationStatus.All,
        });

        this.filterFormGroup.valueChanges.subscribe(
            () => {
                this.getListing();
            },
        );
    }

    getListing(): void {
        this.isListingLoading = true;
        let filter: CustomerListingFilterModel = this.generateListingFilterParam();

        this.apiService.getAdminCustomerList(filter)
            .pipe(takeUntil(this.componentInstance$))
            .subscribe(
                (success: any) => {
                    this.handleSuccessListingResponse(success);
                },
                (error) => { console.log(error); }
            ).add(
                () => { this.isListingLoading = false; }
            );
    }

    suspendCustomer(customerID: string, isSuspending: boolean): void {
        this.popupService.suspendCustomer(customerID, isSuspending).then(
            () => this.getListing(),
            () => {}
        );
    }

    removeCustomer(customerID: string) {
        this.popupService.confirm('Are you sure want to delete this customer?').then(() => {
            this.apiService.deleteCustomerData(customerID)
                .subscribe(data => {
                    this.getListing();
                    this.popupService.alert('Successfully deleted');
                })
        }, () => { });
    }

    protected handleSuccessListingResponse(responseData: ListingResponseModel<CustomerListModel>): void {
        super.handleSuccessListingResponse(responseData);
        this.listingDataSource.map(customer => ({
            ...customer,
            registerStep: customer.registerStep !== CustomerRegistrationStatus.All ? customer.registerStep : -1
        }));
    }
}
