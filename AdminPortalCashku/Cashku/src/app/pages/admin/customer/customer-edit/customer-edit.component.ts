import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { CustomerPlanOptions, GenderOptions, RaceOptions } from 'src/app/core/constants/basic-info.constants';
import { CountryCode } from 'src/app/core/constants/user.constants';
import { CustomerDetailModel, DetailInfo, TinDetail } from 'src/app/core/models/customer/customer.model';
import { Countries } from 'src/app/core/models/profile/profile.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { PhoneNumberValidator } from 'src/app/core/validators/phone-number.validator';
import { ListingPopupEditComponent } from 'src/app/pages/admin/listing-popup/base-edit/base-edit.component';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html',
    styleUrls: ['./customer-edit.component.scss'],
    standalone: false
})
export class CustomerEditComponent extends ListingPopupEditComponent implements OnInit {

    CustomerPlanOptions = CustomerPlanOptions;
    countries: Countries[] = [];
    detail: CustomerDetailModel;
    editForm: UntypedFormGroup;
    employmentStatusList: DetailInfo[] = [];
    GenderOptions = GenderOptions;
    hobbyList: string[] = [];
    incomeList: DetailInfo[] = [];
    nationalities: DetailInfo[] = [];
    businessNatureList: DetailInfo[] = [];
    RaceOptions = RaceOptions;
    searchControl = new UntypedFormControl();
    searchSubscription: Subscription;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    showFormError: boolean = false;

    protected id: string | number;

    constructor(
        protected apiService: CustomerService,
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
        this.apiService.getInfoDropdownList().subscribe(
            result => {
                this.businessNatureList = result['businessNatureList'];
                this.employmentStatusList = result['employmentStatusList'];
                this.incomeList = result['incomeList'];
                this.nationalities = result['nationalities'];
                this.countries = result['countries'];
                super.ngOnInit();
            }
        );
    }

    onSubmit(): void {

        if (this.editForm.invalid) {
            this.showFormError = true;
            return
        }

        this.showFormError = false;

        this.blockUIService.open();

        this.apiService.createCustomer(this.editForm.value, this.id).subscribe(
            data => {
                this.popupService.alert('Customer detail successfully updated.').then((): void => {
                    this.isChangesSaved = true;
                    this.isRefresh = true;
                    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
                });
            }
        ).add((): void => {
            this.blockUIService.close();
        });
    }

    protected setupEditForm(): void {
        this.editForm = this.formBuilder.group({
            birthday: ['', Validators.required],
            businessNatureId: [null, Validators.required],
            countryCode: ['', Validators.required],
            email: ['', Validators.required],
            employmentStatusId: [null, Validators.required],
            fullname: ['', Validators.required],
            gender: ['', Validators.required],
            hobbies: [''],
            identityNo: [''],
            incomeId: ['', Validators.required],
            jurisdictionCode: [1, Validators.required],
            nationalityId: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            race: ['', Validators.required],
            tinDetail: this.formBuilder.array([])
        })
    }

    protected fillDataToEditForm(): void {
        this.editForm.patchValue(this.detail);
        let dateValueConvert = moment(this.detail.birthday).format('YYYY-MM-DD');
        this.editForm.get('birthday').patchValue(dateValueConvert);
        this.hobbyList = this.editForm.get('hobbies').value;
        if (this.detail.tinDetail) {
            this.detail.tinDetail.forEach(tin => {
                this.onAddTinDetail(tin)
                this.editForm.get('jurisdictionCode').patchValue(0);
            });
        }
        this.initCountryCodeSubscription(this.detail.countryCode);
    }

    private initCountryCodeSubscription(code: CountryCode) {
        this.editForm.controls.phoneNumber.setValidators(
            [Validators.required, PhoneNumberValidator(code)]
        );
        this.editForm.controls.countryCode.valueChanges
            .subscribe((value) => {
                this.editForm.controls.phoneNumber.setValidators(
                    [Validators.required, PhoneNumberValidator(value)]
                );
                this.editForm.controls.phoneNumber.patchValue(this.editForm.controls.phoneNumber.value);
            })
    }

    addHobby(event: MatChipInputEvent): void {
        if (!event.input) {
            return;
        }
        const value = (event.value || '').trim();
        if (value) {
            this.hobbyList.push(value);
            this.editForm.get('hobbies').setValue(this.hobbyList);
        }
        event.input.value = '';
    }

    removeHobby(selectedHobby: string): void {
        this.hobbyList = this.hobbyList.filter((hobby) => hobby !== selectedHobby)
        this.editForm.get('hobbies').setValue(this.hobbyList)
    }

    get isBusinessNatureEnabled(): boolean {
        const businessNatureIdControl = this.editForm.get('businessNatureId');
        const selectedEmploymentStatus = this.editForm.get('employmentStatusId').value;
        switch(selectedEmploymentStatus) {
            case this.employmentStatusList[0].id:
            case this.employmentStatusList[1].id:
                businessNatureIdControl.enable();
                return true;
            default:
                businessNatureIdControl.patchValue(null);
                businessNatureIdControl.disable();
                return false;
        }
    }

    onAddTinDetail(tinDetail?: TinDetail): void {
        const newTinDetail = this.formBuilder.group({
            tin: ['', Validators.required],
            countryId: ['', Validators.required]
        });
        if (tinDetail) {
            newTinDetail.get('countryId').patchValue(tinDetail.countryId);
            newTinDetail.get('tin').patchValue(tinDetail.tin);
        }
        (<UntypedFormArray>this.editForm.get('tinDetail')).push(newTinDetail);
    }

    onRemoveTinDetail(index: number): void {
        (<UntypedFormArray>this.editForm.get('tinDetail')).removeAt(index);
        if (this.tinDetailControls.length === 0) {
            this.onAddTinDetail();
        }
    }

    get tinDetailControls(): AbstractControl[] {
        return (<UntypedFormArray>this.editForm.get('tinDetail')).controls;
    }
}
