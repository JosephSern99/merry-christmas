import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerRegistrationStatus } from 'src/app/core/constants/customer.constants';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';
import { CustomerDetailModel } from 'src/app/core/models/customer/customer.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ListingPopupDetailComponent } from 'src/app/pages/admin/listing-popup/base-detail/base-detail.component';
import { BaseParentTabPageInterface, BaseSubTabPageInterface } from 'src/app/pages/admin/listing-popup/base-listing-popup-page.interface';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss'],
    standalone: false
})
export class CustomerDetailComponent extends ListingPopupDetailComponent implements BaseParentTabPageInterface {

    detail: CustomerDetailModel;
    DetailSubTab = DetailSubTab;
    selectedTab: DetailSubTab;
    CustomerRegistrationStatus = CustomerRegistrationStatus;
    readonly templateForRole: string = 'admin';

    constructor(
        public storageService: StorageService,
        protected activatedRoute: ActivatedRoute,
        protected apiService: CustomerService,
        protected router: Router,
        private popupService: PopupService,
    ) {
        super(apiService, activatedRoute, router);
    }

    onRouterOutletActivate(subTab: BaseSubTabPageInterface): void {
        if (!subTab.getSubTab) {
            console.warn('Sub Tab component didn\' implement BaseSubTabPageInterface in CustomerDetailComponent!');
            return;
        }

        this.selectedTab = subTab.getSubTab();
    }

    removeCustomer(): void {
        this.popupService.confirm(`Are you sure want to delete this customer ${this.detail.fullname}?`).then(() => {
            this.apiService.deleteCustomerData(this.detail.id)
                .subscribe(data => {
                    this.popupService.alert('Successfully deleted').then(() => {
                        this.isRefresh = true;
                        this.router.navigate(['..'], {relativeTo: this.activatedRoute});
                    });
                })
        }, () => { });
    }

    suspendCustomer(isSuspending: boolean): void {
        this.popupService.suspendCustomer(this.detail.id, isSuspending).then(
            () => {
                this.isRefresh = true;
                this.getDetail();
            },
            () => {}
        );
    }

    resetPassword(): void {
        this.popupService.resetPassword(this.detail.email).then(
            () => {},
            () => {}
        );
    }

    updateAdvisor(isClicked: boolean): void {
        if (isClicked) {
            let customerID: string;
            this.activatedRoute.params.subscribe(
                (params) => {
                    customerID = params.id || null;
                    this.popupService.updateCustomerAdvisor(customerID).then(
                        () => { },
                        () => { this.getDetail() }
                    );
                }
            );
        }
    }
}
