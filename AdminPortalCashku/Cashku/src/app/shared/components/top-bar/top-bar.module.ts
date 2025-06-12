import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from 'src/app/shared/components/top-bar/top-bar.component';

@NgModule({
    declarations: [
        TopBarComponent,
    ],
    imports: [
        CommonModule,
        MatMenuModule,
        MatToolbarModule,
        RouterModule,
    ],
    exports: [
        TopBarComponent,
    ]
})
export class TopBarModule {
    // Due to limitation, we need to import MatMenuModule in src/app/app.module.ts.
}
