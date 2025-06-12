import { Component, Input } from '@angular/core';
import { UiBreadcrumb } from '../../listing-popup/helpers/listing-popup-breadcrumb/listing-popup-breadcrumb.component';

@Component({
    selector: 'app-data-config-breadcrumb',
    templateUrl: './data-config-breadcrumb.component.html',
    styleUrls: ['./data-config-breadcrumb.component.scss'],
    standalone: false
})
export class DataConfigBreadcrumbComponent {
    @Input() uiBreadcrumbs: UiBreadcrumb[] = [];
}
