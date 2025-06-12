import { AuditListFilterModel, AuditListModel } from 'src/app/core/models/audit/audit.model';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListingResponseModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuditService extends BaseApiService {

    /**
     * Always start the URL with a "/".
     */
    protected endPoint: string = '/AuditTrail';

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        // Due to JS class limitation, we need to run this at child class.
        this.manualConstructor();
    }

    getAuditList(filter: AuditListFilterModel): Observable<ListingResponseModel<AuditListModel>> {
        let params: any = this.generateListingParams(filter);

        return this.http.get<ListingResponseModel<AuditListModel>>(`${this.fullPathEndPoint}/logs`, {
            params: params,
        });
    }

    protected generateListingParams(filter: AuditListFilterModel) {
        let params = super.generateListingParams(filter);

        if (filter.ModuleType != 0) {
            params.ModuleType = filter.ModuleType;
        }

        if (filter.CreatedAtFrom) {
            params.CreatedAtFrom = filter.CreatedAtFrom;
        }

        if (filter.CreatedAtTo) {
            params.CreatedAtTo = filter.CreatedAtTo;
        }

        return params;
    }
}
