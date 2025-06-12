import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { GetTotalAumApiModel, GetTotalClientsApiModel } from '../../models/dashboard/dashboard.model';

@Injectable({
    providedIn: 'root',
})
export class DashboardService extends BaseApiService {
    protected endPoint: string = '/Dashboard';

    constructor(protected http: HttpClient) {
        super(http);

        this.manualConstructor();
    }

    getTotalClients(): Observable<GetTotalClientsApiModel> {
        return this.http.get<GetTotalClientsApiModel>(`${this.fullPathEndPoint}/clients`);
    }

    getTotalAUM(): Observable<GetTotalAumApiModel> {
        return this.http.get<GetTotalAumApiModel>(`${this.fullPathEndPoint}/aum`);
    }

    postExportDashboardSummary(email: string): Observable<boolean> {
        return this.http.post<boolean>(`${this.fullPathEndPoint}/summary/export`, {}, { params: { email }});
    }
}
