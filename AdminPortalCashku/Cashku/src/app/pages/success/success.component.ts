import { AccountService } from 'src/app/core/services/account.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DeviceThreeModel } from 'src/app/core/models/device.model';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.scss'],
    standalone: false
})

export class SuccessComponent implements OnInit {
    isSubmitting = false;
    display: boolean = true;
    errorMessage: string;
    error: boolean = false;

    private deviceInfo: DeviceThreeModel;
    private email: string = '';
    private token: string = '';

    constructor(
        private loaderService: LoaderService,
        private popupService: PopupService,
        private storageService: StorageService,
        private accountService: AccountService,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        if (this.isRequiredParamsExist() === false) {
            return;
        }

        this.deviceInfo = new DeviceThreeModel(this.storageService.deviceId);
        this.storageService.accessToken = this.token;

        this.submitForm();
    }

    private isRequiredParamsExist(): boolean {
        this.email = this.activatedRoute.snapshot.params.email;
        this.token = this.activatedRoute.snapshot.params.token;

        if (!this.token || !this.email) {
            return false;
        }

        return true;
    }

    private submitForm(): void {
        this.loaderService.open();

        this.accountService.verifyEmailRegister(this.email, this.deviceInfo)
            .subscribe(() => { },
                error => {
                    if (error.error.error && error.error.error.messages && error.error.error.messages.length > 0) {
                        this.error = true;
                        this.errorMessage = error.error.error.messages[0].message;
                    } else {
                        this.popupService.alert("Please contact administrator");
                    }
                }
            ).add(
                () => {
                    this.isSubmitting = false;
                    this.loaderService.close();
                    this.display = true;
                }
            );
    }
}
