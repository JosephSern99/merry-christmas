import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignableAdvisorModel, AssignableCustomerModel, CreateAdvisorModel, SuspendAdvisorSubmissionModel } from 'src/app/core/models/advisor/advisor.model';
import { CustomerDetailModel } from 'src/app/core/models/customer/customer.model';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { ListingFilterModel, ListingResponseModel } from 'src/app/pages/admin/listing-popup/base-listing.model';

@Injectable({
    providedIn: 'root'
})
export class AdvisorService extends BaseApiService {

    /**
     * Always start the URL with a "/".
     */
    protected endPoint: string = '/Advisor';

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        // Due to JS class limitation, we need to run this at child class.
        this.manualConstructor();
    }

    getAssignableAdvisors(filter: ListingFilterModel): Observable<ListingResponseModel<AssignableAdvisorModel>> {
        const params: any = this.generateListingParams(filter);
        return this.http.get<ListingResponseModel<AssignableAdvisorModel>>(this.fullPathEndPoint, {
            params,
        });
    }

    assignAdvisorWithCustomers(advisorID: string, customerIDs: string[]): Observable<any> {
        const body: any = {
            advisorId: advisorID,
            userList: customerIDs,
        };

        return this.http.post(`${this.fullPathEndPoint}/assignCustomers`, body);
    }

    getAdvisorCustomerList(id: string, filter: ListingFilterModel): Observable<ListingResponseModel<CustomerDetailModel>> {
        const params: any = this.generateListingParams(filter);

        return this.http.get<ListingResponseModel<CustomerDetailModel>>(`${this.fullPathEndPoint}/${id}/customers`, {
            params,
        });
    }

    getAssignableCustomerList(searchKey: string): Observable<AssignableCustomerModel[]> {
        const params: any = {
            FilterString: searchKey
        }

        return this.http.get<AssignableCustomerModel[]>(`${this.fullPathEndPoint}/assignCustomers`, {
            params
        });
    }

    createAdvisor(CreateAdvisorModel): Observable<any> {
        const body = {
            calendlyLink: CreateAdvisorModel.calendlyLink,
            countryCode: CreateAdvisorModel.countryCode,
            email: CreateAdvisorModel.email,
            fullName: CreateAdvisorModel.fullName,
            phoneNumber: CreateAdvisorModel.phoneNumber.toString(),
        }

        return this.http.post(this.fullPathEndPoint, body);
    }

    updateAdvisor(advisor: CreateAdvisorModel, id: number | string): Observable<any> {
        const body = {
            calendlyLink: advisor.calendlyLink,
            countryCode: advisor.countryCode,
            email: advisor.email,
            fullName: advisor.fullName,
            phoneNumber: advisor.phoneNumber.toString(),
            userId: id,
        }

        return this.http.put(this.fullPathEndPoint, body);
    }

    removeAssignedCustomer(advisorId: string, userList: string[]): Observable<any> {
        const options = {
            body: {
                advisorId: advisorId,
                userList: userList
            }
        }

        return this.http.request('DELETE', this.fullPathEndPoint + '/removeCustomers', options);
    }

    suspendAdvisor(requestBody: SuspendAdvisorSubmissionModel): Observable<boolean> {
        return this.http.post<boolean>(`${this.fullPathEndPoint}/suspend`, requestBody);
    }

    unsuspendAdvisor(advisorId: string): Observable<boolean> {
        return this.http.post<boolean>(`${this.fullPathEndPoint}/unsuspend/${advisorId}`, {});
    }

    deleteAdvisor(requestBody: SuspendAdvisorSubmissionModel): Observable<boolean> {
        const options = { body: requestBody };

        return this.http.request<boolean>('DELETE', this.fullPathEndPoint, options);
    }
}
