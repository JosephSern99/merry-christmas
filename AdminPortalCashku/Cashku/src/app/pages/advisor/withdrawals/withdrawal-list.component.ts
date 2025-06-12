import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { PopupOptions } from 'src/app/shared/services/popup/popup-options';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { TransactionStatus, WithdrawAction } from 'src/app/core/constants/withdrawal.constant';
import { WithdrawalListModel, WithdrawListingFilterModel } from 'src/app/core/models/withdrawal/withdrawal.model';
import { WithdrawalService } from 'src/app/core/services/api/withdrawal.service';
import { GoalTypeEnum } from 'src/app/core/constants/goal.constant';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {EnumToArrayPipe} from '../../../shared/pipes/enum-to-array.pipe';

@Component({
    selector: 'app-withdrawal',
    templateUrl: './withdrawal-list.component.html',
    styleUrls: ['./withdrawal-list.component.scss'],
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
        EnumToArrayPipe
        // Add your custom pipes and components here
    ]
})
export class WithdrawalListComponent extends ListingPopupBaseComponent {

    displayedColumns: string[] = ['index', 'createdAt', 'goalType', 'redemptionType', 'amount', 'fullname', 'transactionStatus', 'action'];
    GoalType = GoalTypeEnum;
    listingDataSource: WithdrawalListModel[] = [];
    TransactionStatus = TransactionStatus;
    WithdrawAction = WithdrawAction;

    constructor(
        protected apiService: WithdrawalService,
        protected formBuilder: UntypedFormBuilder,
        private popupService: PopupService,
        private blockUiService: BlockUiService,
    ) {
        super(apiService, formBuilder);
    }

    protected generateListingFilterParam(): WithdrawListingFilterModel {
        let parentFilter: ListingFilterModel = super.generateListingFilterParam();
        let newFilter: WithdrawListingFilterModel = new WithdrawListingFilterModel();

        Object.assign(newFilter, parentFilter);

        newFilter.transactionStatus = `${this.filterFormGroup.get('transactionStatus').value}`;

        return newFilter;
    }

    protected setupFilterFormGroup(): void {
        this.filterFormGroup = this.formBuilder.group({
            transactionStatus: 0,
        });

        this.filterFormGroup.valueChanges.subscribe(
            () => {
                this.getListing();
            },
        );
    }

    updateStatus(id: number, action: WithdrawAction): void {
        let msg = action === WithdrawAction.Approve ? 'approved' : 'rejected';

        this.popupService.approve(WithdrawAction[action].toLowerCase())
            .then(() => {
                this.blockUiService.open();
                this.apiService.updateWithdrawStatus(id, action)
                    .pipe(finalize(() => this.blockUiService.close()))
                    .subscribe(
                        () => this.popupService.alert('Withdrawal successfully ' + msg)
                            .then(() => {
                                this.getListing();
                            }),
                    )
            },
                () => { }
            );
    }
}
