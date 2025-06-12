import { ActivatedRoute, Router } from '@angular/router';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { ListingPopupEditComponent } from 'src/app/pages/admin/listing-popup/base-edit/base-edit.component';
import { Location } from '@angular/common';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { PortfolioFund, PortfolioFundCreate, PortfolioFundDetail } from 'src/app/core/models/portfolio-management/portfolio-management.models';
import { PortfolioManagementService } from 'src/app/core/services/api/portfolio-management.service';
import { PortfolioType } from 'src/app/core/constants/portfolio-management.constants';

@Component({
    selector: 'app-portfolio-management-detail',
    templateUrl: './portfolio-management-detail.component.html',
    styleUrls: ['./portfolio-management-detail.component.scss'],
    standalone: false
})
export class PortfolioManagementDetailComponent extends ListingPopupEditComponent implements OnInit {

    deletedFund = [];
    detail: PortfolioFundDetail;
    fundList: any;
    fundName: string;
    isEndOfFunds: boolean = false;
    isLoadingFunds: boolean = false;
    label: string;
    selectedFunds = [];
    showFormError: boolean = false;

    constructor(
        protected apiService: PortfolioManagementService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected formBuilder: UntypedFormBuilder,
        protected popupService: PopupService,
        protected location: Location,
        private blockUIService: BlockUiService,
    ) {
        super(apiService, activatedRoute, router, formBuilder, popupService, location);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.getFundList();
    }

    protected fillDataToEditForm(): void {
        super.fillDataToEditForm();

        this.editForm.patchValue(this.detail);

        this.detail.funds.forEach(
            (fund) => {
                this.fundsFormControl.push(this.initfundsForm(fund));
            }
        )

        this.label = PortfolioType[this.detail.portfolioType].label;
    }

    validateKeyDown(event: KeyboardEvent) {
        const invalidChars = ['+', '-', 'e'];
        if (invalidChars.includes(event.key)) {
            event.preventDefault();
        }
    }

    validatePaste(event: ClipboardEvent) {
        const pastedText = event.clipboardData.getData('Text');
        if (isNaN(+pastedText)) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    protected setupEditForm(): void {
        this.editForm = this.formBuilder.group({
            lowestReturnPercentage: [Validators.required],
            averageReturnPercentage: [Validators.required],
            highestReturnPercentage: [Validators.required],
            funds: this.formBuilder.array([]),
        });
    }

    initfundsForm(item: PortfolioFund) {
        return this.formBuilder.group({
            allocatePercentage: [item.allocatePercentage ?? 0, [Validators.required, Validators.min(0)]],
            fundAttributes: [item.fundAttributes ?? '', [Validators.required, Validators.maxLength(255)]],
            fundId: item.fundId ?? 0,
            fundName: item.fundName,
            fundOption: [item.fundOption, Validators.required],
            id: item.id ?? 0,
            scheme: [item.scheme, Validators.required],
        });
    }

    get fundsFormControl() {
        return <UntypedFormArray>this.editForm.controls.funds;
    }

    addFunds(item: PortfolioFund) {
        let selectedFunds = this.editForm.controls.funds.value.map(val => val.fundName === item.fundName).find(value => value === true);

        if (selectedFunds != true) {
            this.fundsFormControl.push(this.initfundsForm(item));
        }
    }

    removeFund(i: number, fund: any) {
        this.fundsFormControl.removeAt(i);

        this.deletedFund.push({
            id: fund.value.id,
            fundId: fund.value.fundId
        });
    }

    getFundList(): void {
        this.apiService.getFundsList()
            .subscribe((data: any) => {
                this.fundList = data;
            });
    }

    onSubmit(): void {
        if (this.editForm.controls['funds'].value.length === 0) {
            this.popupService.alert('Selecting funds is required');
            return;
        }

        if (this.editForm.invalid) {
            this.showFormError = true;
            return;
        }

        if (this.isFundsPercentageValid() === false) {
            this.showFormError = true;
            return;
        }

        if (this.isReturnsValid() === false) {
            this.showFormError = true;
            return;
        }

        this.showFormError = false;
        let data: PortfolioFundCreate = this.editForm.value;

        data.deleteFunds = this.deletedFund || null;

        this.blockUIService.open();

        this.apiService.updatePortfolioDetail(this.id, data)
            .subscribe(data => {
                this.popupService.alert('Portfolio successfully updated');
                this.isChangesSaved = true;
                this.isRefresh = true
                this.router.navigate(['..'], { relativeTo: this.activatedRoute });
            }, error => {
                if (error.error && error.error.messages[0].message) {
                    this.popupService.alert(error.error.messages[0].message);
                }
                else {
                    this.popupService.alert("Server Error");
                }
            }).add((): void => {
                this.blockUIService.close();
            });
    }

    private isReturnsValid(): boolean {
        let lowestReturn = this.editForm.controls['lowestReturnPercentage'].value;
        let mediumReturn = this.editForm.controls['averageReturnPercentage'].value;
        let highestReturn = this.editForm.controls['highestReturnPercentage'].value;

        if (lowestReturn > mediumReturn || lowestReturn > highestReturn) {
            this.popupService.alert('Lowest return percentage value cannot be above average or highest return value');
            return false;
        }

        if (mediumReturn > highestReturn) {
            this.popupService.alert('Average return percentage value cannot be above highest return value');
            return false;
        }

        return true;
    }

    private isFundsPercentageValid(): boolean {
        let total: number = 0;

        try {
            this.editForm.controls.funds.value.forEach(
                (fund) => {
                    const enteredFund = parseFloat(fund.allocatePercentage);
                    if (enteredFund === 0) {
                        throw new Error(fund.fundName);
                    }
                    total += enteredFund;
                }
            );

            if (total !== 100) {
                this.popupService.alert('The percentage total need to be 100%');
                return false;
            }
        } catch (err) {
            this.popupService.alert(`The percentage for ${err.message} cannot be 0%`);
            return false;
        }

        return true;
    }
}
