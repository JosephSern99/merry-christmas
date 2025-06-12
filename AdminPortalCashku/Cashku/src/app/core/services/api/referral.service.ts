import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReferralListFilterModel } from 'src/app/core/models/referral/referral.model';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';

@Injectable({
    providedIn: 'root'
})
export class ReferralService extends BaseApiService {

    /**
     * Always start the URL with a "/".
     */
    protected endPoint: string = '/Referral';

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        // Due to JS class limitation, we need to run this at child class.
        this.manualConstructor();
    }

    protected generateListingParams(filter: ReferralListFilterModel):any {
        let newParams: any = super.generateListingParams(filter);

        if (filter.referralStatus != 0) {
            newParams.referralStatus = filter.referralStatus;
        }

        return newParams;
    }

}
