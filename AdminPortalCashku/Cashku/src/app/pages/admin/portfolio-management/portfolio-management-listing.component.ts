import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { PortfolioManagementListModel } from 'src/app/core/models/portfolio-management/portfolio-management.models';
import { PortfolioManagementService } from 'src/app/core/services/api/portfolio-management.service';
import { PortfolioType } from 'src/app/core/constants/portfolio-management.constants';
import { takeUntil } from 'rxjs/operators';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';

@Component({
    selector: 'app-portfolio-management',
    templateUrl: './portfolio-management-listing.component.html',
    styleUrls: ['./portfolio-management-listing.component.scss'],
    standalone: false
})
export class PortfolioManagementComponent extends ListingPopupBaseComponent implements OnInit {

    displayedColumns: string[] = ['index', 'lowestReturnPercentage', 'averageReturnPercentage', 'highestReturnPercentage', 'action'];
    listingDataSource: PortfolioManagementListModel[] = [];
    PortfolioType = PortfolioType;

    constructor(
        protected apiService: PortfolioManagementService,
        protected formBuilder: UntypedFormBuilder,
    ) {
        super(apiService, formBuilder);
    }

    getListing(): void {
        this.isListingLoading = true;
        let filter: ListingFilterModel = this.generateListingFilterParam();

        this.apiService.getPortfolioList(filter)
            .pipe(takeUntil(this.componentInstance$))
            .subscribe((success) => {
                this.handlePortfolioListingResponse(success);
            },
                (error) => { console.log(error); }
            ).add(
                () => { this.isListingLoading = false; }
            );
    }

    protected handlePortfolioListingResponse(responseData: PortfolioManagementListModel[]): void {
        this.listingDataSource = responseData;
    }
}
