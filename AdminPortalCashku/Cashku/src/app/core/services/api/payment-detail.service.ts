import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PaymentDetail } from 'src/app/core/models/payment/payment.model';

@Injectable({
    providedIn: 'root'
})
export class PaymentDetailService extends BaseApiService {

    protected endPoint: string = '/payment/details/';
    protected authOutside: string = '/api/v1';

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        this.pathOutsideAuth();
    }

    protected pathOutsideAuth(): void {
        this.fullPathEndPoint = this.host + this.authOutside + this.endPoint;
    }

    getPaymentDetailData(orderNo: string, token: string): Observable<PaymentDetail> {
        return this.http.get(this.fullPathEndPoint + orderNo + '?token=' + token)
            .pipe(map((response: any) => {
                return response;
            }));
    }
}
