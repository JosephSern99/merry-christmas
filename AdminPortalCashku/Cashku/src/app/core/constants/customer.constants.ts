export enum CustomerRegistrationStatus {
    'All' = 0,
    'Pending (Verify Account)' = 1,
    'Pending (Risk Tolerance)' = 2,
    'Registration Completed' = 3,
    'Goals Created, Pending Payment' = 4,
    'Invested' = 5,
    'Pending Risk Tolerance (Invested)' = 6,
    'Suspended' = 7,
    'Deactivated' = 8,
}

export const OrderedCustomerRegistrationStatus = [
    CustomerRegistrationStatus[0],
    CustomerRegistrationStatus[1],
    CustomerRegistrationStatus[2],
    CustomerRegistrationStatus[6],
    CustomerRegistrationStatus[3],
    CustomerRegistrationStatus[4],
    CustomerRegistrationStatus[5],
    CustomerRegistrationStatus[7],
    CustomerRegistrationStatus[8],
];

export enum ReferralSignUpStatus {
    'All' = 0,
    'Installed' = 1,
    'Registered' = 2,
}

export enum ReferralSourceType {
    'All' = 0,
    'Cashku' = 1,
    'MMA' = 2,
    'KT' = 3,
}

export const CustomerPlan = {
    0: 'Incomplete Registration',
    1: 'Basic Plan (Non Advisory)',
    2: 'Pro plan (Financial Advisory)',
};

export enum CustomerRegisteredAs {
    'None' = 0,
    'Cashku Invest' = 1,
    'Cashku Save' = 2,
    'Financial Literacy' = 3,
    'PRS' = 4
}

export const AppType = {
    0: '-',
    1: 'Cashku',
    2: 'MMA',
    3: 'KT',
    4: 'Offline',
};

/** @deprecated Please change to use newRegisterStep */
export const RegisterStep = {
    0: 'All',
    1: 'Pending (Set Up Investment Acc)',
    2: 'Pending (Risk Tolerance)',
    3: 'Pending (Create First Goal)',
    4: 'Pending (Set Up Direct Debit)',
    5: 'Pending (Sign Engagement)',
    6: 'Completed',
};

export const NewRegisterStep = {
    0: {label: 'N/A', cssClass: 'pending'},
    1: {label: 'Pending (Verify Account)', cssClass: 'pending'},
    2: {label: 'Pending (Risk Tolerance)', cssClass: 'pending'},
    3: {label: 'Registration Completed', cssClass: 'pending'},
    4: {label: 'Goals Created, Pending Payment', cssClass: 'pending'},
    5: {label: 'Invested', cssClass: 'completed'},
    6: {label: 'Pending Risk Tolerance (Invested)', cssClass: 'pending'},
    7: {label: 'Suspended', cssClass: 'pending'},
    8: {label: 'Deactivated', cssClass: 'pending'},
}

export const HasSignedUp = {
    0: {label: 'N/A', cssClass: 'pending'},
    1: {label: 'Installed', cssClass: 'pending'},
    2: {label: 'Registered', cssClass: 'completed'},
}

/**
 * @deprecated Please change to use GoalTypeEnum.
 */
export const GoalType = {
    1: 'Retirement',
    2: 'Home Ownership',
    3: 'Children Education',
    4: 'Other'
};

