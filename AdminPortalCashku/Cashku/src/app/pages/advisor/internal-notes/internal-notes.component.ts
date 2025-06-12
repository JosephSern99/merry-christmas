import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { EndorseStatusType, PlannerNoteStatus } from 'src/app/core/constants/planner-note.constants';
import { PlannerNoteDetailModel, PlannerNoteListModel } from 'src/app/core/models/planner-note/planner-note.model';
import { InternalNotesService } from 'src/app/core/services/api/internal-notes.service';
import { PlannerNotesService } from 'src/app/core/services/api/planner-notes.service';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { PlannerNotesComponent } from 'src/app/pages/advisor/planner-notes/planner-notes.component';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-internal-notes',
    templateUrl: './internal-notes.component.html',
    styleUrls: ['./internal-notes.component.scss'],
    standalone: false
})
export class InternalNotesComponent extends ListingPopupBaseComponent {

    displayedColumns: string[] = ['index', 'title', 'description', 'submission-date', 'threeDotMenu'];
    listingDataSource: PlannerNoteListModel[] = [];
    PlannerNoteStatus = PlannerNoteStatus;

    constructor(
        protected popupService: PopupService,
        protected apiService: InternalNotesService,
        protected formBuilder: UntypedFormBuilder,
    ) {
        super(apiService, formBuilder);
    }

    protected generateListingFilterParam(): ListingFilterModel {
        let newFilter: ListingFilterModel = super.generateListingFilterParam();
        if (newFilter.keywords.length > 0) {
            newFilter.keywordsField = 'Title';
        }

        return newFilter;
    }

    removePlannerNote(plannerID: string, plannerTitle: string = '-') {
        this.popupService.confirm('Are you sure want to delete ' + plannerTitle + ' ?')
            .then(() => {
                this.apiService.getDetail(plannerID)
                    .subscribe((detail: PlannerNoteDetailModel) => {
                        const isEndorsedNote = detail.customerInformation.some((customer) => customer.status === EndorseStatusType.Endorsed);
                        if (isEndorsedNote) {
                            this.popupService.alert('One or more customers have endorsed this note.');
                            return;
                        }
                        this.apiService.deleteInternalNoteData(plannerID)
                            .subscribe(data => {
                                this.getListing();
                                this.popupService.alert("Successfully deleted");
                            }, error => {
                                if (error.errors && error.errors[0].Message) {
                                    this.popupService.alert(error.Errors[0].Message);
                                }
                                else {
                                    this.popupService.alert("Server Error");
                                }
                            })
                    }
                );
            }, () => { });
    }
}
