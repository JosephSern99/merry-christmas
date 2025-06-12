import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PaymentDetail } from 'src/app/core/models/payment/payment.model';
import { PaymentDetailService } from 'src/app/core/services/api/payment-detail.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-payment-success-detail',
    templateUrl: './payment-success-detail.component.html',
    styleUrls: ['./payment-success-detail.component.scss'],
    standalone: false
})

export class PaymentSuccessDetailComponent implements OnInit {
    onDestroy = new Subject();
    orderNo: string;
    paymentData: PaymentDetail;
    tokenUrl: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private apiService: PaymentDetailService,
        private popUp: PopupService,
    ) { }

    ngOnInit(): void {
        this.getParameterUrl()
    }

    getParameterUrl(): void {
        this.orderNo = this.activatedRoute.snapshot.paramMap.get('orderno');
        this.tokenUrl = this.activatedRoute.snapshot.paramMap.get('token');
        this.getPaymentDetailData();
    }

    getPaymentDetailData(): void {
        this.apiService.getPaymentDetailData(this.orderNo, this.tokenUrl).subscribe(data => {
            this.paymentData = data;
        },
        error => {
            if (error.error.messages[0].message) {
                this.popUp.alert(error.error.messages[0].message);
            }
            else {
                this.popUp.alert("Server Error");
            }
        });
    }

}
