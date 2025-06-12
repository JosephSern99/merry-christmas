import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { PopupService } from '../popup.service';
import { Observable } from 'rxjs';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {LoadingComponent} from '../../../components/loading/loading.component';

@Component({
    selector: 'app-suspend-customer-modal',
    templateUrl: './suspend-customer-modal.component.html',
    styleUrls: ['./suspend-customer-modal.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        LoadingComponent
    ]
})
export class SuspendCustomerModalComponent implements OnInit {
    id = ''; //? customer id (set in popupService)
    isSubmitting = false;
    isSuspending = true; //? flag to suspend/unsuspend customer (set in popupService)
    form = this.fb.group({
        reason: ['', Validators.required],
    });
    showFormError = false;

    constructor(
        public activeModal: NgbActiveModal,
        private apiService: CustomerService,
        private fb: UntypedFormBuilder,
        private popupService: PopupService,
    ) {}

    ngOnInit(): void {
        if (!this.isSuspending) {
            this.form.disable();
        }
    }

    onClose(): void {
        this.activeModal.dismiss();
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.showFormError = true;
            return;
        }

        this.isSubmitting = true;

        this.getSubmit$()
            .pipe(finalize(() => (this.isSubmitting = false)))
            .subscribe({
                next: () => {
                    this.popupService.alert(`Customer has been ${this.isSuspending ? 'suspended' : 'unsuspended'}`)
                    this.activeModal.close();
                },
                error: (err) => {
                    if (err.error.messages[0].message) {
                        this.popupService.alert(err.error.messages[0].message);
                    } else {
                        this.popupService.alert('Server Error');
                    }
                }
            });
    }

    private getSubmit$(): Observable<boolean> {
        if (this.isSuspending) {
            return this.apiService.postSuspendCustomer({
                userId: this.id,
                reason: this.form.value.reason,
            });
        }

        return this.apiService.postUnsuspendCustomer(this.id);
    }
}
