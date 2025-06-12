import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';
import { AdvisorListingFilterModel, PlannerNoteListModel } from 'src/app/core/models/planner-note/planner-note.model';
import { PlannerNotesService } from 'src/app/core/services/api/planner-notes.service';
import { BaseSubTabPageInterface } from 'src/app/pages/admin/listing-popup/base-listing-popup-page.interface';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-planner-notes',
    templateUrl: './planner-notes.component.html',
    styleUrls: ['./planner-notes.component.scss'],
    standalone: false
})
export class PlannerNotesComponent extends ListingPopupBaseComponent implements BaseSubTabPageInterface {

    displayedColumns: string[] = ['index', 'title', 'description', 'createdAt'];
    listingDataSource: PlannerNoteListModel[] = [];

    protected advisorId: string;

    constructor(
        protected apiService: PlannerNotesService,
        protected formBuilder: UntypedFormBuilder,
        private activatedRoute: ActivatedRoute,
        protected popupService: PopupService,
    ) {
        super(apiService, formBuilder);
    }

    ngOnInit(): void {
        this.getCustomerIDFromParent();
        this.setupFilterFormGroup();
        this.setupSearchBar();
    }

    getSubTab(): DetailSubTab {
        return DetailSubTab.PlannerNotes;
    }

    getListing(): void {
        this.isListingLoading = true;

        let filter: AdvisorListingFilterModel = this.generateAdvisorFilterParam();
        filter.advisorId = this.advisorId;

        this.apiService.getAdvisorPlannerNotes(filter).pipe(takeUntil(this.componentInstance$)).subscribe(
            (success) => {
                this.handleSuccessListingResponse(success);
            },
            (error) => { console.log(error); }
        ).add(
            () => { this.isListingLoading = false; }
        );
    }

    protected getCustomerIDFromParent(): void {
        this.activatedRoute.parent.params.subscribe(
            (params) => {
                this.advisorId = params.id || null;
                this.getListing();
            }
        );
    }

    protected generateAdvisorFilterParam(): AdvisorListingFilterModel {
        let parentFilter = super.generateListingFilterParam();
        let newFilter: AdvisorListingFilterModel = new AdvisorListingFilterModel();

        if (parentFilter.keywords.length > 0) {
            parentFilter.keywordsField = 'title';
        }

        Object.assign(newFilter, parentFilter);

        return newFilter;
    }

    removePlannerNotes(plannerNotesId: string) {
        this.popupService.confirm('Are you sure want to remove this advisor notes ?')
            .then(() => {
                this.apiService.deletePlannerNoteData(plannerNotesId)
                    .subscribe(data => {
                        this.getListing();
                        this.popupService.alert("Successfully deleted");
                    }, error => {
                        if (error.error.messages[0].message) {
                            this.popupService.alert(error.error.messages[0].message);
                        }
                        else {
                            this.popupService.alert("Server Error");
                        }
                    })
            }, () => { });
    }
}
