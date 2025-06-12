import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import { ReturnRateConfigurationDetailModel } from 'src/app/core/models/data-configuration/data-configuration.model';
import { DataConfigurationService } from 'src/app/core/services/api/data-configuration.service';
import { ListingPopupDetailComponent } from '../../../listing-popup/base-detail/base-detail.component';
import {CommonModule, DecimalPipe} from '@angular/common';
import {ListingPopupBreadcrumbComponent} from '../../../listing-popup/helpers/listing-popup-breadcrumb/listing-popup-breadcrumb.component';
import {BaseParentTabPageInterface, BaseSubTabPageInterface} from '../../../listing-popup/base-listing-popup-page.interface';

@Component({
    selector: 'app-return-rate-detail',
    templateUrl: './return-rate-detail.component.html',
    styleUrls: ['./return-rate-detail.component.scss'],
    standalone: true,
    imports: [
        DecimalPipe,
        RouterLink,
        ListingPopupBreadcrumbComponent,
        RouterOutlet,
        CommonModule
    ]
})
export class ReturnRateDetailComponent extends ListingPopupDetailComponent implements BaseParentTabPageInterface {
    detail: ReturnRateConfigurationDetailModel;

    constructor(
        protected apiService: DataConfigurationService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
    ) {
        super(apiService, activatedRoute, router);
    }

    onRouterOutletActivate(subTab: BaseSubTabPageInterface) {
        throw new Error('Method not implemented.');
    }

    getDetail() {
        this.apiService.getSaveFundDetail().subscribe(
            (success) => { this.handleSuccessResponse(success); },
            (err) => { this.handleErrorResponse(err); }
        );
    }

}
