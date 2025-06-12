import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { AdvisorListModel } from 'src/app/core/models/advisor/advisor.model';
import { AdvisorService } from 'src/app/core/services/api/advisor.service';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { ListingDataInterface, ListingFilterModel, ListingResponseModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-advisor-listing',
    templateUrl: './advisor-listing.component.html',
    styleUrls: ['./advisor-listing.component.scss'],
    standalone: false
})
export class AdvisorListingComponent extends ListingPopupBaseComponent {

    displayedColumns: string[] = ['index', 'fullname', 'email', 'fullPhoneNumber', 'accountStatus', 'threeDotMenu'];
    listingDataSource: AdvisorListModel[] = [];

    constructor(
        protected apiService: AdvisorService,
        protected formBuilder: UntypedFormBuilder,
        private popupService: PopupService,
    ) {
        super(apiService, formBuilder);
    }

    onUnsuspend(advisorId: string): void {
        this.popupService
            .confirm('Are you sure you want to unsuspend this advisor?')
            .then(
                () => {
                    this.apiService.unsuspendAdvisor(advisorId).subscribe({
                        next: () => this.getListing(),
                        error: (err) => {
                            if (err.error.messages[0].message) {
                                this.popupService.alert(err.error.messages[0].message);
                            }
                        },
                    });
                },
                () => {}
            );
    }

    protected handleSuccessListingResponse(responseData: ListingResponseModel<ListingDataInterface>): void {
        super.handleSuccessListingResponse(responseData);
        this.listingDataSource = this.listingDataSource.map((d) => ({
            ...d,
            uiAccountStatus: {
                label: d.isActive ? 'Active' : 'Suspended',
                cssClass: d.isActive ? 'active-status' : 'deactivated-status',
            },
        }));
    }

    protected generateListingFilterParam(): ListingFilterModel {
        let newFilter: ListingFilterModel = super.generateListingFilterParam();
        if (newFilter.keywords.length > 0) {
            newFilter.keywordsField = 'FullName';
        }

        return newFilter;
    }
}
