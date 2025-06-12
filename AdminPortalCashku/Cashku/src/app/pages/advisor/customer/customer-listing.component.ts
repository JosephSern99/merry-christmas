import { Component } from '@angular/core';
import { CustomerListingFilterModel } from 'src/app/core/models/customer/customer.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { UntypedFormBuilder } from '@angular/forms';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { NewRegisterStep } from 'src/app/core/constants/customer.constants';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-customer-listing',
    templateUrl: './customer-listing.component.html',
    styleUrls: ['./customer-listing.component.scss'],
    standalone: false
})
export class CustomerListingComponent extends ListingPopupBaseComponent {

    displayedColumns: string[] = ['index', 'fullname', 'email', 'fullPhoneNumber', 'netWorth', 'registerStep', 'add_note'];
    selected: string = 'All';
    RegisterStep = NewRegisterStep;

    constructor(
        protected customerService: CustomerService,
        protected formBuilder: UntypedFormBuilder,
    ) {
        super(customerService, formBuilder);
    }

    protected generateListingFilterParam(): ListingFilterModel {
        let filter: ListingFilterModel = super.generateListingFilterParam();

        if (filter.keywords.length > 0) {
            filter.keywordsField = 'FullName';
        }

        return filter;
    }

    getListing(): void {
        this.isListingLoading = true;
        let filter: ListingFilterModel = this.generateListingFilterParam();

        this.customerService.getAdvisorCustomerList(filter)
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
}
