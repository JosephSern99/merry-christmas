import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ListingResponseModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { NotificationListModel } from 'src/app/core/models/notification/notification.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService extends BaseApiService {

    protected endPoint: string = '/notification'

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        this.manualConstructor();
    }

    getListing(): Observable<ListingResponseModel<NotificationListModel>> {
        let dummyResponse = new ListingResponseModel<NotificationListModel>();
        dummyResponse.data = [];
        for (let i = 0; i < 14; i++) {
            let dummyData = new NotificationListModel();
            dummyData.easeRename_title = `title ${i+1}`;
            dummyData.easeRename_descripton = `desc ${i+1}`;
            dummyData.easeRename_sentDate = `updatedon ${i+1}`;
            dummyResponse.data.push(dummyData);
        }
        return of(dummyResponse);
    }
}
