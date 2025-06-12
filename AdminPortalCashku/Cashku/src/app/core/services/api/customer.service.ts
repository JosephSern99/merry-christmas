import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetCustomerDataModel } from 'src/app/core/models/customer-list/GetCustomer-data-model';
import { CustomerFundListModel, CustomerGoal, CustomerGoalFunds, CustomerInfoDropdown, CustomerListingFilterModel, CustomerPortfolio, CustomerTransactionHistoryList, PostSuspendCustomerSubmissionModel } from 'src/app/core/models/customer/customer.model';
import { PlannerNoteListModel } from 'src/app/core/models/planner-note/planner-note.model';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { ListingFilterModel, ListingResponseModel, StandardResponseModel } from 'src/app/pages/admin/listing-popup/base-listing.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BaseApiService {

    /**
     * Always start the URL with a "/".
     */
    protected endPoint = '/Customer';

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        // Due to JS class limitation, we need to run this at child class.
        this.manualConstructor();
    }

    assignCustomerWithAdvisor(advisorID: string, customerID: string): Observable<any> {
        const body: any = {
            advisorId: advisorID,
        };

        return this.http.put(`${this.fullPathEndPoint}/${customerID}/changeAdvisor`, body);
    }

    getAdminCustomerList(filter: CustomerListingFilterModel): Observable<ListingResponseModel<GetCustomerDataModel>> {
        const params: any = this.generateCutomerListingParams(filter);

        return this.http.get<ListingResponseModel<GetCustomerDataModel>>(`${this.fullPathEndPoint}`, {
            params,
        });
    }

    getAdvisorCustomerList(filter: ListingFilterModel): Observable<ListingResponseModel<GetCustomerDataModel>> {
        const params: any = super.generateListingParams(filter);

        return this.http.get<ListingResponseModel<GetCustomerDataModel>>(`${this.fullPathEndPoint}/myCustomer`, {
            params,
        });
    }

    private generateCutomerListingParams(filter: CustomerListingFilterModel): any {
        const newParams: any = super.generateListingParams(filter);

        if (filter.RegisterStep !== 0) {
            newParams.RegisterStep = filter.RegisterStep;
        }

        return newParams;
    }

    getPlannerNotes(id: string, filter: CustomerListingFilterModel): Observable<ListingResponseModel<PlannerNoteListModel>> {
        const params: any = this.generatePlannerNoteListingParams(filter);

        return this.http.get<ListingResponseModel<PlannerNoteListModel>>(`${this.fullPathEndPoint}/${id}/planners`, {
            params,
        });
    }

    getInternalNotes(id: string, filter: CustomerListingFilterModel): Observable<ListingResponseModel<PlannerNoteListModel>> {
        const params: any = this.generatePlannerNoteListingParams(filter);

        return this.http.get<ListingResponseModel<PlannerNoteListModel>>(`${this.fullPathEndPoint}/${id}/internalNotes`, {
            params,
        });
    }

    private generatePlannerNoteListingParams(filter: CustomerListingFilterModel): any {
        const newParams: any = super.generateListingParams(filter);

        if (filter.endorseStatus !== '-1') {
            newParams.EndorseStatus = filter.endorseStatus;
        }

        return newParams;
    }

    getInfoDropdownList(): Observable<StandardResponseModel<CustomerInfoDropdown>> {
        return this.http.get<StandardResponseModel<CustomerInfoDropdown>>(`${this.fullPathEndPoint}/editCustomerInfo`);
    }

    getGoals(id: string): Observable<CustomerGoal[]> {
        return this.http.get<CustomerGoal[]>(`${this.fullPathEndPoint}/${id}/goals`);
    }

    getCustomerPortfolio(id: string): Observable<CustomerPortfolio[]> {
        return this.http.get<CustomerPortfolio[]>(`${this.fullPathEndPoint}/${id}/portfolio`);
    }

    getFundList(id: string, filter: ListingFilterModel): Observable<ListingResponseModel<CustomerFundListModel>> {
        const params: any = this.generateListingParams(filter);

        return this.http.get<ListingResponseModel<CustomerFundListModel>>(`${this.fullPathEndPoint}/${id}/funds`, {
            params,
        });
    }

    getGoalFunds(id: string, goalId: number): Observable<CustomerGoalFunds> {
        return this.http.get<CustomerGoalFunds>(`${this.fullPathEndPoint}/${id}/goals/${goalId}`);
    }

    getGoalTransactionHistories(id: string, goalId: number, filter: ListingFilterModel): Observable<ListingResponseModel<CustomerTransactionHistoryList>> {
        const params: any = this.generateListingParams(filter);

        return this.http.get<ListingResponseModel<CustomerTransactionHistoryList>>(`${this.fullPathEndPoint}/${id}/goals/${goalId}/transactionHistory`, {
            params,
        });
    }

    getFundsTransactionHistories(id: string, fundCode: string, filter: ListingFilterModel): Observable<ListingResponseModel<CustomerTransactionHistoryList>> {
        const params: any = super.generateListingParams(filter);

        return this.http.get<ListingResponseModel<CustomerTransactionHistoryList>>(`${this.fullPathEndPoint}/${id}/fund/${fundCode}/transactionHistory`, {
            params,
        });
    }

    deleteCustomerData(customerId: string): Observable<boolean> {
        return this.http.delete<boolean>(`${this.fullPathEndPoint}/${customerId}`);
    }

    createCustomer(customer: any, id: string | number): Observable<any> {
        const body = {
            birthday: moment(customer.birthday).utc().toISOString(),
            businessNatureId: customer.businessNatureId,
            countryCode: customer.countryCode,
            employmentStatusId: customer.employmentStatusId,
            fullname: customer.fullname,
            gender: customer.gender,
            hobbies: customer.hobbies,
            identityNo: customer.identityNo,
            incomeId: customer.incomeId,
            nationalityId: customer.nationalityId,
            phoneNumber: customer.phoneNumber,
            race: customer.race,
            tinDetail: customer.tinDetail,
            userId: id,
        };

        return this.http.put(this.fullPathEndPoint, body);
    }

    resetCustomerPasswords(email: string): Observable<boolean> {
        return this.http
            .post<{ result: boolean }>(
                `${this.fullPathEndPoint}/resetCustomerPasswords`,
                { email }
            )
            .pipe(map((resp) => resp.result));
    }

    postSuspendCustomer(requestBody: PostSuspendCustomerSubmissionModel): Observable<boolean> {
        return this.http.post<boolean>(`${this.fullPathEndPoint}/suspend`, requestBody);
    }

    postUnsuspendCustomer(id: string): Observable<boolean> {
        return this.http.post<boolean>(`${this.fullPathEndPoint}/unsuspend/${id}`, {});
    }
}
