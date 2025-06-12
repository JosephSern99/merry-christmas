import { ActivatedRoute } from '@angular/router';
import { BaseSubTabPageInterface } from 'src/app/pages/admin/listing-popup/base-listing-popup-page.interface';
import { Component, OnInit } from '@angular/core';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';

@Component({
    selector: 'app-advisor-sub-tab',
    template: '<p>app-advisor-sub-tab works!</p>',
})
export abstract class AdvisorSubTabComponent implements OnInit, BaseSubTabPageInterface {

    protected advisorID: string;

    constructor(
        protected activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.getAdvisorIDFromParent();
    }

    abstract getSubTab(): DetailSubTab;

    protected abstract getFromAPI(): void;

    protected getAdvisorIDFromParent(): void {
        this.activatedRoute.parent.params.subscribe(
            (params) => {
                this.advisorID = params.id || null;
                this.getFromAPI();
            }
        );
    }

}
