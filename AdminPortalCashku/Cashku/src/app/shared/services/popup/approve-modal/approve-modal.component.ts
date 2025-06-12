import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'approve-popup-modal',
    templateUrl: './approve-modal.component.html',
    styleUrls: ['./approve-modal.component.scss'],
    standalone: false
})
export class ApproveModalComponent {
    message: string = '';

    constructor(public activeModal: NgbActiveModal) {}

    ok(): void {
        this.activeModal.close();
    }

    cancel(): void {
        this.activeModal.dismiss();
    }
}
