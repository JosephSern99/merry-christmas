import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { AccountService } from 'src/app/core/services/account.service';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { Countries, ProfileModel } from 'src/app/core/models/profile/profile.model';
import { CountriesService } from 'src/app/core/services/api/countries.service';
import { CountryCode, RegionCode } from 'src/app/core/constants/user.constants';
import { ListingPopupDetailComponent } from 'src/app/pages/admin/listing-popup/base-detail/base-detail.component';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { PhoneNumberValidator } from 'src/app/core/validators/phone-number.validator';
import {EnumToArrayPipe} from '../../../shared/pipes/enum-to-array.pipe';
import {ListingPopupBreadcrumbModule} from '../listing-popup/helpers/listing-popup-breadcrumb/listing-popup-breadcrumb.module';
import {MatOption} from '@angular/material/core';
import {ListingPopupBreadcrumbComponent} from '../listing-popup/helpers/listing-popup-breadcrumb/listing-popup-breadcrumb.component';
import {MatSelect} from '@angular/material/select';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        EnumToArrayPipe,
        ReactiveFormsModule,
        ListingPopupBreadcrumbModule,
        ListingPopupBreadcrumbComponent,
        MatOption,
        MatSelect,
        // Add your custom pipes and components here
    ]
})
export class AccountSettingsComponent extends ListingPopupDetailComponent implements OnInit {

    countries: Countries[];
    CountryCode = CountryCode;
    detail: ProfileModel;
    editForm: UntypedFormGroup;
    email: string;
    calendlyLink: string;
    isPasswordFormError  = false;
    isUpdatePassword: true;
    passwordForm: UntypedFormGroup;
    showFormError = false;
    showCopyTooltip = false;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected apiService: AccountService,
        protected router: Router,
        private storageService: StorageService,
        private countriesService: CountriesService,
        private fb: UntypedFormBuilder,
        private blockUiService: BlockUiService,
        private popupService: PopupService,
    ) {
        super(apiService, activatedRoute, router);
     }

    ngOnInit(): void {
        this.getCountryList();
        this.getAdminDetails();
        this.createForm();
        this.changePasswordForm();
        this.initCountryCodeSubscription();
    }

    getAdminDetails(): void {
        this.apiService.getProfile()
            .subscribe(data => {
                this.detail = data;
                this.email = this.detail.email;
                this.editForm.patchValue(data);
                this.editForm.controls.phoneNumber.setValidators(
                    [Validators.required, PhoneNumberValidator(this.editForm.controls.countryCode.value)]
                );
            });
    }

    getCountryList(): void {
        this.countriesService.getCountries()
            .subscribe(data => {
                this.countries = data;
            });
    }

    createForm(): void {
        this.editForm = this.fb.group({
            fullName: ['', Validators.required],
            countryCode: [0, Validators.required],
            phoneNumber: ['', Validators.required],
            calendlyLink: [''],
        });
    }

    submitProfile(): void {
        if (this.editForm.invalid) {
            this.showFormError = true;
            return;
        }

        this.blockUiService.open();

        this.apiService.updateProfile(this.editForm.value, this.email, this.calendlyLink)
            .pipe(finalize(() => this.blockUiService.close()))
            .subscribe(id => {
                this.popupService.alert('User profile successfully updated')
                    .then(() => {
                        this.storageService.fullname = this.editForm.value.fullName;
                        this.getAdminDetails();
                    });
            });
    }

    private initCountryCodeSubscription(): void {
        this.editForm.controls.phoneNumber.setValidators(
            [Validators.required, PhoneNumberValidator()]
        );
        this.editForm.controls.countryCode.valueChanges
            .subscribe((value) => {
                this.editForm.controls.phoneNumber.setValidators(
                    [Validators.required, PhoneNumberValidator(value)]
                );
                this.editForm.controls.phoneNumber.patchValue(this.editForm.controls.phoneNumber.value);
            });
    }

    changePasswordForm(): void {
        this.passwordForm = this.fb.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
        });
    }

    submitNewPassword(): void {
        if (this.passwordForm.invalid) {
            this.isPasswordFormError = true;
            return;
        }

        if (this.passwordForm.controls.oldPassword.value.trim() === '' || this.passwordForm.controls.newPassword.value.trim() === '') {
            this.popupService.alert('Entered password did not meet the correct format.');
            this.isPasswordFormError = true;
            this.passwordForm.patchValue({oldPassword: '', newPassword: ''});
            return;
        }

        this.isPasswordFormError = false;

        this.blockUiService.open();

        this.apiService.changePassword(this.passwordForm.value).pipe(
            finalize(
                () => this.blockUiService.close()
            )
        ).subscribe(
            () => {
                this.popupService.alert('User successfully updated').then(
                    () => { this.getAdminDetails(); }
                );
            });
    }

    copyFunction(): void {
        navigator.clipboard.writeText(this.editForm.value.calendlyLink);
        this.showCopyTooltip = true;

        setTimeout(() => {
            this.showCopyTooltip = false;
        }, 1500);
    }
}
