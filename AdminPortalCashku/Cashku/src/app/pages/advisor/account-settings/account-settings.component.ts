import { AccountSettingsComponent as AdvisorAccountSettingsComponent } from 'src/app/pages/admin/account-settings/account-settings.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-account-settings',
    templateUrl: '../../admin/account-settings/account-settings.component.html',
    styleUrls: ['../../admin/account-settings/account-settings.component.scss'],
    standalone: false
})
export class AccountSettingsComponent extends AdvisorAccountSettingsComponent {


}
