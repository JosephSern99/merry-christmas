import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportService extends BaseApiService {

    protected endPoint: string = '/Report';

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        // Due to JS class limitation, we need to run this at child class.
        this.manualConstructor();
    }

    exportReport(body): Observable<boolean> {
        return this.http.post(this.fullPathEndPoint, body)
            .pipe(map((data: any) => data.data));
    }
}
