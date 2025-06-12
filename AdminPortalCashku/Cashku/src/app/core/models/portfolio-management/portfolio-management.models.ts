import { DetailInterface, ListingDataInterface } from "src/app/pages/admin/listing-popup/base-listing.model";

export class PortfolioManagementListModel implements ListingDataInterface {
    averageReturnPercentage: number;
    funds: PortfolioFund[]
    highestReturnPercentage: number;
    id: number;
    index: number;
    lowestReturnPercentage: number;
    portfolioType: number;
}

export class PortfolioFund {
    allocatePercentage: number;
    deleteFunds: DeleteFunds[];
    fundAttributes: string;
    fundId: number;
    fundName: string;
    fundOption: string;
    id: number;
    scheme: string;
}

export class DeleteFunds {
    fundId: number;
    id: number;
}

export class Portfolio {
    breakdownPercentage: number;
    currentAmount: number;
    fundName: number;
    fundOption: number;
    goalName: string;
    goalType: number;
    id: number;
    investType: string;
    nav: string;
    scheme: number;
}

export class PortfolioFundCreate extends PortfolioFund {
    averageReturnPercentage: number;
    funds: PortfolioFund[];
    highestReturnPercentage: number;
    lowestReturnPercentage: number;
}

export class PortfolioFundDetail extends PortfolioManagementListModel implements DetailInterface { }
