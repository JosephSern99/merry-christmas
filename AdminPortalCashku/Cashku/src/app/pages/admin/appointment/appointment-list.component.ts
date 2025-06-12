import { AppointmentListFilterModel } from 'src/app/core/models/appointment/appointment.model';
import { AppointmentListModel } from '../../../core/models/appointment/appointment.model';
import { AppointmentService } from '../../../core/services/api/appointment.service';
import { AppointmentStatus, AppointmentType } from 'src/app/core/constants/appointment.constants';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import {EnumToArrayPipe} from '../../../shared/pipes/enum-to-array.pipe';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFooterCell, MatFooterCellDef, MatFooterRow, MatFooterRowDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable
} from '@angular/material/table';
import {CommonModule, DatePipe, NgClass} from '@angular/common';
import {MatSort} from '@angular/material/sort';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatLabel} from '@angular/material/form-field';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment-list.component.html',
    styleUrls: ['./appointment-list.component.scss'],
    standalone: true,
    imports: [
        EnumToArrayPipe,
        MatTable,
        MatSort,
        DatePipe,
        MatFormField,
        ReactiveFormsModule,
        MatInput,
        MatSelect,
        MatOption,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        RouterLink,
        MatHeaderCellDef,
        MatCellDef,
        MatMenuTrigger,
        NgClass,
        CommonModule,
        MatMenu,
        MatMenuItem,
        MatFooterCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRowDef,
        MatRow,
        MatProgressBar,
        MatFooterCellDef,
        MatFooterRow,
        MatFooterRowDef,
        MatPaginator,
        MatProgressSpinner,
        RouterOutlet,
        MatLabel
    ]
})
export class AppointmentComponent extends ListingPopupBaseComponent implements OnInit {

    displayedColumns: string[] = ['index', 'fullname', 'email', 'fullPhoneNumber', 'advisorName', 'requestedStep', 'requestedTime', 'status'];
    AppointmentStatus = AppointmentStatus;
    listingDataSource: AppointmentListModel[] = [];
    selectedAppointmentStatus: string = 'All';
    AppointmentType = AppointmentType;
    filterFormGroup: any;

    constructor(
        protected apiService: AppointmentService,
        protected formBuilder: UntypedFormBuilder,
        private popupService: PopupService,
        private blockUiService: BlockUiService,
    ) {
        super(apiService, formBuilder);
    }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    protected generateListingFilterParam(): AppointmentListFilterModel {
        let parentFilter: ListingFilterModel = super.generateListingFilterParam();
        let newFilter: AppointmentListFilterModel = new AppointmentListFilterModel();

        Object.assign(newFilter, parentFilter);

        if (newFilter.keywords.length > 0) {
            newFilter.keywordsField = 'FullName';
        }

        newFilter.appointmentStatus = `${this.filterFormGroup.get('appointmentStatus').value}`;

        return newFilter;
    }

    protected setupFilterFormGroup(): void {
        this.filterFormGroup = this.formBuilder.group({
            appointmentStatus: 0,
        });

        this.filterFormGroup.valueChanges.subscribe(
            () => {
                this.getListing();
            },
        );
    }

    appointmentUpdateStatus(id: number, action: number): void {
        this.popupService.confirm('Do you really want to change this appointment to ' + AppointmentStatus[action] + ' ?')
            .then(() => {
                this.blockUiService.open();
                this.apiService.updateAppoitnmentStatus(id, action)
                    .pipe(finalize(() => this.blockUiService.close()))
                    .subscribe(
                        () => this.popupService.alert('Appointment successfully ' + AppointmentStatus[action])
                            .then(() => {
                                this.getListing();
                            }),
                        error => {
                            if (error.error.messages[0].message) {
                                this.popupService.alert(error.error.messages[0].message);
                            }
                            else {
                                this.popupService.alert("Server Error");
                            }
                        }
                    )
            },
                () => { }
            );
    }

    getListing() {
        return [];
        // return this.apiService.getAppointmentList(this.generateListingFilterParam())
        //     .subscribe((listing: AppointmentListModel[]) => {
        //         this.listingDataSource = listing;
        //     });
    }
}
