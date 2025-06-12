import { CommonModule } from '@angular/common';
import { PlannerNoteBreadcrumbComponent } from './planner-note-breadcrumb.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        RouterModule,
        PlannerNoteBreadcrumbComponent,
    ],
    exports: [
        PlannerNoteBreadcrumbComponent,
    ]
})
export class PlannerNoteBreadcrumbModule { }
