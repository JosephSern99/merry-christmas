import { AdvisorListingFilterModel, CustomerInformation, PlannerNoteCreate, PlannerNoteDetailModel, PlannerNoteListModel } from 'src/app/core/models/planner-note/planner-note.model';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingResponseModel } from 'src/app/pages/admin/listing-popup/base-listing.model';

@Injectable({
    providedIn: 'root'
})
export class PlannerNotesService extends BaseApiService {

    // TODO: This class need to redesign to follow BaseApiService if time allowed.

    protected endPoint: string = '/Planner'

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        this.manualConstructor();
    }

    getPlannerDetails(id: string | number, params: any = { skip: 0, take: 100000 }): Observable<PlannerNoteDetailModel> {
        return this.http.get<PlannerNoteDetailModel>(this.fullPathEndPoint + `/${id}`, { params: params });
    }

    createPlannerNotes(data: PlannerNoteCreate): Observable<any> {
        return this.http.post(this.fullPathEndPoint, data);
    }

    updatePlannerNotes(data: PlannerNoteCreate, plannerId: any): Observable<any> {
        return this.http.put(this.fullPathEndPoint + '/' + plannerId, data);
    }

    deletePlannerNoteData(plannerId: string | number): Observable<any> {
        return this.http.delete(this.fullPathEndPoint + '/' + plannerId);
    }

    getAdvisorPlannerNotes(filter: AdvisorListingFilterModel): Observable<ListingResponseModel<PlannerNoteListModel>> {
        let params: any = this.generateListingParams(filter);
        params.advisorId = filter.advisorId;

        return this.http.get<ListingResponseModel<PlannerNoteListModel>>(`${this.fullPathEndPoint}/advisor`, {
            params: params,
        });
    }

    searchCustomers(advisorId: string, filterString: string = ''): Observable<CustomerInformation[]> {
        return this.http.get<CustomerInformation[]>(`${this.fullPathEndPoint}/searchCustomers`, {
            params: {
                AdvisorId: advisorId,
                FilterString: filterString
            }
        });
    }

    deleteCustomerFromPlannerNote(id: string) {
        return this.http.delete(`${this.fullPathEndPoint}/user/${id}`);
    }
}
