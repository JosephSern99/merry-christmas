import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {UntypedFormBuilder, FormControl, UntypedFormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { ReportEmailInputComponent } from 'src/app/pages/admin/report/report-email-input/report-email-input.component';
import { ReportService } from 'src/app/core/services/api/report.service';
import { ReportType } from 'src/app/core/constants/report.constant';
import moment from 'moment';
import {CommonModule} from '@angular/common';
import {VerifierDateTimePickerComponent} from '../../../shared/components/datetimepicker/verifier-datetimepicker';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        VerifierDateTimePickerComponent,
        ReactiveFormsModule,
        MatButton,
    ]
})
export class ReportComponent implements OnInit {

    accountCreationEndDate: string;
    accountCreationStartDate: string;
    curDate = new Date();
    email: string;
    eManDateReconEndDate: string;
    eManDateReconStartDate: string;
    newEndDate: string;
    newStartDate: string;
    reconTransactionEndDate: string;
    reconTransactionStartDate: string;
    reportForm: UntypedFormGroup;
    ReportType = ReportType;

    constructor(
        private fb: UntypedFormBuilder,
        private reportService: ReportService,
        private blockUiService: BlockUiService,
        private popupService: PopupService,
        private modalService: NgbModal,
    ) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.reportForm = this.fb.group({
            reconTransactionDate: '',
            eManDateReconDate: '',
            accountCreationReconDate: '',
        });
    }

    reportDateOnChange(event: any, ReportTypeSelect: ReportType): void {
        switch (ReportTypeSelect) {
            case ReportType.ReconTransaction:
                this.reconTransactionStartDate = moment(event[0]).format("YYYY MMMM DD");
                this.reconTransactionEndDate = moment(event[1]).format("YYYY MMMM DD");
                break;
            case ReportType.EMandateRecon:
                this.eManDateReconStartDate = moment(event[0]).format("YYYY MMMM DD");
                this.eManDateReconEndDate = moment(event[1]).format("YYYY MMMM DD");
                break;
            case ReportType.AccountCreationRecon:
                this.accountCreationStartDate = moment(event[0]).format("YYYY MMMM DD");
                this.accountCreationEndDate = moment(event[1]).format("YYYY MMMM DD");
                break;
            }
    }

    addEmail(reportType: number): void {
        const option: any = {
            size: 'lg',
            center: true,
            windowClass: 'modal-popup-lg',
            backdropClass: 'backdrop-popup',
        };
        const modalRef = this.modalService.open(ReportEmailInputComponent, option);
        modalRef.result.then(
            (data: any) => {
                this.export(reportType, data.email);
            }
        )
    }

    checkingDate(reportType?: ReportType) {
        switch (reportType) {
            case ReportType.ReconTransaction:
                this.clearEManDateReconDate();
                this.newStartDate = this.reconTransactionStartDate;
                this.newEndDate = this.reconTransactionEndDate;
                break;
            case ReportType.EMandateRecon:
                this.clearReconTransactionDate();
                this.newStartDate = this.eManDateReconStartDate;
                this.newEndDate = this.eManDateReconEndDate;
                break;
            case ReportType.AccountCreationRecon:
                this.clearReconTransactionDate();
                this.newStartDate = this.accountCreationStartDate;
                this.newEndDate = this.accountCreationEndDate;
                break;
        }
    }

    export(reportType: number, email: string): void {
        this.checkingDate(reportType);

        let body: any = {
            reportType: reportType,
            email: email,
            startDate: this.newStartDate,
            endDate: this.newEndDate
        }

        this.blockUiService.open();

        this.reportService.exportReport(body)
            .pipe(finalize(() => this.blockUiService.close()))
            .subscribe((data) => {
                this.popupService.alert('Report succesfully sent to ' + email);
            });
    }

    clearReconTransactionDate() {
        this.reportForm.controls['reconTransactionDate'].setValue('');
        this.reconTransactionStartDate = '';
        this.reconTransactionEndDate = '';
    }

    clearEManDateReconDate() {
        this.reportForm.controls['eManDateReconDate'].setValue('');
        this.eManDateReconStartDate = '';
        this.eManDateReconEndDate = '';
    }

    clearAccountCreationReconDate() {
        this.reportForm.controls['accountCreationReconDate'].setValue('');
        this.accountCreationStartDate = '';
        this.accountCreationEndDate = '';
    }
}
