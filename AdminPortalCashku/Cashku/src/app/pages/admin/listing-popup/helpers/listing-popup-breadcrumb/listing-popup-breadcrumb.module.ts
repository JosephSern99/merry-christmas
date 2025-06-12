import { CommonModule } from '@angular/common';
import { ListingPopupBreadcrumbComponent } from './listing-popup-breadcrumb.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [

  ],
    imports: [
        CommonModule,
        RouterModule,
        ListingPopupBreadcrumbComponent,
    ],
  exports: [
    ListingPopupBreadcrumbComponent,
  ]
})
export class ListingPopupBreadcrumbModule { }
