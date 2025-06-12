import { Component } from '@angular/core';
import { InternalNotesComponent as AdminInternalNotesComponents} from 'src/app/pages/admin/customer/customer-detail/internal-notes/internal-notes.component';

@Component({
    selector: 'app-internal-notes',
    templateUrl: '../../../../admin/customer/customer-detail/internal-notes/internal-notes.component.html',
    styleUrls: ['../../../../admin/customer/customer-detail/internal-notes/internal-notes.component.scss'],
    standalone: false
})
export class InternalNotesComponent extends AdminInternalNotesComponents {
    readonly templateForRole: string = 'advisor';

}
