export class Pagination {
    total: number;
    pageSize: number;
    currentPage: number;
    loading: boolean;
    sortColumn: any;
    sortDirection: "asc" | "desc" | null;

    constructor(options?: Pagination) {
        this.total = options && options.total ? options.total : 0;
        this.pageSize = options && options.pageSize ? options.pageSize : 30;
        this.currentPage = options && options.currentPage ? options.currentPage : 1;
        this.loading = options && options.loading ? options.loading : true;
        this.sortColumn = options ? options.sortColumn : null;
        this.sortDirection = options ? options.sortDirection : null;
    }
}
