import { ActivatedRoute } from '@angular/router';
import { BaseSubTabPageInterface } from 'src/app/pages/admin/listing-popup/base-listing-popup-page.interface';
import { Component, OnInit } from '@angular/core';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';

@Component({
    selector: 'app-customer-sub-tab',
    template: '<p>app-customer-sub-tab works!</p>',
    standalone: false
})
export abstract class CustomerSubTabComponent implements OnInit, BaseSubTabPageInterface {

    protected customerID: string;
    isLoading: boolean = false;

    constructor(
        protected activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.getCustomerIDFromParent();
    }

    abstract getSubTab(): DetailSubTab;

    protected abstract getFromAPI(): void;

    protected getCustomerIDFromParent(): void {
        this.isLoading = true;
        this.activatedRoute.parent.params.subscribe(
            (params) => {
                this.customerID = params.id || null;
                this.getFromAPI();
            }
        );
    }

}
