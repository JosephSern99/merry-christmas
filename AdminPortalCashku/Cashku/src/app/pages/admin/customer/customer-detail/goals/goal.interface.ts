import { BaseSubTabPageInterface } from 'src/app/pages/admin/listing-popup/base-listing-popup-page.interface';
import { CustomerGoal } from 'src/app/core/models/customer/customer.model';

export interface GoalSubPage extends BaseSubTabPageInterface {
    setCustomerID(id: string): void;
    setCustomerGoal(goal: CustomerGoal): void;
}
