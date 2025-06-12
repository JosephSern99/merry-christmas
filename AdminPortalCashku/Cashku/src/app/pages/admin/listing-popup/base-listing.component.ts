import { BaseApiService } from './base-api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ListingDataInterface, ListingFilterModel, ListingResponseModel, UiPaginationModel } from './base-listing.model';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { BaseListingPopupPageInterface } from './base-listing-popup-page.interface';
import {MatSpinner} from '@angular/material/progress-spinner';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

/**
 * ListingPopupBaseComponent is designed to using List as parent route.
 * Detail, Edit & Create is child route of parent route.
 */
@Component({
    selector: 'app-agmo-listing-popup-base',
    templateUrl: './base-listing.component.html',
    styleUrls: ['./listing-popup.scss'],
    standalone: true,
    imports:[
        MatSpinner,
        CommonModule,
        RouterModule
    ]
})
export abstract class ListingPopupBaseComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = []; // Table's column fields.
    filterFormGroup: UntypedFormGroup; // Filter FormControl to handle filter event.
    isDetailPopupShow = false;
    isListingLoading = false;
    listingDataSource: ListingDataInterface[] = [];
    pagination: UiPaginationModel = new UiPaginationModel();
    searchBarFormControl: UntypedFormControl = new UntypedFormControl(''); // Use for search in filter textbox.

    protected componentInstance$ = new Subject(); // Use for stop any stream when the component is destoryed.
    protected sorting: Sort = { active: '', direction: '' }; // Set column & direction if got default sorting in table.

    constructor(
        protected apiService: BaseApiService,
        protected formBuilder: UntypedFormBuilder,
    ) { }

    ngOnInit() {
        // Overwrite ngOnInit need to call super because super.ngOnInit() has basic handling.
        this.setupFilterFormGroup();
        this.setupSearchBar();
        this.getListing();
    }

    ngOnDestroy() {
        this.componentInstance$.next();
        this.componentInstance$.complete();
    }

    /**
     * Get listing from API.
     */
    getListing() {
        this.isListingLoading = true;
        const filter: ListingFilterModel = this.generateListingFilterParam();

        this.apiService.getListing(filter).pipe(takeUntil(this.componentInstance$)).subscribe(
            (success) => {
                this.handleSuccessListingResponse(success);
            },
            (error) => { console.log(error); }
        ).add(
            () => { this.isListingLoading = false; }
        );
    }

    isListEmpty(): boolean {
        return this.listingDataSource.length === 0 && !this.isListingLoading;
    }

    onFilterChange() {
        this.pagination.pageIndex = 0;
        this.getListing();
    }

    onOutletActivate() {
        this.isDetailPopupShow = true;
    }

    onOutletDeactivate(listingPopupPage: BaseListingPopupPageInterface): void {
        this.isDetailPopupShow = false;

        if (listingPopupPage?.isRefreshRequired === undefined) {
            console.warn('Popup page open from listing is not implementing BaseListingPopupPageInterface!', listingPopupPage);
            return;
        }

        if (listingPopupPage.isRefreshRequired()) {
            this.getListing();
        }
    }

    onPaginationChange(page: PageEvent) {
        this.pagination.pageIndex = page.pageIndex;
        this.pagination.pageSize = page.pageSize;

        this.getListing();
    }

    onSortChange(sortInfo: Sort){
        this.sorting = sortInfo;
        this.getListing();
    }

    /**
     * Generate listing filter parameter to send to API.
     * @return BaseListingFilterModel
     */
    protected generateListingFilterParam(): ListingFilterModel {
        const newFilter: ListingFilterModel = new ListingFilterModel();
        newFilter.currentPage = this.pagination.pageIndex;
        newFilter.take = this.pagination.pageSize;
        newFilter.isOrderByDesc = this.sorting.direction === 'desc';
        newFilter.orderBy = this.sorting.active;
        newFilter.keywords = this.searchBarFormControl.value.trim();

        return newFilter;
    }

    protected handleSuccessListingResponse(responseData: ListingResponseModel<ListingDataInterface>): void {
        this.pagination.length = responseData.totalCount;
        this.listingDataSource = responseData.data;
        if (this.listingDataSource) {
            this.listingDataSource.map((item, i) => {
                // This scenario is pageIndex start from 0.
                // If pageIndex start from 1, need to + 1.
                item.index = (this.pagination.pageIndex) * this.pagination.pageSize + i + 1;
            });
        }
    }

    /**
     * Setup filter FormGroup to handle other filters.
     * This excluded the searchbar.
     */
    protected setupFilterFormGroup() {
        this.filterFormGroup = this.formBuilder.group({});

        this.filterFormGroup.valueChanges.pipe(debounceTime(500)).subscribe(
            () => { this.onFilterChange(); },
        );
    }

    /**
     * Setup searchbar.
     */
    protected setupSearchBar() {
        this.searchBarFormControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(
            () => { this.onFilterChange(); },
        );
    }

}
