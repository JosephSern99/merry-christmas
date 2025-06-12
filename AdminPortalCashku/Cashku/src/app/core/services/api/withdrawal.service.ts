import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WithdrawListingFilterModel } from 'src/app/core/models/withdrawal/withdrawal.model';

@Injectable({
    providedIn: 'root'
})
export class WithdrawalService extends BaseApiService {

    protected endPoint: string = '/Withdraw';

    constructor(
        protected http: HttpClient,
    ) { 
        super(http);

        this.manualConstructor();
    }

    updateWithdrawStatus(withdrawId: number, action: number ) {
        const body = {
            WithdrawAction: action,
        }

        return this.http.put(`${this.fullPathEndPoint}` + '/' + withdrawId, body);
    }

    generateListingParams(filter: WithdrawListingFilterModel): any {
        let newParams: any = super.generateListingParams(filter);

        if (filter.transactionStatus != '0') {
            newParams.TransactionStatus = filter.transactionStatus;
        }

        return newParams;
    }
}
