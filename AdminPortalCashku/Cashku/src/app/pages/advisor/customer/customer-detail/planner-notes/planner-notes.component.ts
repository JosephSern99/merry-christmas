import { Component } from '@angular/core';
import { PlannerNotesComponent as AdminPlannerNotesComponents} from 'src/app/pages/admin/customer/customer-detail/planner-notes/planner-notes.component';

@Component({
    selector: 'app-planner-notes',
    templateUrl: '../../../../admin/customer/customer-detail/planner-notes/planner-notes.component.html',
    styleUrls: ['../../../../admin/customer/customer-detail/planner-notes/planner-notes.component.scss'],
    standalone: false
})
export class PlannerNotesComponent extends AdminPlannerNotesComponents {
    readonly templateForRole: string = 'advisor';
}
