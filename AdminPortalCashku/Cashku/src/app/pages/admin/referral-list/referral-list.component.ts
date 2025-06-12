import { Component } from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { HasSignedUp, ReferralSignUpStatus, ReferralSourceType } from 'src/app/core/constants/customer.constants';
import { ReferralListFilterModel, ReferralListModel } from 'src/app/core/models/referral/referral.model';
import { ReferralService } from 'src/app/core/services/api/referral.service';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import {EnumToArrayPipe} from '../../../shared/pipes/enum-to-array.pipe';
import {
    MatCell, MatCellDef,
    MatColumnDef,
    MatFooterCell, MatFooterCellDef,
    MatFooterRow,
    MatFooterRowDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef,
    MatRow, MatRowDef,
    MatTable
} from '@angular/material/table';
import {MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIconButton} from '@angular/material/button';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatSort} from '@angular/material/sort';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatOption, MatSelect} from '@angular/material/select';
import {CommonModule, NgClass} from '@angular/common';
import {MatLabel} from '@angular/material/form-field';

@Component({
    selector: 'app-referral-list',
    templateUrl: './referral-list.component.html',
    styleUrls: ['./referral-list.component.scss'],
    standalone: true,
    imports: [
        EnumToArrayPipe,
        MatTable,
        MatSort,
        MatSort,
        MatHeaderCell,
        MatCell,
        MatColumnDef,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatFooterCell,
        MatHeaderRow,
        MatRow,
        MatFooterRow,
        MatMenuItem,
        MatSort,
        MatSuffix,
        MatIconButton,
        MatProgressBar,
        MatMenu,
        MatIcon,
        RouterLink,
        MatMenuTrigger,
        MatFooterRowDef,
        MatFooterCellDef,
        MatRowDef,
        MatHeaderRowDef,
        MatHeaderCellDef,
        MatCellDef,
        MatPaginator,
        MatProgressSpinner,
        RouterOutlet,
        MatSelect,
        MatOption,
        NgClass,
        CommonModule,
        MatLabel
        // Add your custom modules and components here
    ]
})
export class ReferralListComponent extends ListingPopupBaseComponent {

    ReferralSignUpStatus = ReferralSignUpStatus;
    displayedColumns: string[] = ['index', 'fullName', 'email', 'phoneNumber', 'associationNumber', 'appType', 'referralStatus'];
    listingDataSource: ReferralListModel[] = [];
    HasSignedUp = HasSignedUp;
    ReferralSourceType = ReferralSourceType

    constructor(
        protected apiService: ReferralService,
        protected baseApi: BaseApiService,
        protected formBuilder: UntypedFormBuilder,
    ) {
        super(apiService, formBuilder);
    }

    protected generateListingFilterParam(): ReferralListFilterModel {
        let parentFilter: ListingFilterModel = super.generateListingFilterParam();
        let newFilter: ReferralListFilterModel = new ReferralListFilterModel();

        Object.assign(newFilter, parentFilter);

        if (newFilter.keywords.length > 0) {
            newFilter.keywordsField = 'FullName';
        }

        newFilter.referralStatus = this.filterFormGroup.get('hasSignedUp').value;

        return newFilter;
    }

    protected setupFilterFormGroup(): void {
        this.filterFormGroup = this.formBuilder.group({
            hasSignedUp: ReferralSignUpStatus.All,
        });

        this.filterFormGroup.valueChanges.subscribe(
            () => {
                this.getListing();
            },
        );
    }

    removeCustomer(i) {
        // Remove customer logic here
        console.log(i);
    }
}
