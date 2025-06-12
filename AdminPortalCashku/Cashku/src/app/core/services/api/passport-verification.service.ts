import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PassportVerificationFilterModel } from 'src/app/core/models/passport-verification/passport-verification.model';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';


@Injectable({
    providedIn: 'root'
})
export class PassportVerificationService extends BaseApiService {

    /**
     * Always start the URL with a "/".
     */
    protected endPoint = '/Passport';

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        // Due to JS class limitation, we need to run this at child class.
        this.manualConstructor();
    }

    updateVerificationStatus(id, action): Observable<any> {
        const body = {
            PassportVerificationStatus: action
        }

        return this.http.put(this.fullPathEndPoint + '/'+ id, body);
    }

    protected generateListingParams(filter: PassportVerificationFilterModel): any {
        let params: any = super.generateListingParams(filter);

        if (filter.passportVerificationStatus !== '0') {
            params.passportVerificationStatus = filter.passportVerificationStatus;
        }

        return params;
    }

}
