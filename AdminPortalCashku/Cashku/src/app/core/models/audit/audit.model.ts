import { DetailInterface, ListingDataInterface, ListingFilterModel } from "src/app/pages/admin/listing-popup/base-listing.model";

export class AuditListModel implements ListingDataInterface {
    actionType: number;
    createdAt: string;
    email: string;
    id: number;
    index: number;
    ipAddress: string;
    moduleType: number;
    fullname: string;
}

export class AuditDetailModel extends AuditListModel implements DetailInterface {
    changes: AuditChangesInterface[]
    deviceModel: string;
    deviceType: string;
    moduleId: number;
    osVersion: number;
    userId: string;
    name: string;
}

export class AuditListFilterModel extends ListingFilterModel {
    CreatedAtFrom: string;
    CreatedAtTo: string;
    ModuleType: number;
    keywords: any;
    keywordsField: string;
}

export interface AuditChangesInterface {
    currentValue: string;
    id: string;
    propertyName: string;
    previousValue: string;
    uiPropertyName: string;
}
