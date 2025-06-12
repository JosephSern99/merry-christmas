import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {LoadingComponent} from '../../components/loading/loading.component';

@Component({
    selector: 'agmo-block-ui-modal',
    templateUrl: './block-ui-modal.component.html',
    styleUrls: ['./block-ui-modal.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        LoadingComponent
    ]
})
export class BlockUiModalComponent {
    block = false;
    show = false;
}
