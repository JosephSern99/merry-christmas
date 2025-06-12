import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/api/dashboard.service';
import { UntypedFormBuilder } from '@angular/forms';
import { ListingPopupBaseComponent } from '../listing-popup/base-listing.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent extends ListingPopupBaseComponent implements OnInit {
    constructor(
        protected apiService: DashboardService,
        protected formBuilder: UntypedFormBuilder
    ) {
        super(apiService, formBuilder);
    }

    ngOnInit(): void {}
}
