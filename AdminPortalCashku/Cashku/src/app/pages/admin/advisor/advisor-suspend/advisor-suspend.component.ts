import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AdvisorDetailModel, ClientReassignList, SuspendAdvisorSubmissionModel } from 'src/app/core/models/advisor/advisor.model';
import { AdvisorService } from 'src/app/core/services/api/advisor.service';
import { ListingPopupEditComponent } from 'src/app/pages/admin/listing-popup/base-edit/base-edit.component';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { AssignCustomerListingComponent } from './assign-customer-listing/assign-customer-listing.component';

@Component({
    selector: 'app-advisor-suspend',
    templateUrl: './advisor-suspend.component.html',
    styleUrls: ['./advisor-suspend.component.scss'],
    standalone: false
})
export class AdvisorSuspendComponent extends ListingPopupEditComponent {
    @ViewChild(AssignCustomerListingComponent) customerListing: AssignCustomerListingComponent;

    detail: AdvisorDetailModel;
    isDelete = this.activatedRoute.snapshot.data['isDelete'];
    showFormError = false;
    title = this.activatedRoute.snapshot.data.title;
    newAdvisor$ = new Subject<AdvisorDetailModel>();

    constructor(
        protected apiService: AdvisorService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected formBuilder: UntypedFormBuilder,
        protected popupService: PopupService,
        protected location: Location,
        private blockUIService: BlockUiService,
    ) {
        super(apiService, activatedRoute, router, formBuilder, popupService, location);
    }

    onSubmit(): void {
        const clientReassignList = this.customerListing.listingDataSource.map(data => ({
            userId: data.id,
            advisorId: data.newAdvisorId,
        }));

        const isAllCustomersAssigned = clientReassignList.every(c => !!c.advisorId);
        if (!isAllCustomersAssigned || this.editForm.invalid) {
            this.showFormError = true;
            return;
        }

        const requestBody = this.generateSubmissionModel(clientReassignList);

        this.blockUIService.open();
        this.getSubmit$(requestBody)
            .pipe(finalize(() => this.blockUIService.close()))
            .subscribe({
                next: () => this.handleSubmitResponse(),
                error: (err) => {
                    if (err.error.messages[0].message) {
                        this.popupService.alert(err.error.messages[0].message);
                    } else {
                        this.popupService.alert('Server Error');
                    }
                },
            });
    }

    onAssignAdvisor(): void {
        if (!this.customerListing.customerSelection.hasValue()) {
            return;
        }

        this.popupService.assignAdvisor(this.detail.id).then(
            (advisor) => this.newAdvisor$.next(advisor),
            () => {}
        );
    }

    protected setupEditForm(): void {
        this.editForm = this.formBuilder.group({
            reason: ['', Validators.required]
        });
    }

    private generateSubmissionModel(clientReassignList: ClientReassignList[]): SuspendAdvisorSubmissionModel {
        return {
            advisorId: this.detail.id,
            reason: this.editForm.value.reason,
            clientReassignList
        }
    }

    private getSubmit$(body: SuspendAdvisorSubmissionModel): Observable<boolean> {
        if (this.isDelete) {
            return this.apiService.deleteAdvisor(body);
        }

        return this.apiService.suspendAdvisor(body);
    }

    private handleSubmitResponse(): void {
        this.isChangesSaved = true;
        this.isRefresh = true;

        const message = `Successfully ${this.isDelete ? 'deleted' : 'suspended'} advisor`;
        this.popupService.alert(message);

        this.isDelete
            ? this.router.navigateByUrl('advisor')
            : this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    }
}
