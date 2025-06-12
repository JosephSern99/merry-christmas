import {CommonModule, Location} from '@angular/common';
import { Component } from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerDetailModel } from 'src/app/core/models/customer/customer.model';
import { PlannerNoteCreate, CustomerInformation } from 'src/app/core/models/planner-note/planner-note.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { InternalNotesService } from 'src/app/core/services/api/internal-notes.service';
import { NoteEditComponent } from 'src/app/pages/advisor/note/note-edit/note-edit.component';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {PlannerNoteBreadcrumbComponent} from '../../planner-notes/planner-note-breadcrumb/planner-note-breadcrumb.component';

@Component({
    selector: 'app-customer-internal-note-edit',
    templateUrl: '../../../advisor/note/note-edit/note-edit.component.html',
    styleUrls: ['../../../advisor/note/note-edit/note-edit.component.scss', './customer-internal-note-edit.component.scss'],
    standalone: true,
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatIconModule,
        MatProgressBarModule,
        MatProgressBarModule,
        NgxMatSelectSearchModule,
        PlannerNoteBreadcrumbComponent
    ]
})
export class CustomerInternalNoteEditComponent extends NoteEditComponent {

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

    getBreadcrumbs(): { path: string; title: string; }[] {
        let pageTitle = this.isAddOperation ? 'Create Internal Note' : 'Edit Internal Note';

        return [
            { path: '/customer', title: 'Client List' },
            { path: `../../`, title: this.breadcrumbName },
            { path: '', title: pageTitle },
        ];
    }

    protected getAssignableCustomers(): void { }

    protected getBreadcrumbData(id: string): void {
        this.breadcrumbService.getDetail(id).subscribe(
            (success: CustomerDetailModel) => {
                this.breadcrumbName = success.fullname;
            }
        );
    }

    protected getCreateApi(data: PlannerNoteCreate): Observable<boolean> {
        return this.apiService.createInternalNotes(data);
    }

    protected getEditApi(data: PlannerNoteCreate): Observable<boolean> {
        return this.apiService.updateInternalNotes(data, this.id)
    }

    protected getSearchCustomerApi(searchKey: string): Observable<CustomerInformation[]> {
        console.log(this.detail);
        return this.apiService.searchCustomers(this.advisorID, searchKey);
    }

    protected setupEditForm(): void {
        this.editForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.maxLength(255)]],
            description: ['', [Validators.required]],
        });
    }

}
