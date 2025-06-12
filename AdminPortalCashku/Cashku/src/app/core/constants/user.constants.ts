export const UserType = {
    'superadmin' : { label : 'Admin' },
    'admin' : { label : 'Advisor' },
    'verifier' : { label : 'Verifier' },
}

export enum CountryCode {
    'Malaysia (+60)' = 0,
    'Singapore (+65)' = 1,
}

export const RegionCode = {
    0 : 'MY',
    1 : 'SG'
}

export const UPPER_LOWER_SPECIAL_ALPHANUM_MIN_6 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[\W]).{6,}$/;
