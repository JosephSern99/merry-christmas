import { AccountService } from 'src/app/core/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DeviceModel } from 'src/app/core/models/device-model';
import { EmailValidator } from 'src/app/core/validators/email-validator';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { UPPER_LOWER_SPECIAL_ALPHANUM_MIN_6 } from 'src/app/core/constants/user.constants';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    standalone: false
})

export class ResetPasswordComponent implements OnInit {
    hide = true;
    resetPasswordForm: UntypedFormGroup;
    showFormError: boolean = false;
    isSubmitting = false;
    deviceInfo: any;
    showError = false;
    emailSnapshot = this.route.snapshot.params.email;
    token = this.route.snapshot.params.token;
    isPasswordReset: boolean = false;

    constructor(
        private fb: UntypedFormBuilder,
        private loaderService: LoaderService,
        private popUp: PopupService,
        private storageService: StorageService,
        private accountService: AccountService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.buildForm();
        this.deviceInfo = new DeviceModel(this.storageService.deviceId);
    }

    submitForm() {
        if (!this.isMatchingPasswords()) {
            this.showFormError = true;
            this.resetPasswordForm.controls.confirmNewPassword.setErrors({ notMatching: true });
            this.popUp.alert('Passwords must match.');
            return;
        }

        if (this.resetPasswordForm.controls.password.errors?.pattern) {
            this.showFormError = true;
            this.popUp.alert('Password must have 6 alphanumeric characters with at least 1 uppercase and 1 special character.');
            return;
        }

        if (this.resetPasswordForm.invalid) {
            this.showFormError = true;
            return;
        }

        this.showFormError = false;
        this.loaderService.open();

        this.storageService.accessToken = this.token;

        this.accountService
            .resetPassword(
                this.resetPasswordForm.value.email,
                this.resetPasswordForm.value.password,
                this.resetPasswordForm.value.confirmNewPassword
            )
            .subscribe(
                response => {
                    this.popUp.alert("Your password has been successfully changed.")
                    .then(
                        () => {
                            this.isPasswordReset = true;
                            // Due to password reset API is same for both Admin & Normal User, that why cannot redirect to admin login page until
                            // the API is separated to 2 different APIs or API return role data.
                            // this.router.navigate(['/login'])
                        }
                    );
                }
            ).add(() => {
                this.isSubmitting = false;
                this.loaderService.close();
            });
    }

    buildForm(): void {
        this.resetPasswordForm = this.fb.group({
            'email': [this.emailSnapshot, [Validators.required, Validators.email, EmailValidator()]],
            'password': ['', [Validators.required, Validators.pattern(UPPER_LOWER_SPECIAL_ALPHANUM_MIN_6)]],
            'confirmNewPassword': ['', Validators.required]
        });
    }

    private isMatchingPasswords() {
        return this.resetPasswordForm.value.password === this.resetPasswordForm.value.confirmNewPassword;
    }
}
