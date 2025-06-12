import { Component } from '@angular/core';
import { EndorseStatusType, PlannerNoteStatus } from 'src/app/core/constants/planner-note.constants';
import { UntypedFormBuilder } from '@angular/forms';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { PlannerNoteDetailModel, PlannerNoteListModel } from 'src/app/core/models/planner-note/planner-note.model';
import { PlannerNotesService } from 'src/app/core/services/api/planner-notes.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {EnumToArrayPipe} from '../../../shared/pipes/enum-to-array.pipe';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';


@Component({
    selector: 'app-planner-notes',
    templateUrl: './planner-notes.component.html',
    styleUrls: ['./planner-notes.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatProgressBarModule,
        EnumToArrayPipe,
        MatMenu,
        MatMenuTrigger,
        MatIconButton,
        MatMenuItem,
        MatButton,
        MatInput,
        // Add your custom pipes and components here
    ],
})
export class PlannerNotesComponent extends ListingPopupBaseComponent {

    displayedColumns: string[] = ['index', 'title', 'description', 'created-at', 'threeDotMenu'];
    listingDataSource: PlannerNoteListModel[] = [];
    PlannerNoteStatus = PlannerNoteStatus;

    constructor(
        protected popupService: PopupService,
        protected apiService: PlannerNotesService,
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
                this.apiService.getPlannerDetails(plannerID)
                    .subscribe((detail: PlannerNoteDetailModel) => {
                        const isEndorsedNote = detail.customerInformation.some((customer) => customer.status === EndorseStatusType.Endorsed);
                        if (isEndorsedNote) {
                            this.popupService.alert('One or more customers have endorsed this note.');
                            return;
                        }
                        this.apiService.deletePlannerNoteData(plannerID)
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
