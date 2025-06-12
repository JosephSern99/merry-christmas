import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdvisorDetailModel } from 'src/app/core/models/advisor/advisor.model';
import { CustomerListModel } from 'src/app/core/models/customer/customer.model';
import { AdvisorService } from 'src/app/core/services/api/advisor.service';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-assign-customer-listing',
    templateUrl: './assign-customer-listing.component.html',
    styleUrls: ['./assign-customer-listing.component.scss'],
    standalone: false
})
export class AssignCustomerListingComponent extends ListingPopupBaseComponent {
    @Input() newAdvisor$: Subject<AdvisorDetailModel>;
    @ViewChild(MatTable) table: MatTable<any>;

    displayedColumns = ['select', 'fullName', 'email', 'fullPhoneNumber', 'newAdvisor'];
    listingDataSource: AssignCustomerListingModel[] = [];
    customerSelection = new SelectionModel<any>(true, []);

    private advisorId = this.activatedRoute.snapshot.params.id;

    constructor(
        protected apiService: AdvisorService,
        protected baseApi: BaseApiService,
        protected formBuilder: UntypedFormBuilder,
        private activatedRoute: ActivatedRoute,
        private popupService: PopupService,
    ) {
        super(apiService, formBuilder);
    }

    ngOnInit(): void {
        this.updateCustomerAdvisors();
        super.ngOnInit();
    }

    getListing(): void {
        this.isListingLoading = true;
        let filter: ListingFilterModel = this.generateListingFilterParam();
        filter.take = 1000000; //? Request all customers from server

        this.apiService.getAdvisorCustomerList(this.advisorId, filter).pipe(takeUntil(this.componentInstance$)).subscribe(
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

    onSortChange(sortInfo: Sort): void {
        switch (sortInfo.direction) {
            case 'asc':
                this.listingDataSource.sort((a, b) => a.fullname.localeCompare(b.fullname));
                break;
            case 'desc':
                this.listingDataSource.sort((a, b) => b.fullname.localeCompare(a.fullname));
                break;
        }
        this.table.renderRows();
    }

    onCustomerToggled(customer: any): void {
        this.customerSelection.toggle(customer.id);
    }

    onToggleAllCustomers(): void {
        this.isAllCustomersSelected() ? this.customerSelection.clear() : this.customerSelection.select(...this.listingDataSource.map((c) => c.id));
    }

    isAllCustomersSelected(): boolean {
        return this.customerSelection.selected.length === this.listingDataSource.length;
    }

    /**
     * This method updates the advisor for each selected customer.
     * It subscribes to the newAdvisor$ observable and for each new advisor,
     * it updates the newAdvisorName and newAdvisorId fields of each selected customer in the listingDataSource.
     * After updating the customers, it clears the selection.
     */
    private updateCustomerAdvisors(): void {
        this.newAdvisor$.subscribe(advisor => {
            this.customerSelection.selected.forEach(customerId => {
                const customerIndex = this.listingDataSource.findIndex(customer => customer.id === customerId);
                const updatedCustomer = {
                    ...this.listingDataSource[customerIndex],
                    newAdvisorName: advisor.fullName,
                    newAdvisorId: advisor.id
                };
                this.listingDataSource[customerIndex] = updatedCustomer;
            });

            this.customerSelection.clear();
            this.table.renderRows();
        });
    }
}

interface AssignCustomerListingModel extends CustomerListModel {
    newAdvisorName: string;
    newAdvisorId: string;
}
