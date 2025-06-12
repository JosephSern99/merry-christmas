import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerInformation, PlannerNoteCreate } from 'src/app/core/models/planner-note/planner-note.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { PlannerNotesService } from 'src/app/core/services/api/planner-notes.service';
import { NoteEditSingleComponent } from 'src/app/pages/advisor/note/note-edit-single/note-edit-single.component';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-planner-notes-special-edit',
    templateUrl: '../../../advisor/note/note-edit-single/note-edit-single.component.html',
    styleUrls: ['../../../advisor/note/note-edit/note-edit.component.scss', './planner-notes-special-edit.component.scss'],
    standalone: false
})
export class PlannerNotesSpecialEditComponent extends NoteEditSingleComponent {

    constructor(
        protected apiService: PlannerNotesService,
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

    getBackPath(): any[] {
        let backToDetail = '../..';
        if (this.isAddOperation) {
            backToDetail = '..';
        }

        return [backToDetail];
    }

    getBreadcrumbs(): { path: string; title: string; }[] {
        let pageTitle = 'Edit Advisor Note';
        let backToDetail = '../../';
        if (this.isAddOperation) {
            pageTitle = 'Create Advisor Note';
            backToDetail = '../';
        }

        return [
            { path: '/advisor-customer', title: 'Client List' },
            { path: backToDetail, title: this.breadcrumbName },
            { path: '', title: pageTitle },
        ];
    }

    protected getCreateApi(data: PlannerNoteCreate): Observable<boolean> {
        data.customerList = [this.customerDetail.id];

        return this.apiService.createPlannerNotes(data);
    }

    protected getEditApi(data: PlannerNoteCreate): Observable<boolean> {
        return this.apiService.updatePlannerNotes(data, this.id)
    }

    protected getSearchCustomerApi(searchKey: string): Observable<CustomerInformation[]> {
        return this.apiService.searchCustomers(this.advisorID, searchKey);
    }

}
