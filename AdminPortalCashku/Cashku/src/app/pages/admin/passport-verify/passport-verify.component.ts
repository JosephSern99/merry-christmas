import { Component } from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
import {MatSort, Sort} from '@angular/material/sort';
import { PassportVerificationStatus, ApprovalAction, PASSPORT_VERIFICATION_STATUS } from 'src/app/core/constants/passport.constant';
import { PassportVerificationFilterModel } from 'src/app/core/models/passport-verification/passport-verification.model';
import { PassportVerificationService } from 'src/app/core/services/api/passport-verification.service';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import {EnumToArrayPipe} from '../../../shared/pipes/enum-to-array.pipe';
import {
    MatCell,
    MatCellDef,
    MatColumnDef, MatFooterCell, MatFooterCellDef, MatFooterRow, MatFooterRowDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef,
    MatTable
} from '@angular/material/table';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatFormField} from '@angular/material/input';
import {CommonModule, DatePipe, NgClass} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';
import {RouterOutlet} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatLabel} from '@angular/material/form-field';

@Component({
    selector: 'app-passport-verify',
    templateUrl: './passport-verify.component.html',
    styleUrls: ['./passport-verify.component.scss'],
    standalone: true,
    imports: [
        EnumToArrayPipe,
        MatTable,
        MatSort,
        MatSelect,
        MatFormField,
        ReactiveFormsModule,
        MatOption,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderCellDef,
        MatCellDef,
        DatePipe,
        NgClass,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatFooterCell,
        MatFooterCellDef,
        MatProgressBar,
        MatFooterRow,
        MatFooterRowDef,
        MatPaginator,
        RouterOutlet,
        MatProgressSpinner,
        MatLabel,
        CommonModule

        // Add your custom pipes and components here
    ]
})
export class PassportVerifyComponent extends ListingPopupBaseComponent {

    displayedColumns: string[] = ['index', 'fullname', 'email', 'submittedDocumentName', 'submissionDate', 'passportVerificationStatus', 'action'];
    PassportVerificationStatus = PassportVerificationStatus;
    PASSPORT_VERIFICATION_STATUS = PASSPORT_VERIFICATION_STATUS;
    ApprovalAction = ApprovalAction;

    protected sorting: Sort = { active: 'submissionDate', direction: 'desc' };

    constructor(
        protected apiService: PassportVerificationService,
        protected formBuilder: UntypedFormBuilder,
        private popupService: PopupService,
        private blockUiService: BlockUiService,
    ) {
        super(apiService, formBuilder);
    }

    protected generateListingFilterParam(): PassportVerificationFilterModel {
        let parentFilter: ListingFilterModel = super.generateListingFilterParam();
        let newFilter: PassportVerificationFilterModel = new PassportVerificationFilterModel();

        Object.assign(newFilter, parentFilter);

        newFilter.passportVerificationStatus = `${this.filterFormGroup.get('verificationStatus').value}`;

        return newFilter;
    }

    protected setupFilterFormGroup(): void {
        this.filterFormGroup = this.formBuilder.group({
            verificationStatus: PassportVerificationStatus.None,
        });

        this.filterFormGroup.valueChanges.subscribe(
            () => {
                this.getListing();
            },
        );
    }


    detailPopup(utilityBillImageUrl, submittedDate): void {
        this.popupService.showPassportImage(utilityBillImageUrl, submittedDate)
    }

    onApprovalClick(id: string, isApprove): void {
        this.apiService.updateVerificationStatus(id, isApprove).subscribe(
            success => {
                this.getListing();
            }
        )
    }

}
