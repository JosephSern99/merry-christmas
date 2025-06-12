import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RecurringPaymentService extends BaseApiService {

    /**
     * Always start the URL with a "/".
     */
    protected endPoint: string = '/payment/documents';

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        // Due to JS class limitation, we need to run this at child class.
        this.manualConstructor();
    }

    uploadAutoDebit(file: FileList) {
        const data = new FormData();
        data.append("transactionFile", file[0]);

        return this.http.post(this.host + this.apiVersion + '/payment/upload/autodebit', data);
    }

}
