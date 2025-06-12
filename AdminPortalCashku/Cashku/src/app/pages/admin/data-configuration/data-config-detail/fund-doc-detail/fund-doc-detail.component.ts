import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentationsConfigurationDetailModel } from 'src/app/core/models/data-configuration/data-configuration.model';
import { DataConfigurationService } from 'src/app/core/services/api/data-configuration.service';
import { ListingPopupDetailComponent } from '../../../listing-popup/base-detail/base-detail.component';

@Component({
    selector: 'app-fund-doc-detail',
    templateUrl: './fund-doc-detail.component.html',
    styleUrls: ['./fund-doc-detail.component.scss'],
    standalone: false
})
export class FundDocDetailComponent extends ListingPopupDetailComponent {
    detail: DocumentationsConfigurationDetailModel;

    constructor(
        protected apiService: DataConfigurationService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
    ) {
        super( apiService, activatedRoute, router);
    }

    protected handleSuccessResponse(response: DocumentationsConfigurationDetailModel): void {
        super.handleSuccessResponse(response);
    }
}
