import { BasicInfoComponent as AdminBasicInfoComponent } from 'src/app/pages/admin/customer/customer-detail/basic-info/basic-info.component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-basic-info',
    templateUrl: '../../../../admin/customer/customer-detail/basic-info/basic-info.component.html',
    styleUrls: ['../../../../admin/customer/customer-detail/basic-info/basic-info.component.scss'],
    standalone: false
})
export class BasicInfoComponent extends AdminBasicInfoComponent {}
