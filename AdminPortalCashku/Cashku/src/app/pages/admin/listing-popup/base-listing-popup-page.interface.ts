import { DetailSubTab } from 'src/app/core/constants/detail.constants';

export interface BaseListingPopupPageInterface {
    isRefreshRequired(): boolean;
}

export interface BaseParentTabPageInterface {
    onRouterOutletActivate(subTab: BaseSubTabPageInterface);
}

export interface BaseSubTabPageInterface {
    getSubTab(): DetailSubTab;
}

export interface AdvisorAssignCustomerTabInterface {
    getListing(): void;
}
