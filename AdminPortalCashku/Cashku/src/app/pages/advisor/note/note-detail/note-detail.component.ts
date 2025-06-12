import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSortModule, Sort} from '@angular/material/sort';
import {ActivatedRoute, Router, RouterLink, RouterModule} from '@angular/router';
import { Observable } from 'rxjs';
import { EndorseStatus, EndorseStatusType } from 'src/app/core/constants/planner-note.constants';
import { CustomerInformation, PlannerNoteDetailModel } from 'src/app/core/models/planner-note/planner-note.model';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { ListingPopupDetailComponent } from 'src/app/pages/admin/listing-popup/base-detail/base-detail.component';
import { UiPaginationModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import {MatTable, MatTableModule} from '@angular/material/table';
import {PlannerNoteBreadcrumbComponent} from '../../../admin/planner-notes/planner-note-breadcrumb/planner-note-breadcrumb.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SafeHtmlPipe} from '../../../../shared/pipes/safe-html.pipe';

@Component({
    selector: 'app-note-detail',
    templateUrl: './note-detail.component.html',
    styleUrls: ['./note-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatProgressBarModule,
        PlannerNoteBreadcrumbComponent,
        SafeHtmlPipe,
        MatTable,
        MatPaginator
    ]
})
export abstract class NoteDetailComponent extends ListingPopupDetailComponent {

    breadcrumbName = 'Loading...';
    detail: PlannerNoteDetailModel;
    displayedColumns: string[] = ['index', 'fullname', 'email', 'fullPhoneNumber', 'signingStatus'];
    EndorseStatus = EndorseStatus;
    isListingLoading: boolean = false;
    listingDataSource: CustomerInformation[] = [];
    pagination: UiPaginationModel = new UiPaginationModel();

    protected readonly idParamKey: string = 'noteID';

    constructor(
        protected apiService: BaseApiService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected breadcrumbService: BaseApiService,
        protected popupService: PopupService,
    ) {
        super(apiService, activatedRoute, router);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.getBreadcrumbIDFromParam();
    }

    isListEmpty(): boolean {
        return this.listingDataSource.length === 0 && !this.isListingLoading;
    }

    onPaginationChange(page: PageEvent): void {
        this.pagination.pageIndex = page.pageIndex;
        this.pagination.pageSize = page.pageSize;

        this.getDetail();
    }

    onSortChange(sort: Sort): void {
        this.getDetail();
    }

    removePlannerNote(): void {
        this.popupService.confirm(`Are you sure want to delete ${this.detail.title}?`).then(
            () => {
                this.apiService.getDetail(this.detail.id).subscribe(
                    (detail: PlannerNoteDetailModel) => {
                        const isEndorsedNote = detail.customerInformation.some((customer) => customer.status === EndorseStatusType.Endorsed);
                        if (isEndorsedNote) {
                            this.popupService.alert('One or more customers have endorsed this note.');
                            return;
                        }

                        this.getDeleteNoteApi().subscribe(
                            () => {
                                this.popupService.alert('Successfully deleted').finally(
                                    () => {
                                        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
                                    }
                                );
                            },
                            error => {
                                if (error.errors && error.errors[0].Message) {
                                    this.popupService.alert(error.Errors[0].Message);
                                } else {
                                    this.popupService.alert('Server Error');
                                }
                            }
                        );
                    }
                );
            }
        ).catch(
            () => { }
        );
    }

    protected getBreadcrumbIDFromParam(): void {
        const breadcrumbDataID = this.activatedRoute.snapshot.paramMap.get('id');
        this.getBreadcrumbData(breadcrumbDataID);
    }

    protected handleSuccessResponse(response: any): void {
        super.handleSuccessResponse(response);

        this.pagination.length = response.totalCustomer;
        this.listingDataSource = this.detail.customerInformation.map(
            (customer, index) => ({
                index: this.pagination.pageIndex * this.pagination.pageSize + index + 1,
                ...customer,
            })
        );
    }

    abstract getBreadcrumbs(): { path: string, title: string }[];
    abstract getListDetailRoute(id: string | number): any[];
    abstract isEndorsedNote(): boolean;
    protected abstract getBreadcrumbData(id: string): void;
    protected abstract getDeleteNoteApi(): Observable<any>;

}
