import { GetCustomerData } from './GetCustomer-data';
import { GetListsModel } from './GetList-model';

export class GetLists {

    skip: number;
    take: number;
    totalCount: number;
    pageIndex: number;
    perPage: number;
    totalPages: number;
    data: GetCustomerData[];

    constructor(
        content: GetListsModel
    ) {
        this.skip = content.skip;
        this.take = content.take;
        this.totalCount = content.totalCount;
        this.pageIndex = content.pageIndex;
        this.perPage = content.perPage;
        this.totalPages = content.totalPages;
        this.data = content.data.map(m => new GetCustomerData(m));
    }
}
