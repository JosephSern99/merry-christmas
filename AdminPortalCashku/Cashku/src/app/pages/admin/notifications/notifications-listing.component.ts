import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { NotificationListModel } from 'src/app/core/models/notification/notification.model';
import { NotificationService } from 'src/app/core/services/api/notification.service';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications-listing.component.html',
    styleUrls: ['./notifications-listing.component.scss'],
    standalone: false
})
export class NotificationsComponent extends ListingPopupBaseComponent {
    displayedColumns: string[] = [
        'index',
        'easeRename_title',
        'easeRename_descripton',
        'easeRename_sentDate',
    ];
    listingDataSource: NotificationListModel[] = [];

    constructor(
        protected apiService: NotificationService,
        protected formBuilder: UntypedFormBuilder,
        private popupService: PopupService,
    ) {
        super(apiService, formBuilder);
    }



}
