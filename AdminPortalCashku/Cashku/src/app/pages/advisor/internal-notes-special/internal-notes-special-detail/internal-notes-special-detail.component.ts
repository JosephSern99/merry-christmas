import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EndorseStatusType } from 'src/app/core/constants/planner-note.constants';
import { CustomerDetailModel } from 'src/app/core/models/customer/customer.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { InternalNotesService } from 'src/app/core/services/api/internal-notes.service';
import { NoteDetailComponent } from 'src/app/pages/advisor/note/note-detail/note-detail.component';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-internal-notes-special-detail',
    templateUrl: '../../../advisor/note/note-detail/note-detail.component.html',
    styleUrls: ['../../../advisor/note/note-detail/note-detail.component.scss', './internal-notes-special-detail.component.scss'],
    standalone: false
})
export class InternalNotesSpecialDetailComponent extends NoteDetailComponent {

    displayedColumns: string[] = ['index', 'fullname', 'email', 'fullPhoneNumber'];

    constructor(
        protected apiService: InternalNotesService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected breadcrumbService: CustomerService,
        protected popupService: PopupService,
    ) {
        super(apiService, activatedRoute, router, breadcrumbService, popupService);
    }

    getBreadcrumbs(): { path: string; title: string; }[] {
        return [
            { path: '/advisor-customer', title: 'Client List' },
            { path: `../`, title: this.breadcrumbName },
            { path: '', title: 'Internal Note Details' },
        ];
    }

    getListDetailRoute(id: string | number): any[] {
        return ['/advisor-customer/detail', id];
    }

    isEndorsedNote(): boolean {
        return this.listingDataSource.some(customer => customer.status === EndorseStatusType.Endorsed);
    }

    protected getBreadcrumbData(id: string): void {
        this.breadcrumbService.getDetail(id).subscribe(
            (success: CustomerDetailModel) => {
                this.breadcrumbName = success.fullname;
            }
        );
    }

    protected getDeleteNoteApi(): Observable<any> {
        return this.apiService.deletePlannerNoteData(this.detail.id);
    }

}
