import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../shared/directive/click-outside.directive';

import { NavbarComponent } from './navbar/navbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ClickOutsideDirective,
        NavbarComponent,
        SideMenuComponent,
    ],
  declarations: [

  ],
  exports: [
    NavbarComponent,
    SideMenuComponent,
  ]
})
export class ComponentsModule { }
