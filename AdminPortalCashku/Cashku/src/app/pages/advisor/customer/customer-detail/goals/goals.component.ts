import { Component } from '@angular/core';
import { GoalsComponent as AdminGoalsComponent } from 'src/app/pages/admin/customer/customer-detail/goals/goals.component';

@Component({
    selector: 'app-goals',
    templateUrl: '../../../../admin/customer/customer-detail/goals/goals.component.html',
    styleUrls: ['../../../../admin/customer/customer-detail/goals/goals.component.scss'],
    standalone: false
})
export class GoalsComponent extends AdminGoalsComponent {} 
