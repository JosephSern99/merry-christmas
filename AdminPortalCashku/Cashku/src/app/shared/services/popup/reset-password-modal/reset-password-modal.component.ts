import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {LoadingComponent} from '../../../components/loading/loading.component';

@Component({
    selector: 'app-reset-password-modal',
    templateUrl: './reset-password-modal.component.html',
    styleUrls: ['./reset-password-modal.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        LoadingComponent
    ]
})
export class ResetPasswordModalComponent {
    email = '';
    isSubmitting = false;
    isSuccessful = false;

    constructor(
        public activeModal: NgbActiveModal,
        private customerService: CustomerService,
    ) {}

    onClose(): void {
        this.activeModal.dismiss();
    }

    onConfirm(): void {
        if (this.isSubmitting) {
            return;
        }

        this.isSubmitting = true;

        this.customerService
            .resetCustomerPasswords(this.email)
            .pipe(finalize(() => (this.isSubmitting = false)))
            .subscribe(() => this.isSuccessful = true);
    }
}
