import { ActivatedRoute, Router } from '@angular/router';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { Component } from '@angular/core';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { finalize } from 'rxjs/operators';
import { UntypedFormBuilder } from '@angular/forms';
import { InternalNotesService } from 'src/app/core/services/api/internal-notes.service';
import { Location } from '@angular/common';
import { PlannerNoteCreate } from 'src/app/core/models/planner-note/planner-note.model';
import { PlannerNoteCreateComponent } from 'src/app/pages/advisor/planner-notes/planner-note-create/planner-note-create.component';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
    selector: 'app-internal-note-create',
    templateUrl: './internal-note-create.component.html',
    styleUrls: ['./internal-note-create.component.scss'],
    standalone: false
})
export class InternalNoteCreateComponent extends PlannerNoteCreateComponent {

    readonly noteType: string = 'Internal'
    constructor(
        protected apiService: InternalNotesService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected formBuilder: UntypedFormBuilder,
        protected popupService: PopupService,
        protected location: Location,
        protected blockUIService: BlockUiService,
        protected customerService: CustomerService,
        protected storageService: StorageService
    ) {
        super(apiService, activatedRoute, router, formBuilder, popupService, location, blockUIService, customerService, storageService);
    }

    protected handleDataSubmission(data: PlannerNoteCreate, popupMessage: string): void {
        const observable = this.isAddOperation
            ? this.apiService.createInternalNotes(data)
            : this.apiService.updateInternalNotes(data, this.id);

        observable.pipe(finalize(() => this.blockUIService.close()))
            .subscribe(data => {
                this.isChangesSaved = true;
                this.popupService.alert(popupMessage)
                    .then(() => {
                        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
                        this.isRefresh = true;
                    });
            })
    }

    getBreadcrumbs(): { path: string, title: string }[] {
        let editBreadcrumbTitle = '';

        if (this.customerName) {
            editBreadcrumbTitle = `${this.customerName} (Internal Note)`;
        }
        return [
            { path: '/advisor-customer', title: 'Client List' },
            {
                path: `/advisor-customer/detail/${this.customerID}/internal-notes/${this.id}`,
                title: editBreadcrumbTitle
            },
            { path: '', title: 'Edit Internal Note' },
        ];
    }
}
