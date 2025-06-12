import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { CustomerPlan } from 'src/app/core/constants/customer.constants';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';
import { AdvisorDetailModel, AssignableCustomerModel } from 'src/app/core/models/advisor/advisor.model';
import { AdvisorService } from 'src/app/core/services/api/advisor.service';
import { ListingPopupDetailComponent } from 'src/app/pages/admin/listing-popup/base-detail/base-detail.component';
import { AdvisorAssignCustomerTabInterface, BaseParentTabPageInterface, BaseSubTabPageInterface } from 'src/app/pages/admin/listing-popup/base-listing-popup-page.interface';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { AssignCustomerModalComponent } from './assign-customer-modal/assign-customer-modal.component';

@Component({
    selector: 'app-advisor-detail',
    templateUrl: './advisor-detail.component.html',
    styleUrls: ['./advisor-detail.component.scss'],
    standalone: false
})
export class AdvisorDetailComponent extends ListingPopupDetailComponent implements BaseParentTabPageInterface {

    CustomerPlan = CustomerPlan;
    customers: AssignableCustomerModel[] = [];
    DetailSubTab = DetailSubTab;
    id: string;
    selectedTab: DetailSubTab;
    detail: AdvisorDetailModel;

    protected _onDestroy = new Subject<void>();
    protected advisorID: string;

    private currentTab: AdvisorAssignCustomerTabInterface;

    constructor(
        protected apiService: AdvisorService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        private modalService: NgbModal,
        private popupService: PopupService,
        private cdr: ChangeDetectorRef,
    ) {
        super(apiService, activatedRoute, router);
    }

    assignCustomer(): void {
        const modalInstance = this.modalService.open(AssignCustomerModalComponent, {
            centered: true,
            windowClass: 'modal-1200'
        });

        (modalInstance.componentInstance as AssignCustomerModalComponent).advisorId = this.id;
        modalInstance.result.then(() => {
            if (this.selectedTab === DetailSubTab.Customer)
                this.currentTab.getListing();
        }, () => { });
    }

    onRouterOutletActivate(subTab: BaseSubTabPageInterface & AdvisorAssignCustomerTabInterface): void {
        if (!subTab.getSubTab) {
            console.warn('Sub Tab component didn\' implement BaseSubTabPageInterface in CustomerDetailComponent!');
            return;
        }

        this.selectedTab = subTab.getSubTab();
        this.currentTab = subTab;
        this.cdr.detectChanges();
    }

    onUnsuspend(): void {
        this.popupService
            .confirm('Are you sure you want to unsuspend this advisor?')
            .then(
                () => {
                    this.apiService.unsuspendAdvisor(this.detail.id).subscribe({
                        next: () => {
                            this.isRefresh = true;
                            this.getDetail();
                        },
                        error: (err) => {
                            if (err.error.messages[0].message) {
                                this.popupService.alert(err.error.messages[0].message);
                            }
                        },
                    });
                },
                () => {}
            );
    }

    protected handleErrorResponse(err: any): void {
        if (err.statusCode !== 401) {
            this.router.navigate(['/advisor']);
        }
    }
}
