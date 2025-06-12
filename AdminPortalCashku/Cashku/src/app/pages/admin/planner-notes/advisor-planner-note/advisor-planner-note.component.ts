import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EndorseStatusType } from 'src/app/core/constants/planner-note.constants';
import { AdvisorDetailModel } from 'src/app/core/models/advisor/advisor.model';
import { AdvisorService } from 'src/app/core/services/api/advisor.service';
import { PlannerNotesService } from 'src/app/core/services/api/planner-notes.service';
import { NoteDetailComponent } from 'src/app/pages/advisor/note/note-detail/note-detail.component';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-advisor-planner-note',
    templateUrl: '../../../advisor/note/note-detail/note-detail.component.html',
    styleUrls: ['../../../advisor/note/note-detail/note-detail.component.scss', './advisor-planner-note.component.scss'],
    standalone: false
})
export class AdvisorPlannerNoteComponent extends NoteDetailComponent {

    constructor(
        protected apiService: PlannerNotesService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected breadcrumbService: AdvisorService,
        protected popupService: PopupService,
    ) {
        super(apiService, activatedRoute, router, breadcrumbService, popupService);
    }

    getBreadcrumbs(): { path: string; title: string; }[] {
        return [
            { path: '/advisor', title: 'Advisor List' },
            { path: `../`, title: this.breadcrumbName },
            { path: '', title: 'Advisor Note Details' },
        ];
    }

    getListDetailRoute(id: string | number): any[] {
        return ['/customer/detail', id];
    }

    isEndorsedNote(): boolean {
        return this.listingDataSource.some(customer => customer.status === EndorseStatusType.Endorsed);
    }

    protected getBreadcrumbData(id: string): void {
        this.breadcrumbService.getDetail(id).subscribe(
            (success: AdvisorDetailModel) => {
                this.breadcrumbName = success.fullName;
            }
        );
    }

    protected getDeleteNoteApi(): Observable<any> {
        return this.apiService.deletePlannerNoteData(this.detail.id);
    }

}
