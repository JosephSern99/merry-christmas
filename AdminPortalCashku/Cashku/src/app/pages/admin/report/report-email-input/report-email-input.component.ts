import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from 'src/app/core/validators/email-validator';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-report-email-input',
    templateUrl: './report-email-input.component.html',
    styleUrls: ['./report-email-input.component.scss'],
    standalone: false
})
export class ReportEmailInputComponent implements OnInit {

    emailForm: UntypedFormGroup;
    showFormError = false;

    constructor(
        private fb: UntypedFormBuilder,
        private route: ActivatedRoute,
        private activeModal: NgbActiveModal,
    ) { }

    ngOnInit(): void {
        this.emailForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, EmailValidator()]],
        });
    }

    submit(){
        if (this.emailForm.invalid) {
            this.showFormError = true;
            return;
        }

        this.activeModal.close(this.emailForm.value);
    }

    cancel(): void {
        this.activeModal.dismiss();
    }
}
