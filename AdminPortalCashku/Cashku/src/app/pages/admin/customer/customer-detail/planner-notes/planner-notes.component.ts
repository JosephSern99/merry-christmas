import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';
import { EndorseStatus } from 'src/app/core/constants/planner-note.constants';
import { CustomerListingFilterModel } from 'src/app/core/models/customer/customer.model';
import { PlannerNoteListModel } from 'src/app/core/models/planner-note/planner-note.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { BaseSubTabPageInterface } from 'src/app/pages/admin/listing-popup/base-listing-popup-page.interface';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { PlannerNotesService } from './../../../../../core/services/api/planner-notes.service';

@Component({
    selector: 'app-planner-notes',
    templateUrl: './planner-notes.component.html',
    styleUrls: ['./planner-notes.component.scss'],
    standalone: false
})
export class PlannerNotesComponent extends ListingPopupBaseComponent implements BaseSubTabPageInterface {
    displayedColumns: string[] = ['index', 'title', 'description', 'createdAt', 'status', 'threeDotMenu'];
    EndorseStatus: any = EndorseStatus;
    listingDataSource: PlannerNoteListModel[] = [];
    readonly templateForRole: string = 'admin'

    protected customerID: string;
    protected customerName: string;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected apiService: CustomerService,
        protected formBuilder: UntypedFormBuilder,
        protected plannerNotesService: PlannerNotesService,
        protected popupService: PopupService,
    ) {
        super(apiService, formBuilder);
    }

    ngOnInit(): void {
        this.setupFilterFormGroup();
        this.setupSearchBar();
        this.getCustomerIDFromParent();
        this.getCustomerNameFromParams();
    }

    getListing(): void {
        this.isListingLoading = true;
        let filter: CustomerListingFilterModel = this.generateListingFilterParam();

        this.apiService.getPlannerNotes(this.customerID, filter).pipe(takeUntil(this.componentInstance$)).subscribe(
            (success) => {
                this.handleSuccessListingResponse(success);
            },
            (error) => { console.log(error); }
        ).add(
            () => { this.isListingLoading = false; }
        );
    }

    getSubTab(): DetailSubTab {
        return DetailSubTab.PlannerNotes;
    }

    protected generateListingFilterParam(): CustomerListingFilterModel {
        let parentFilter: ListingFilterModel = super.generateListingFilterParam();
        let newFilter: CustomerListingFilterModel = new CustomerListingFilterModel();

        Object.assign(newFilter, parentFilter);

        newFilter.endorseStatus = `${this.filterFormGroup.get('endorseStatus').value}`;
        newFilter.keywordsField = 'Title';

        return newFilter;
    }

    protected getCustomerIDFromParent(): void {
        this.activatedRoute.parent.params.subscribe(
            (params) => {
                this.customerID = params.id || null;
                this.getListing();
            }
        );
    }

    protected setupFilterFormGroup(): void {
        this.filterFormGroup = this.formBuilder.group({
            endorseStatus: '-1',
        });

        this.filterFormGroup.valueChanges.subscribe(
            () => {
                this.getListing();
            },
        );
    }

    removePlannerNotes(plannerNotesId: string) {
        this.popupService.confirm('Are you sure want to remove this customer from this planner note ?')
            .then(() => {
                this.plannerNotesService.deleteCustomerFromPlannerNote(plannerNotesId)
                    .subscribe(data => {
                        this.getListing();
                        this.popupService.alert("Successfully removed customer from note.");
                    })
            }, () => { });
    }

    getCustomerNameFromParams(): void {
        this.activatedRoute.params.subscribe(
            (params) => {
                this.customerName = params.customerName || null;
            }
        );
    }

    getEditRoute(id: string) {
        let role = 'admin';

        if (this.templateForRole === 'advisor') {
            role = 'advisor';
        }

        return [ `/${role}-planner-notes/detail/${id}/${this.customerID}/edit` ];
    }

    getDetailRoute(id: string) {
        if (this.templateForRole === 'advisor') {
            return [ `/advisor-planner-notes/detail/${id}` ];
        }
    }
}
