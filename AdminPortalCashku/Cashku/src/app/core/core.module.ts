import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserTopProfileComponent } from 'src/app/core/components/user-top-profile/user-top-profile.component';
import { UserTopProfileNewComponent } from 'src/app/core/user-top-profile-new/user-top-profile-new.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        UserTopProfileComponent,
        UserTopProfileNewComponent,
    ],
  imports: [
    CommonModule,
    RouterModule,
  ],
    exports: [
        UserTopProfileComponent,
        UserTopProfileNewComponent,
    ],
})
export class CoreModule { }
