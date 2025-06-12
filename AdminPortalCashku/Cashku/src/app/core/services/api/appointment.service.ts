import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentListFilterModel, AppointmentListModel } from 'src/app/core/models/appointment/appointment.model';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { ListingFilterModel, ListingResponseModel } from 'src/app/pages/admin/listing-popup/base-listing.model';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService extends BaseApiService {

    /**
     * Always start the URL with a "/".
     */
    protected endPoint: string = '/Appointment';

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        // Due to JS class limitation, we need to run this at child class.
        this.manualConstructor();
    }

    updateAppoitnmentStatus(appointmentId: number, action: number) {
        const body = {
            AppointmentStatus: action,
        }

        return this.http.put(`${this.fullPathEndPoint}` + '/' + appointmentId, body);
    }

    generateListingParams(filter: AppointmentListFilterModel): any {
        let newParams: any = super.generateListingParams(filter);

        if (filter.appointmentStatus != '0') {
            newParams.AppointmentStatus = filter.appointmentStatus;
        }

        return newParams;
    }

    getAppointmentList(appointmentListFilterModel: AppointmentListFilterModel) {
        const filter: ListingFilterModel = this.generateListingParams(appointmentListFilterModel);
        return [];
        // return this.http.get<ListingResponseModel<AppointmentListModel>>(this.fullPathEndPoint, { params: filter });
    }
}
