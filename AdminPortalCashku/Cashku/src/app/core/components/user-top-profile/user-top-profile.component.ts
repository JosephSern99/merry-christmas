import { Component, OnInit, Input } from '@angular/core';
import { CustomerPlan, NewRegisterStep } from 'src/app/core/constants/customer.constants';

@Component({
    selector: 'app-user-top-profile',
    templateUrl: './user-top-profile.component.html',
    styleUrls: ['./user-top-profile.component.scss'],
    standalone: false
})
export class UserTopProfileComponent implements OnInit {

    @Input('advisorId') advisorId: string;
    @Input('advisorName') advisor: string;
    @Input('advisoryPlan') plan: number;
    @Input('email') email: string;
    @Input('expiryDate') expiryDate: string;
    @Input('fullName') name: string;
    @Input('fullPhoneNumber') phoneNumber: string;
    @Input('profilePic') userProfilePicture: string;
    @Input('registrationStatus') status: number;
    @Input('wrapFeePerAnnum') wrapFeePerAnnum: number;

    RegisterStep = NewRegisterStep;
    statusOptions = CustomerPlan;

    constructor(
    ) { }

    ngOnInit(): void {}
}
