import { AdvisorListingFilterModel, CustomerInformation, PlannerNoteCreate, PlannerNoteDetailModel, PlannerNoteListModel } from 'src/app/core/models/planner-note/planner-note.model';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingResponseModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { PlannerNotesService } from 'src/app/core/services/api/planner-notes.service';

@Injectable({
    providedIn: 'root'
})
export class InternalNotesService extends PlannerNotesService {

    // TODO: This class need to redesign to follow BaseApiService if time allowed.

    protected endPoint: string = '/InternalNote'

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        this.manualConstructor();
    }

    createInternalNotes(data: PlannerNoteCreate): Observable<any> {
        return this.http.post(this.fullPathEndPoint, data);
    }

    updateInternalNotes(data: PlannerNoteCreate, internalId: any): Observable<any> {
        return this.http.put(this.fullPathEndPoint + '/' + internalId, data);
    }

    deleteInternalNoteData(internalId: string | number): Observable<any> {
        return this.http.delete(this.fullPathEndPoint + '/' + internalId);
    }

    getAdvisorInternalNotes(filter: AdvisorListingFilterModel): Observable<ListingResponseModel<PlannerNoteListModel>> {
        let params: any = this.generateListingParams(filter);
        params.advisorId = filter.advisorId;

        return this.http.get<ListingResponseModel<PlannerNoteListModel>>(`${this.fullPathEndPoint}/advisor`, {
            params: params,
        });
    }

    searchCustomers(advisorId: string, filterString: string = ''): Observable<CustomerInformation[]> {
        return this.http.get<CustomerInformation[]>(`${this.host + this.apiVersion}/Planner/searchCustomers`, {
            params: {
                AdvisorId: advisorId,
                FilterString: filterString
            }
        });
    }

    deleteCustomerFromInternalNote(id: string) {
        return this.http.delete(`${this.fullPathEndPoint}/user/${id}`);
    }
}
