import { Component } from '@angular/core';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import { CustomerDetailModel } from 'src/app/core/models/customer/customer.model';
import { NoteEditComponent } from 'src/app/pages/advisor/note/note-edit/note-edit.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {PlannerNoteBreadcrumbComponent} from '../../../admin/planner-notes/planner-note-breadcrumb/planner-note-breadcrumb.component';

@Component({
    selector: 'app-note-edit-single',
    templateUrl: './note-edit-single.component.html',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatProgressBarModule,
        MatIconModule,
        MatButtonModule,
        NgxMatSelectSearchModule,
        PlannerNoteBreadcrumbComponent,
        MatProgressBar,
        MatProgressBarModule
    ]
})
export abstract class NoteEditSingleComponent extends NoteEditComponent {

    customerDetail!: CustomerDetailModel;

    ngOnInit(): void {
        super.ngOnInit();

        this.getIDFromUrlParam();
        this.getBreadcrumbIDFromParam();
    }

    protected getBreadcrumbData(id: string): void {
        this.breadcrumbService.getDetail(id).subscribe(
            (success: CustomerDetailModel) => {
                this.customerDetail = success;
                this.breadcrumbName = success.fullname;
            }
        );
    }

    protected setupEditForm(): void {
        this.editForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.maxLength(255)]],
            description: ['', [Validators.required]],
        });
    }

    abstract getBackPath(): any[];

}
