export class PagedResult<T> {
    total: number;
    data: Array<T>;

    constructor(data: Array<T>, total: number) {
        this.data = data;
        this.total = total;
    }
}
