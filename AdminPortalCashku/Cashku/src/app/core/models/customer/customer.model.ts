import { GenderOptions, RaceOptions } from 'src/app/core/constants/basic-info.constants';
import { CustomerRegistrationStatus } from 'src/app/core/constants/customer.constants';
import { PortfolioType } from 'src/app/core/constants/portfolio-management.constants';
import { CountryCode } from 'src/app/core/constants/user.constants';
import { TransactionDisplayType, TransactionStatus } from 'src/app/core/constants/withdrawal.constant';
import { Portfolio } from 'src/app/core/models/portfolio-management/portfolio-management.models';
import { DetailInterface, ListingDataInterface, ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';

export class CustomerListModel implements ListingDataInterface {
    advisorId: string;
    advisorName: string;
    createdAt: string;
    email: string;
    fullname: string;
    fullPhoneNumber: string;
    id: string;
    index: number;
    netWorth: string;
    registerStep: CustomerRegistrationStatus;
    uiRegisterStep: {label: string; cssClass: string;}
}

export class CustomerDetailModel extends CustomerListModel implements DetailInterface {
    advisoryPlan: number;
    annualIncome: string;
    appType: number;
    bankDetails: {
        createdDate: string;
        bankName: null; bankCreatedDate: null; bankAccountNumber: null }[];
    birthday: string;
    businessNature: string;
    businessNatureId: number;
    completedRegistrationAs: number;
    countryCode: CountryCode;
    employmentStatus: string;
    employmentStatusId: number;
    expiryDate: string;
    folioId: string;
    gender: number;
    hobbies: string[];
    identityNo: string;
    incomeId: number;
    mailingAddress: MailingAddress;
    maritalStatus: string;
    militaryPoliceId: string;
    monthlyAmountPmt: number;
    nationalityCode: string;
    nationalityId: number;
    nationalityName: string;
    netWorth: string;
    occupation: string;
    occupationId: number;
    planExpireOn: string;
    race: number;
    religion: string;
    tinDetail: TinDetail[];
    tinNumber: string;
    userId: string;
    wavpayCreatedDate: string;
    wavpayWalletId: string;
    wrapFeePerAnnum: number;
    wrapFeeStatus: number;
    easyRename_userPicture: string;
    registeredAs: number;
    riskToleranceLevel: string | string;
    isCompletedRegistration: boolean;
}

export class CustomerGoal {
    currentAge: number;
    currentAmount: number;
    goalAmount: number;
    goalName: string;
    goalType: number;
    id: number;
    index: number;
    interestAmount: number;
    monthlyAmountPmt: number; // Recommended Monthly Savings.
    monthlyExpensesRetirement: number;
    portfolioType: number // TODO: This should be enum.
    retirementAge: number;
    targetDate: string;
    totalInvestment: number;
    amountSavedUp: boolean;
}

export class CustomerGoalFunds extends CustomerGoal {
    currentTotalAmount: number;
    directDebit: DirectDebit;
    goals: Goals[];
    initialPercentage: number;
    remainingPercentage: number;
    returnsPercentage: number;
    totalGoalNav: number;
    totalInvestmentAmount: number;
}

export class Goals {
    amount: number;
    breakdownPercentage: number;
    fundName: string;
    nav: number;
    returnsPercentage: number;
    units: string;
    navDate: string;
    wrapFee: number;
    wrapFeeAmount: number;
}

export class CustomerPortfolio {
    totalNetWorth: number;
    totalPortfolioNav: number;
    portfolios: Portfolio[];
}

export class RecommendedPortfolio {
    totalNetWorth: number;
    portfolios: Portfolio[];
    totalPortfolioNav: string;
}

export class CustomerTransactionHistoryList implements ListingDataInterface {
    amount: number;
    chargesPercent: number;
    id: number;
    index: number;
    paymentMode: string;
    saleCharge: number;
    transactionAt: string;
    transactionDisplayType: TransactionDisplayType;
    transactionName: string;
    transactionStatus: typeof TransactionStatus;
    /**
     * @deprecated Use transactionDisplayType instead.
     */
    transactionType: number;
    wrapFee: number;
}

export class CustomerListingFilterModel extends ListingFilterModel {
    endorseStatus: string;
    RegisterStep: number;
}

export class CustomerFundListModel extends CustomerGoal {
    assetClass: string;
    currentAmount: number;
    fundCode: string;
    fundName: string;
    nav: string;
    navDate: string;
    profitLoss: number;
    profitLossPercentage: number;
    riskLevel: number;
    totalInvestment: number;
    uiProfitLoss: string;
    uiWithdrawable: number;
    units: number;
    wrapFee: number;
    wrapFeeAmount: number;
}

export interface CustomerInfoDropdown {
    businessNatureList: DetailInfo[];
    countries: DetailInfo[];
    employmentStatusList: DetailInfo[];
    incomeList: DetailInfo[];
    nationalities: DetailInfo[];
}

export interface DetailInfo {
    id: number;
    infoText: string;
    name?: string;
}

export interface TinDetail {
    countryId: number;
    countryName: string;
    tin: string;
}

export interface BankDetail {
    createdDate: string;
    bankAccountNumber: string;
    bankCreatedDate: string;
    bankName: string;
}

export interface MailingAddress {
    address1: string;
    address2: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
}

export interface DirectDebit {
    directDebitStatus: boolean;
    directDebitAmount: number;
    effectiveDate: string;
    expiryDate: string;
}

export interface PostSuspendCustomerSubmissionModel {
    userId: string;
    reason: string;
}
