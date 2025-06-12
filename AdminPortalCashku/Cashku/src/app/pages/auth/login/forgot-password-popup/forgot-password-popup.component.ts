import { AccountService } from 'src/app/core/services/account.service';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'forgot-password-popup',
    templateUrl: './forgot-password-popup.component.html',
    styleUrls: ['./forgot-password-popup.component.scss'],
    standalone: false
})
export class ForgotPasswordPopup implements OnInit {
    resetForm: UntypedFormGroup;
    showFormError: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        public modalService: NgbModal,
        private fb: UntypedFormBuilder,
        private blockUIService: BlockUiService,
        private popUp: PopupService,
        private accountService: AccountService,
        private loaderService: LoaderService,

    ) { }

    defaultOptions: any = {
        size: 'sm',
        backdrop: 'static',
        centered: true,
        keyboard: false,
        windowClass: 'modal-popup',
        backdropClass: 'backdrop-popup',
    }

    ngOnInit(): void {
        this.buildForm();
    }

    ok(): void {
        this.activeModal.close();
    }

    cancel(): void {
        this.activeModal.dismiss();
    }

    submitForgotPassword(): void {

        if (!this.forgotPasswordForm()) {
            return;
        }

        this.loaderService.open();
        this.blockUIService.open();
        this.accountService.forgotPassword(this.resetForm.value.email).subscribe(
            response => {
                this.popUp.alert("Successfully sent the link reset to your email");
                this.activeModal.close();
            }).add(() => {
                this.loaderService.close();
            this.blockUIService.close();
        });

    }

    forgotPasswordForm(): boolean {
        if (!this.resetForm.value.email) {
            this.showFormError = true;
            this.popUp.alert("Please enter the email you register");
            return false;
        }

        return true;
    }

    close() {
        return true;
    }

    buildForm(): void {
        this.resetForm = this.fb.group({
            'email': ['', Validators.required]
        });
    }
}
