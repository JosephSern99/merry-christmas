export class ProfileModel {
    calendlyLink: string;
    countryCode: number;
    email: string;
    fullName: string;
    phoneNumber: string;
    roles: string;
}

export class EditProfileModel {
    calendlyLink: string;
    countryCode: number;
    email: string;
    fullName: string;
    phoneNumber: string;
}

export class Countries {
    id: number;
    name: string;
}

export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
}
