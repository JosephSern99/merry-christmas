import { GetCustomerDataModel } from './GetCustomer-data-model';

export class GetListsModel {
    skip!: number;
    take!: number;
    totalCount!: number;
    pageIndex!: number;
    perPage!: number;
    totalPages!: number;
    data!: GetCustomerDataModel[];
}
