export enum TransactionStatus {
    'All' = 0,
    'Pending' = 1,
    'In Progress' = 2,
    'Completed' = 3,
    'Rejected' = 4,
    'Failed' = 5
};

export enum VerificationStatus {
    'All' = 0,
    'Pending' = 1,
    'Completed' = 2,
    'Rejected' = 3,
};

/**
 * @deprecated Use TransactionDisplayType instead.
 */
export enum TransactionType {
    'Withdrawal' = 1,
    'Deposit' = 2,
    'Remove Goal Withdrawal' = 3,
    'Terminal Direct Debit' = 4,
    'Maintenance Direct Debit' = 5,
    'Enable Direct Debit' = 6,
    'Direct Debit' = 7,
};

export enum WithdrawAction {
    Approve = 1,
    Reject = 2
}

/**
 * Decrement is red up arrow.
 * Increment is green down arrow.
 */
export enum TransactionDisplayType {
    Decrement = 1,
    Increment = 2,
}

export const RedemptionType = {
    1: 'Reached My Goal Target ',
    2: 'Worried About The Market',
    3: 'Collecting Dividends Or Securing Earnings',
    4: 'Not Satisfied Returns',
    5: 'Other',
}

/**
 * @deprecated Unused constant detected.
 */
export const TRANSACTION_TYPE = {
    [TransactionType['Deposit']]: {cssClass: 'green-arrow', label: 'Deposit'},
    [TransactionType['Direct Debit']]: {cssClass: 'green-arrow', label: 'Direct Debit'},
    [TransactionType['Enable Direct Debit']]: {cssClass: 'green-arrow', label: 'Enrol'},
    [TransactionType['Maintenance Direct Debit']]: {cssClass: 'green-arrow', label: 'Direct Debit Maintenance'},
    [TransactionType['Remove Goal Withdrawal']]: {cssClass: 'red-arrow', label: 'Remove Goal Withdrawal'},
    [TransactionType['Terminal Direct Debit']]: {cssClass: 'green-arrow', label: 'Direct Debit Termination'},
    [TransactionType['Withdrawal']]: {cssClass: 'red-arrow', label: 'Withdrawal'},
}
