import { AccountService } from 'src/app/core/services/account.service';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { Component, OnInit } from '@angular/core';
import { DeviceThreeModel } from 'src/app/core/models/device.model';
import { EmailValidator } from 'src/app/core/validators/email-validator';
import { ForgotPasswordPopup } from 'src/app/pages/auth/login/forgot-password-popup/forgot-password-popup.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupService } from '../../../shared/services/popup/popup.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {
    hide = true;
    form!: UntypedFormGroup;
    showFormError!: boolean;
    isSubmitting = false;
    showError: boolean = false;

    private deviceInfo: DeviceThreeModel;

    constructor(
        private accountService: AccountService,
        private blockUIService: BlockUiService,
        private fb: UntypedFormBuilder,
        private loaderService: LoaderService,
        private modalService: NgbModal,
        private popUp: PopupService,
        private router: Router,
        private storageService: StorageService,
    ) {
        this.form = this.fb.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required],
        })
    }

    ngOnInit(): void {
        this.buildForm();
        this.deviceInfo = new DeviceThreeModel(this.storageService.deviceId);
    }

    submitForm() {
        if (this.form.invalid) {
            this.showError = true;
            return;
        }

        this.showError = false;

        this.loaderService.open();

        this.accountService.login(this.form.value.email, this.form.value.password, this.deviceInfo).subscribe(
            response => {
                this.loaderService.close();
                if (this.storageService.pathHistory) {
                    this.router.navigate([this.storageService.pathHistory]);
                    this.storageService.pathHistory = null;
                    return;
                }

                if (this.storageService.roles === 'superadmin') {
                    this.router.navigate(['/dashboard']);
                } else if (this.storageService.roles === 'admin') {
                    this.router.navigate(['/advisor-customer'])
                } else if (this.storageService.roles === 'verifier') {
                    this.router.navigate(['/verifier-report'])
                }
            },
            error => {
                this.loaderService.close();
                this.showError = true;
            }
        ).add(() => {
                this.isSubmitting = false;
            });

        this.validateForm();
    }

    validateForm(): boolean {
        if (!this.form.value.email) {
            this.showFormError = true;
            this.popUp.alert("Email cannot be empty");
            return false;
        }

        if (!this.form.value.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/gim)) {
            this.showFormError = true;
            this.popUp.alert("Incorrect email format");
            return false;
        }

        return true;
    }

    forgotPassword() {
        this.modalService.open(ForgotPasswordPopup, this.defaultOptions);
    }

    defaultOptions: any = {
        size: 'md',
        backdrop: 'static',
        centered: true,
        keyboard: false,
        windowClass: 'modal-popup',
        backdropClass: 'backdrop-popup',
    }

    buildForm(): void {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email, EmailValidator()]],
            password: ['', Validators.required],
        });
    }
}
