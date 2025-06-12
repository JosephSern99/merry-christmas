import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioFund, PortfolioManagementListModel } from 'src/app/core/models/portfolio-management/portfolio-management.models';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';

@Injectable({
    providedIn: 'root'
})
export class PortfolioManagementService extends BaseApiService {

    /**
     * Always start the URL with a "/".
     */
    protected endPoint: string = '/Portfolio';

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        // Due to JS class limitation, we need to run this at child class.
        this.manualConstructor();
    }

    getPortfolioList(filter: ListingFilterModel): Observable<PortfolioManagementListModel[]> {
        let params: any = this.generateListingParams(filter);
        return this.http.get<PortfolioManagementListModel[]>(this.fullPathEndPoint, {params: params});
    }

    getFundsList(): Observable<PortfolioFund> {
        return this.http.get<PortfolioFund>(`${this.fullPathEndPoint}/funds`);
    }

    updatePortfolioDetail(id: number | string, body: any) {
        return this.http.put(`${this.fullPathEndPoint}/${id}`, body);
    }

    updateAppoitnmentStatus(appointmentId: number, action: number) {
        const body = {
            AppointmentStatus: action,
        }

        return this.http.put(`${this.fullPathEndPoint}` + '/' + appointmentId, body);
    }
}
