import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerPlan, CustomerRegisteredAs, CustomerRegistrationStatus } from 'src/app/core/constants/customer.constants';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-user-top-profile-new',
    templateUrl: './user-top-profile-new.component.html',
    styleUrls: ['./user-top-profile-new.component.scss'],
    standalone: false
})
export class UserTopProfileNewComponent implements OnInit {

    @Input('advisorId') advisorId: string;
    @Input('advisorName') advisor: string;
    @Input('advisoryPlan') plan: number;
    @Input('appointmentLink') appointmentLink: string;
    @Input('email') email: string;
    @Input('fullName') name: string;
    @Input('fullPhoneNumber') phoneNumber: string;
    @Input('profilePic') userProfilePicture: string;
    @Input('registrationStatus') status: number;
    @Input('registeredAs') registeredAs: number = 0;
    @Input('registerStep') registerStep = 0;
    @Input('wrapFeePerAnnum') wrapFeePerAnnum: number;
    @Input('isCustomer') isCustomer: boolean = true;

    @Output() isUpdateAdvisorClicked = new EventEmitter<boolean>();

    showCopyTooltip = false;
    statusOptions = CustomerPlan;
    RegisterStatus = CustomerRegistrationStatus;
    CustomerRegisteredAs = CustomerRegisteredAs;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected popupService: PopupService,
    ) { }

    ngOnInit(): void {}

    updateAdvisor(): void {
        this.isUpdateAdvisorClicked.emit(true);
    }

    copyFunction() {
        navigator.clipboard.writeText(this.appointmentLink);
        this.showCopyTooltip = true;

        setTimeout(() => {
            this.showCopyTooltip = false;
        }, 1500);
    }

    getCustomerRegistration(): Record<string, string> {
        let image = '/assets/images/icon_unregistered@2x.png';
        let label = 'Unregistered';
        let textColor = 'text-unregister';

        switch (this.registerStep) {
            case CustomerRegistrationStatus.Suspended:
                label = 'Suspended';
                break;
            case CustomerRegistrationStatus.Deactivated:
                label = 'Deactivated';
                break;
            default:
                if (this.registeredAs !== CustomerRegisteredAs.None) {
                    image = '/assets/images/icon_registered@2x.png';
                    label = 'Registered';
                    textColor = 'text-register';
                }
                break;
        }

        return { image, label, textColor };
    }
}
