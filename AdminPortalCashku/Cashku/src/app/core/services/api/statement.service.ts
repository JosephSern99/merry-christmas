import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { StatementPeriod } from '../../models/statement/statement.model';

@Injectable({
    providedIn: 'root',
})
export class StatementService extends BaseApiService {
    /**
     * Always start the URL with a "/".
     */
    protected endPoint: string = '/Statement';

    constructor(protected http: HttpClient) {
        super(http);

        // Due to JS class limitation, we need to run this at child class.
        this.manualConstructor();
    }

    getPeriod(userID: string): Observable<StatementPeriod[]> {
        return this.http.get<StatementPeriod[]>(`${this.fullPathEndPoint}/List`, {
            params: {
                userId: userID,
            },
        });
    }

    download(userID: string, startDate: string, endDate: string): Observable<{url: string}> {
        return this.http.get<{url: string}>(`${this.fullPathEndPoint}/Document`, {
            params: {
                userId: userID,
                startDate: startDate,
                endDate: endDate,
            },
        });
    }
}
