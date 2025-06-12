import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';
import { CustomerListingFilterModel } from 'src/app/core/models/customer/customer.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { InternalNotesService } from 'src/app/core/services/api/internal-notes.service';
import { PlannerNotesComponent } from 'src/app/pages/admin/customer/customer-detail/planner-notes/planner-notes.component';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-internal-notes',
    templateUrl: './internal-notes.component.html',
    styleUrls: ['./internal-notes.component.scss'],
    standalone: false
})
export class InternalNotesComponent extends PlannerNotesComponent{
    displayedColumns: string[] = ['index', 'title', 'description', 'submissionDate', 'threeDotMenu'];
    readonly templateForRole: string = 'admin';

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected apiService: CustomerService,
        protected formBuilder: UntypedFormBuilder,
        protected internalNotesServices: InternalNotesService,
        protected popupService: PopupService,
    ) {
        super( activatedRoute, apiService, formBuilder, internalNotesServices, popupService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.getCustomerNameFromParams();
    }

    getListing(): void {
        this.isListingLoading = true;
        let filter: CustomerListingFilterModel = this.generateListingFilterParam();

        this.apiService.getInternalNotes(this.customerID, filter).pipe(takeUntil(this.componentInstance$)).subscribe(
            (success) => {
                this.handleSuccessListingResponse(success);
            },
            (error) => { console.log(error); }
        ).add(
            () => { this.isListingLoading = false; }
        );
    }

    getSubTab(): DetailSubTab {
        return DetailSubTab.InternalNotes;
    }

    removeInternalNotes(internalNotesId: string) {
        this.popupService.confirm('Are you sure want to remove this customer from this Internal note ?')
            .then(() => {
                this.internalNotesServices.deleteCustomerFromInternalNote(internalNotesId)
                    .subscribe(data => {
                        this.getListing();
                        this.popupService.alert("Successfully removed customer from note.");
                    })
            }, () => { });
    }

    getEditRoute(noteID: string): string[] {
        if (this.templateForRole === 'admin') {
            return [`/admin-internal-notes/detail/${noteID}/${this.customerID}/edit`]
        }
        return [`/advisor-internal-notes/detail/${noteID}/edit`];
    }

    getDetailRoute(id: string): string[] {
        if (this.templateForRole === 'advisor') {
            return [id];
        }
        return [`/admin-internal-notes/detail/${id}/${this.customerID}`];
    }
}
