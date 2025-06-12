import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { Observable } from 'rxjs';
import { EndorseStatusType } from 'src/app/core/constants/planner-note.constants';
import { CustomerDetailModel } from 'src/app/core/models/customer/customer.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { PlannerNotesService } from 'src/app/core/services/api/planner-notes.service';
import { NoteDetailComponent } from 'src/app/pages/advisor/note/note-detail/note-detail.component';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {PlannerNoteBreadcrumbComponent} from '../planner-note-breadcrumb/planner-note-breadcrumb.component';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatSortModule, Sort} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {SafeHtmlPipe} from '../../../../shared/pipes/safe-html.pipe';

@Component({
    selector: 'app-customer-planner-note',
    templateUrl: '../../../advisor/note/note-detail/note-detail.component.html',
    styleUrls: ['../../../advisor/note/note-detail/note-detail.component.scss', './customer-planner-note.component.scss'],
    standalone: true,
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatProgressBarModule,
        MatIconModule,
        MatButtonModule,
        NgxMatSelectSearchModule,
        PlannerNoteBreadcrumbComponent,
        MatTable,
    ]
})
export class CustomerPlannerNoteComponent extends NoteDetailComponent {

    listingDataSource: any[] = [];
    pagination = {
        length: 0,
        pageSize: 10,
        pageIndex: 0,
        pageSizeOptions: [5, 10, 25, 100]
    };
    detail: any = {};

    constructor(
        protected apiService: PlannerNotesService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected breadcrumbService: CustomerService,
        protected popupService: PopupService,
    ) {
        super(apiService, activatedRoute, router, breadcrumbService, popupService);
    }

    onSortChange(sort: Sort): void {
        console.log('Sort changed:', sort);
        // Your sort logic here
    }

    // Fix event handler with correct type
    onPaginationChange(event: PageEvent): void {
        console.log('Pagination changed:', event);
        this.pagination.pageIndex = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        // Your pagination logic here
    }

    getBreadcrumbs(): { path: string; title: string; }[] {
        return [
            { path: '/customer', title: 'Client List' },
            { path: `../`, title: this.breadcrumbName },
            { path: '', title: 'Advisor Note Details' },
        ];
    }

    getListDetailRoute(id: string | number): any[] {
        return ['/customer/detail', id];
    }

    isEndorsedNote(): boolean {
        return this.listingDataSource.some(customer => customer.status === EndorseStatusType.Endorsed);
    }

    protected getBreadcrumbData(id: string): void {
        this.breadcrumbService.getDetail(id).subscribe(
            (success: CustomerDetailModel) => {
                this.breadcrumbName = success.fullname;
            }
        );
    }

    protected getDeleteNoteApi(): Observable<any> {
        return this.apiService.deletePlannerNoteData(this.detail.id);
    }

    onOutletActivate(): void {
        // Implementation
    }

    onOutletDeactivate(): void {
        // Implementation
    }

}
