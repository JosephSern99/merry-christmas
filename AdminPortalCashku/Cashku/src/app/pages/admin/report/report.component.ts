import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { finalize } from 'rxjs/operators';
import { ReportType } from 'src/app/core/constants/report.constant';
import { ReportService } from 'src/app/core/services/api/report.service';
import { ReportEmailInputComponent } from 'src/app/pages/admin/report/report-email-input/report-email-input.component';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import {VerifierDateTimePickerComponent} from '../../../shared/components/datetimepicker/verifier-datetimepicker';
import {NgClass} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        VerifierDateTimePickerComponent,
        NgClass,
        MatButton
    ]

})
export class ReportComponent implements OnInit {
    advisorEndDate: string;
    advisorStartDate: string;
    curDate = new Date();
    customerEndDate: string;
    customerStartDate: string;
    email: string;
    newEndDate: string;
    newStartDate: string;
    reportForm: UntypedFormGroup;
    ReportType = ReportType;
    transactionEndDate: string;
    transactionStartDate: string;

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
            customerDate: '',
            advisorDate: '',
            transactionDate: '',
        });
    }

    reportDateOnChange(event: any, type: number): void {
        switch (type) {
            case 1:
                this.customerStartDate = moment(event[0]).format("YYYY MMMM DD");
                this.customerEndDate = moment(event[1]).format("YYYY MMMM DD");
                break;
            case 2:
                this.advisorStartDate = moment(event[0]).format("YYYY MMMM DD");
                this.advisorEndDate = moment(event[1]).format("YYYY MMMM DD");
                break;
            case 3:
                this.transactionStartDate = moment(event[0]).format("YYYY MMMM DD");
                this.transactionEndDate = moment(event[1]).format("YYYY MMMM DD");
                break;
        }
    }

    addEmail(reportType: number, selectAll = false): void {
        const option: any = {
            size: 'lg',
            center: true,
            windowClass: 'modal-popup-lg',
            backdropClass: 'backdrop-popup',
        };
        const modalRef = this.modalService.open(ReportEmailInputComponent, option);
        modalRef.result.then(
            (data: any) => {
                this.export(reportType, data.email, selectAll);
            }
        )
    }

    checkingDate(reportType?: number) {
        switch (reportType) {
            case 1:
                this.clearAdvisorDate();
                this.clearTransactionDate();
                this.newStartDate = this.customerStartDate;
                this.newEndDate = this.customerEndDate;
                break;
            case 2:
                this.clearCustomerDate();
                this.clearTransactionDate();
                this.newStartDate = this.advisorStartDate;
                this.newEndDate = this.advisorEndDate;
                break;
            case 3:
                this.clearAdvisorDate();
                this.clearCustomerDate();
                this.newStartDate = this.transactionStartDate;
                this.newEndDate = this.transactionEndDate;
                break;
        }
    }

    export(reportType: number, email: string, selectAll: boolean): void {
        this.checkingDate(reportType);

        let body: any = {
            reportType: reportType,
            email: email,
            startDate: this.newStartDate,
            endDate: this.newEndDate,
            selectAll,
        }

        this.blockUiService.open();

        this.reportService.exportReport(body)
            .pipe(finalize(() => this.blockUiService.close()))
            .subscribe((data) => {
                this.popupService.alert('Report succesfully sent to ' + email);
            }, error => {
                if (error.error.messages[0]) {
                    this.popupService.alert(error.error.messages[0].message);
                }
                else {
                    this.popupService.alert("Server Error");
                }
            });
    }

    clearCustomerDate() {
        this.reportForm.controls['customerDate'].setValue('');
        this.customerStartDate = '';
        this.customerEndDate = '';
    }

    clearAdvisorDate() {
        this.reportForm.controls['advisorDate'].setValue('');
        this.advisorStartDate = '';
        this.advisorEndDate = '';
    }

    clearTransactionDate() {
        this.reportForm.controls['transactionDate'].setValue('');
        this.transactionStartDate = '';
        this.transactionEndDate = '';
    }
}
