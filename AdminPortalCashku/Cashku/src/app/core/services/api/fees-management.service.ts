import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeesManagementListModel, FundsListModel } from 'src/app/core/models/fees-management/fees-management.model';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { ListingFilterModel, ListingResponseModel } from 'src/app/pages/admin/listing-popup/base-listing.model';

@Injectable({
    providedIn: 'root'
})
export class FeesManagementService extends BaseApiService {

    protected endPoint: string = '/WrapFee'

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        this.manualConstructor();
    }

    deleteFee(scheme: string): Observable<any> {
        return this.http.delete(`${this.fullPathEndPoint}/fund/${scheme}`);
    }

    getFunds(): Observable<FundsListModel> {
        return this.http.get<FundsListModel>(`${this.fullPathEndPoint}/fund/dropdown/`);
    }

    getListing(filter: ListingFilterModel): Observable<ListingResponseModel<FeesManagementListModel>> {
        let params: any = this.generateListingParams(filter);

        return this.http.get<ListingResponseModel<FeesManagementListModel>>(`${this.fullPathEndPoint}/fundWrapFee/`, {
            params: params,
        });
    }

    updateFundWrapFee(data): Observable<any> {
        let body = {
            scheme: data.scheme,
            wrapFee: data.wrapFee,
        }

        return this.http.put(`${this.fullPathEndPoint}/fund/`, body);
    }
}
