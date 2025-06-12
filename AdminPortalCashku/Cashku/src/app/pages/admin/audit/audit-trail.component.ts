import { ActionType, ModuleType } from 'src/app/core/constants/audit.constants';
import { AuditListFilterModel, AuditListModel } from 'src/app/core/models/audit/audit.model';
import { AuditService } from 'src/app/core/services/api/audit.service';
import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { takeUntil } from 'rxjs/operators';
import moment from 'moment';
import { EnumToArrayPipe } from 'src/app/shared/pipes/enum-to-array.pipe';
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
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatIcon} from '@angular/material/icon';
import {MatLabel} from '@angular/material/form-field';
@Component({
    selector: 'app-audit-trail',
    templateUrl: './audit-trail.component.html',
    styleUrls: ['./audit-trail.component.scss'],
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
        CommonModule,
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
        MatDatepickerToggle,
        MatDatepicker,
        MatDatepickerInput,
        MatIcon,
        MatLabel
    ]
})
export class AuditTrailComponent extends ListingPopupBaseComponent implements OnInit {

    ActionType = ActionType;
    auditEndDate: string;
    auditStartDate: string;
    displayedColumns: string[] = ['index', 'fullname', 'email', 'module', 'action', 'ipAddress', 'timeStamp'];
    listingDataSource: AuditListModel[] = [];
    readonly currentDate = moment().format('YYYY-MM-DD');
    maxDate: string = this.currentDate;
    maxPlaceholder = moment().format('DD/MM/YYYY');
    minDate: string = '';
    minPlaceholder = moment().subtract('2', 'weeks').format('DD/MM/YYYY');
    ModuleType = ModuleType;

    constructor(
        protected apiService: AuditService,
        protected formBuilder: UntypedFormBuilder
    ) {
        super(apiService, formBuilder);
    }

    protected generateListingFilterParam(): AuditListFilterModel {
        let parentFilter: ListingFilterModel = super.generateListingFilterParam();
        let newFilter: AuditListFilterModel = new AuditListFilterModel();

        Object.assign(newFilter, parentFilter);

        if (newFilter.keywords.length > 0) {
            newFilter.keywordsField = 'FullName';
        }

        newFilter.ModuleType = this.filterFormGroup.get('EventType').value;

        let createdAtFrom = this.filterFormGroup.get('CreatedAtFrom').value;
        let createdAtTo = this.filterFormGroup.get('CreatedAtTo').value;
        if (createdAtFrom) {
            newFilter.CreatedAtFrom = moment(createdAtFrom).startOf('day').format('M/D/YYYY HH:mm:ss');
        }
        if (createdAtTo) {
            newFilter.CreatedAtTo = moment(createdAtTo).endOf('day').format('M/D/YYYY HH:mm:ss');
        }

        return newFilter;
    }

    protected setupFilterFormGroup(): void {
        this.filterFormGroup = this.formBuilder.group({
            EventType: 0,
            CreatedAtFrom: '',
            CreatedAtTo: '',
        });

        this.filterFormGroup.valueChanges.subscribe((): void => {
            this.getListing();
        });

        this.filterFormGroup.get('CreatedAtFrom').valueChanges.subscribe((selectedDate: Date): void => {
            this.minDate = moment(selectedDate).format('YYYY-MM-DD');
        })

        this.filterFormGroup.get('CreatedAtTo').valueChanges.subscribe((selectedDate: Date): void => {
            if (selectedDate) {
                this.maxDate = moment(selectedDate).format('YYYY-MM-DD');
            }
        })
    }

    getListing(): void {
        this.isListingLoading = true;
        let filter: AuditListFilterModel = this.generateListingFilterParam();

        this.apiService
            .getAuditList(filter)
            .pipe(takeUntil(this.componentInstance$))
            .subscribe(
                (success: any) => {
                    this.handleSuccessListingResponse(success);
                },
                (error) => {
                    console.log(error);
                }
            )
            .add(() => {
                this.isListingLoading = false;
            });
    }

    onExport() {
        // export audits
    }
}
