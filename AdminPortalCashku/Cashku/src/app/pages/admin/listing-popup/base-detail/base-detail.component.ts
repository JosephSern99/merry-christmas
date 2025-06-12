import { ActivatedRoute, Router } from '@angular/router';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { BaseListingPopupPageInterface } from '../base-listing-popup-page.interface';
import { Component, OnInit } from '@angular/core';
import { DetailInterface } from 'src/app/pages/admin/listing-popup/base-listing.model';

@Component({
    selector: 'agmo-listing-popup-detail',
    template: '<p>agmo-listing-popup-detail works!</p>',
    standalone: false
})
export abstract class ListingPopupDetailComponent implements BaseListingPopupPageInterface, OnInit {

    detail: DetailInterface;

    protected id: string | number;
    protected isRefresh: boolean = false;
    protected readonly idParamKey: string = 'id';

    constructor(
        protected apiService: BaseApiService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
    ) { }

    ngOnInit(): void {
        this.getIDFromUrlParam();
        this.getDetail();
    }

    getDetail(): void {
        this.apiService.getDetail(this.id).subscribe(
            (success) => { this.handleSuccessResponse(success); },
            (err) => { this.handleErrorResponse(err); }
        );
    }

    isRefreshRequired(): boolean {
        return this.isRefresh;
    }

    protected getIDFromUrlParam(): void {
        this.id = this.activatedRoute.snapshot.paramMap.get(this.idParamKey);
    }

    // Change the "any" to project error class.
    protected handleErrorResponse(err: any): void {
        if (err.statusCode !== 401) {
            this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        }
    }

    protected handleSuccessResponse(response: DetailInterface) {
        this.detail = response;
    }

}
