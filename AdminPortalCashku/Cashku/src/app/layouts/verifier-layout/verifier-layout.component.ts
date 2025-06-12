import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-verifier-layout',
    templateUrl: '../admin-layout/admin-layout.component.html',
    styleUrls: ['../admin-layout/admin-layout.component.scss'],
    standalone: false
})
export class VerifierLayoutComponent extends AdminLayoutComponent { }
