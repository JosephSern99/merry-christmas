import { Component } from '@angular/core';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';
import { CustomerGoal, DirectDebit } from 'src/app/core/models/customer/customer.model';
import { GoalSubPage } from 'src/app/pages/admin/customer/customer-detail/goals/goal.interface';

@Component({
    selector: 'app-direct-debit',
    templateUrl: './direct-debit.component.html',
    styleUrls: ['./direct-debit.component.scss'],
    standalone: false
})
export class DirectDebitComponent implements GoalSubPage {
    details: DirectDebit;

    setCustomerID(id: string): void {}
    setCustomerGoal(goal: CustomerGoal): void {}

    getSubTab(): DetailSubTab {
        return DetailSubTab.DirectDebit;
    }

    getDirectDebitStatus() {
        let label = 'Inactive';
        let cssClass = 'inactive';

        if (this.details.directDebitStatus) {
            label = 'Active';
            cssClass = 'active';
        }

        return { label, cssClass };
    }
}
