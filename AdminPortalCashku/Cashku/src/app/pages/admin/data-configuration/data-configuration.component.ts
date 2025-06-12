import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { DataConfigListModel } from 'src/app/core/models/data-configuration/data-configuration.model';
import { DataConfigurationService } from 'src/app/core/services/api/data-configuration.service';
import { ListingPopupBaseComponent } from '../listing-popup/base-listing.component';

@Component({
    selector: 'app-data-configuration',
    templateUrl: './data-configuration.component.html',
    styleUrls: ['./data-configuration.component.scss'],
    standalone: false
})
export class DataConfigurationComponent extends ListingPopupBaseComponent {

    displayedColumns: string[] = [ 'easeRename_dclmFundName', ];
    listingDataSource: DataConfigListModel[] = [];
    saveFundList: DataConfigListModel[] = [];

    constructor(
        protected apiService: DataConfigurationService,
        protected formBuilder: UntypedFormBuilder,
    ) {
        super(apiService, formBuilder);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.getSaveFundListing();
    }

    getSaveFundListing(): void {
        this.apiService.getSaveFundList().pipe(takeUntil(this.componentInstance$)).subscribe(
            (success) => {
                this.saveFundList = success;
            },
            (error) => { console.log(error); }
        )
    }
}
