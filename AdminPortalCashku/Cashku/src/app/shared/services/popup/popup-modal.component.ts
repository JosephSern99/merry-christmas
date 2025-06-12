import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PopupType } from './popup-type.enum';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'agmo-popup-modal',
    templateUrl: './popup-modal.component.html',
    styleUrls: ['./popup-modal.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class PopupModalComponent {
 confirmationTitle: string = '';
  PopupType: typeof PopupType = PopupType;
  type?: PopupType;
  message: string = "";
  okLabel: string = "";
  cancelLabel: string = "";
  okClass: string = "";
  cancelClass: string = "";

  constructor(public activeModal: NgbActiveModal) { }

  ok(): void {
    this.activeModal.close();
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
