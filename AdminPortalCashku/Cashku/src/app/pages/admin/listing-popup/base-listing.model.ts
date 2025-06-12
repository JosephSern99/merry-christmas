import { PageEvent} from '@angular/material/paginator';
// ***************************************************************************************
// ========== Listing ==========

export class ListingFilterModel {
    currentPage: number = 1;
    isOrderByDesc: boolean = false;
    keywords: string = '';
    keywordsField: string = '';
    orderBy: string = '';
    take: number = 10;
}

export class ListingResponseModel<T> {
    currentPage: number;
    data: T[];
    perPage: number;
    take: number; // Same as per page.
    totalCount: number;
    totalPage: number;
}

export class UiPaginationModel extends PageEvent {
    length: number = 70; // The current total number of items being paged.
    pageIndex: number = 0; // The current page index, start from 0.
    pageSize: number = 10; // The current page size.
    pageSizeOptions: number[] = [10, 25, 50, 100];
}

export interface ListingDataInterface {
    index: number;
}

// ========== Listing ==========
// ***************************************************************************************
// ========== Detail ==========

/**
 * This maybe no need for the project.
 */
export class StandardResponseModel<T> {
    data: T;
}

export interface DetailInterface {

}

// ========== Detail ==========
// ***************************************************************************************
