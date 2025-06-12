import {CommonModule, Location} from '@angular/common';
import { Component } from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { Observable } from 'rxjs';
import { AdvisorDetailModel } from 'src/app/core/models/advisor/advisor.model';
import { CustomerInformation, PlannerNoteCreate } from 'src/app/core/models/planner-note/planner-note.model';
import { AdvisorService } from 'src/app/core/services/api/advisor.service';
import { PlannerNotesService } from 'src/app/core/services/api/planner-notes.service';
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
import {PlannerNoteBreadcrumbComponent} from '../planner-note-breadcrumb/planner-note-breadcrumb.component';

@Component({
    selector: 'app-advisor-planner-note-edit',
    templateUrl: '../../../advisor/note/note-edit/note-edit.component.html',
    styleUrls: ['../../../advisor/note/note-edit/note-edit.component.scss', './advisor-planner-note-edit.component.scss'],
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
export class AdvisorPlannerNoteEditComponent extends NoteEditComponent {

    constructor(
        protected apiService: PlannerNotesService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected breadcrumbService: AdvisorService,
        protected popupService: PopupService,
        protected formBuilder: UntypedFormBuilder,
        protected blockUIService: BlockUiService,
        protected location: Location,
    ) {
        super(apiService, activatedRoute, router, breadcrumbService, popupService, formBuilder, blockUIService, location);
    }

    getBreadcrumbs(): { path: string; title: string; }[] {
        return [
            { path: '/customer', title: 'Advisor List' },
            { path: `../../`, title: this.breadcrumbName },
            { path: '', title: 'Advisor Note Details' },
        ];
    }

    protected getBreadcrumbData(id: string): void {
        this.breadcrumbService.getDetail(id).subscribe(
            (success: AdvisorDetailModel) => {
                this.breadcrumbName = success.fullName;
            }
        );
    }

    protected getCreateApi(data: PlannerNoteCreate): Observable<boolean> {
        return this.apiService.createPlannerNotes(data);
    }

    protected getEditApi(data: PlannerNoteCreate): Observable<boolean> {
        return this.apiService.updatePlannerNotes(data, this.id)
    }

    protected getSearchCustomerApi(searchKey: string): Observable<CustomerInformation[]> {
        return this.apiService.searchCustomers(this.advisorID, searchKey);
    }

    protected setupEditForm(): void {
        this.editForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.maxLength(255)]],
            description: ['', [Validators.required]],
        });
    }

}
