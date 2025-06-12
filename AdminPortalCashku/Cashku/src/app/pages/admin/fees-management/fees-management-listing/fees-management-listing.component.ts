import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { FeesManagementListModel, FundsListModel } from 'src/app/core/models/fees-management/fees-management.model';
import { FeesManagementService } from 'src/app/core/services/api/fees-management.service';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-fees-management-listing',
    templateUrl: './fees-management-listing.component.html',
    styleUrls: ['./fees-management-listing.component.scss'],
    standalone: false
})
export class FeesManagementListingComponent extends ListingPopupBaseComponent {

    displayedColumns: string[] = ['index', 'fundName', 'wrapFee', 'modifiedAt', 'threeDotMenu'];
    editForm: UntypedFormGroup;
    fundOptions: FundsListModel[] = [];
    listingDataSource: FeesManagementListModel[] = [];
    salesChargeValue: number;
    scheme: string;
    showFormError = false;

    constructor(
        protected apiService: FeesManagementService,
        protected formBuilder: UntypedFormBuilder,
        protected popupService: PopupService,
    ) {
        super(apiService, formBuilder);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.setupEditForm();
        this.generateFundOptions();
    }

    onSubmit(): void {
        if (this.editForm.invalid) {
            this.showFormError = true;
            return
        }

        this.showFormError = false;

        let data = this.editForm.value;
        data.scheme = this.scheme;

        this.apiService.updateFundWrapFee(data)
        .subscribe(() => {
                this.popupService.alert("Successfully Submitted");
                this.getListing();
            }
        );
    }

    private setupEditForm(): void {
        this.editForm = this.formBuilder.group({
            fundOption: ['', Validators.required ],
            wrapFee: [ '', Validators.required ],
        });
    }

    updateSelection(selection: MatSelectChange): void {
        this.scheme = selection.value;
    }

    generateFundOptions(): void {
        this.apiService.getFunds().subscribe(
            (success: any) => {
                this.fundOptions = success;
            }
        )
    }

    removeFee(scheme: string): void {
        this.apiService.deleteFee(scheme).subscribe(
            () => {
                this.getListing();
            }
        )
    }

}
