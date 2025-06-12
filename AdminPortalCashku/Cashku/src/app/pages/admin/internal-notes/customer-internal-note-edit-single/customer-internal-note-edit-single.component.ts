import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerDetailModel } from 'src/app/core/models/customer/customer.model';
import { CustomerInformation, PlannerNoteCreate } from 'src/app/core/models/planner-note/planner-note.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { InternalNotesService } from 'src/app/core/services/api/internal-notes.service';
import { NoteEditSingleComponent } from 'src/app/pages/advisor/note/note-edit-single/note-edit-single.component';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-customer-internal-note-edit-single',
    templateUrl: '../../../advisor/note/note-edit-single/note-edit-single.component.html',
    styleUrls: ['../../../advisor/note/note-edit/note-edit.component.scss', './customer-internal-note-edit-single.component.scss'],
    standalone: false
})
export class CustomerInternalNoteEditSingleComponent extends NoteEditSingleComponent {

    protected readonly idParamKey = 'id';

    constructor(
        protected apiService: InternalNotesService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected breadcrumbService: CustomerService,
        protected popupService: PopupService,
        protected formBuilder: UntypedFormBuilder,
        protected blockUIService: BlockUiService,
        protected location: Location,
    ) {
        super(apiService, activatedRoute, router, breadcrumbService, popupService, formBuilder, blockUIService, location);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.getIDFromUrlParam();
        this.getBreadcrumbIDFromParam();
    }

    getBackPath(): any[] {
        return ['..'];
    }

    getBreadcrumbs(): { path: string; title: string; }[] {
        let pageTitle = this.isAddOperation ? 'Create Internal Note' : 'Edit Internal Note';

        return [
            { path: '/customer', title: 'Client List' },
            { path: `../../`, title: this.breadcrumbName },
            { path: '', title: pageTitle },
        ];
    }

    protected getCreateApi(data: PlannerNoteCreate): Observable<boolean> {
        data.customerList = [this.customerDetail.id];

        return this.apiService.createInternalNotes(data);
    }

    protected getEditApi(data: PlannerNoteCreate): Observable<boolean> {
        return this.apiService.updateInternalNotes(data, this.id)
    }

    protected getSearchCustomerApi(searchKey: string): Observable<CustomerInformation[]> {
        return this.apiService.searchCustomers(this.advisorID, searchKey);
    }

}
