import { Component, Input } from '@angular/core';
import { UiBreadcrumb } from 'src/app/pages/admin/listing-popup/helpers/listing-popup-breadcrumb/listing-popup-breadcrumb.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'app-planner-note-breadcrumb',
    templateUrl: './planner-note-breadcrumb.component.html',
    styleUrls: ['../../../admin/listing-popup/helpers/listing-popup-breadcrumb/listing-popup-breadcrumb.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
})
export class PlannerNoteBreadcrumbComponent {
    @Input() uiBreadcrumbs: any[] = [];
}
