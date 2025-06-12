export enum PassportVerificationStatus {
    None = 0,
    Pending = 1,
    Approved = 2,
    Rejected = 3,
}

export enum ApprovalAction {
    Approve = 2,
    Reject = 3,
}

export const PASSPORT_VERIFICATION_STATUS = {
    0: 'All',
    1: 'Pending',
    2: 'Approved',
    3: 'Rejected',
}
