import { Component, OnInit } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { EndorseStatus, EndorseStatusType } from 'src/app/core/constants/planner-note.constants';
import { PlannerNoteDetailModel, PlannerNoteListModel } from 'src/app/core/models/planner-note/planner-note.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { PlannerNotesService } from 'src/app/core/services/api/planner-notes.service';
import { ListingPopupDetailComponent } from 'src/app/pages/admin/listing-popup/base-detail/base-detail.component';
import { UiPaginationModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import {CommonModule} from '@angular/common';
import {MatTable} from '@angular/material/table';
import {PlannerNoteBreadcrumbModule} from '../../../admin/planner-notes/planner-note-breadcrumb/planner-note-breadcrumb.module';
import {ListingPopupBreadcrumbModule} from '../../../admin/listing-popup/helpers/listing-popup-breadcrumb/listing-popup-breadcrumb.module';
import {SharedModule} from '../../../../shared/shared.module';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'app-planner-notes-detail',
    templateUrl: './planner-notes-detail.component.html',
    styleUrls: ['./planner-notes-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        MatPaginator,
        MatTable,
        PlannerNoteBreadcrumbModule,
        ListingPopupBreadcrumbModule,
        SharedModule,
        MatProgressBar,
        MatButton
    ]
})
export class PlannerNotesDetailComponent extends ListingPopupDetailComponent implements OnInit {

    detail: PlannerNoteListModel;
    displayedColumns: string[] = ['index', 'fullname', 'email', 'fullPhoneNumber', 'signingStatus'];
    EndorseStatus = EndorseStatus;
    isFromAdvisorPage: boolean;
    isFromClientPage: boolean;
    isListingLoading: boolean = false;
    listingDataSource: PlannerNoteListModel[] = [];
    pagination: UiPaginationModel = new UiPaginationModel();
    readonly templateForRole: string = 'advisor';

    protected advisorID: string;
    protected customerID: string;
    protected customerName = '';

    private sorting: Sort = { active: '', direction: '' };

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected apiService: PlannerNotesService,
        protected customerService: CustomerService,
        protected popupService: PopupService,
        protected route: ActivatedRoute,
        protected router: Router,
    ) {
        super(apiService, activatedRoute, router);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    onPaginationChange(page: PageEvent): void {
        this.pagination.pageIndex = page.pageIndex;
        this.pagination.pageSize = page.pageSize;

        this.getDetail();
    }

    onSortChange(sortInfo: Sort): void {
        this.sorting = sortInfo;
        this.getDetail();
    }

    getBackBtnUrl(): string[] {
        return ['../'];
    }

    getDetail(): void {
        const params = {
            skip: ((this.pagination.pageIndex + 1) * this.pagination.pageSize) - this.pagination.pageSize,
            take: this.pagination.pageSize
        }
        this.apiService.getPlannerDetails(this.id, params).subscribe(
            (success) => this.handleSuccessResponse(success),
            (err) => this.handleErrorResponse(err)
        );
    }

    protected handleSuccessResponse(response: PlannerNoteDetailModel): void {
        super.handleSuccessResponse(response);
        this.pagination.length = response.totalCustomer;
        this.detail.customerInformation = this.detail.customerInformation.map((customer, index) => ({
            ...customer,
            index: this.pagination.pageIndex * this.pagination.pageSize + index + 1
        }));
    }

    removePlannerNote(plannerID: string, plannerTitle: string = '-') {
        this.popupService.confirm('Are you sure want to delete ' + plannerTitle + ' ?')
            .then(() => {
                this.apiService.deletePlannerNoteData(plannerID)
                    .subscribe(data => {
                        this.popupService.alert('Successfully deleted')
                            .then(() => {
                                this.router.navigate(['../'], { relativeTo: this.route });
                                this.isRefresh = true;
                            });
                    })
            }, () => { });
    }

    isListEmpty(): boolean {
        return this.detail.customerInformation.length === 0 && !this.isListingLoading;
    }

    isEndorsedNote(): boolean {
        return this.detail.customerInformation.some(customer => customer.status === EndorseStatusType.Endorsed);
    }

    getCustomerDetailFromParams(): void {
        let userID: string;

        if (!this.customerID && !this.advisorID) {
            return;
        }

        if (this.customerID) {
            userID = this.customerID;
        } else {
            userID = this.advisorID;
        }

        this.customerService.getDetail(userID).subscribe(
            (success: any) => {
                this.customerName = success.fullname;
            }
        )
    }

    getEditRoute() {
        if (this.templateForRole === 'admin') {
            return [ `/admin-planner-notes/detail/${this.id}/${this.customerID}/edit` ];
        }
        return ['edit'];
    }

    getBreadcrumbs() {
        if (this.customerID) {
            return [
                { path: '/customer', title: 'Client List' },
                { path: `/customer/detail/${this.customerID}`, title: this.customerName },
                { path: '', title: 'Advisor Note Details' },
            ];
        }

        return [
            { path: '/advisor', title: 'Advisor List'},
            { path: `/advisor/detail/${this.advisorID}`, title: this.customerName },
            { path: '', title: 'Advisor Note Details' },
        ];
    }

    protected getCustomerIDFromUrl(): void {
        this.customerID = this.activatedRoute.snapshot.paramMap.get('customerID');
        this.advisorID = this.activatedRoute.snapshot.paramMap.get('id');

        if (!this.customerID && !this.advisorID) {
            return;
        }
        if (this.customerID) {
            this.isFromClientPage = true;
            return;
        }
        this.isFromAdvisorPage = true;
    }
}
