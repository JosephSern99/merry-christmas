import { Component } from '@angular/core';
import { CustomerDetailComponent as AdminCustomerDetailComponent } from 'src/app/pages/admin/customer/customer-detail/customer-detail.component';
import { CustomerDetailModel } from 'src/app/core/models/customer/customer.model';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';

@Component({
    selector: 'app-customer-detail',
    templateUrl: '../../../admin/customer/customer-detail/customer-detail.component.html',
    styleUrls: ['../../../admin/customer/customer-detail/customer-detail.component.scss'],
    standalone: false
})

export class CustomerDetailComponent extends AdminCustomerDetailComponent {

    detail: CustomerDetailModel;
    DetailSubTab = DetailSubTab;
    selectedTab: DetailSubTab;
    readonly templateForRole: string = 'advisor';
}
