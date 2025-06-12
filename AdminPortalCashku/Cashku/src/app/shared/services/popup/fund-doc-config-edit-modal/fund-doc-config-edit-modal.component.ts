import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-fund-doc-config-edit-modal',
    templateUrl: './fund-doc-config-edit-modal.component.html',
    styleUrls: ['./fund-doc-config-edit-modal.component.scss'],
    standalone: false
})
export class FundDocConfigEditModalComponent implements OnInit {

    constructor(
        public activeModal: NgbActiveModal,
    ) { }

    ngOnInit(): void {}

    ok(): void {
        this.activeModal.close();
    }

    cancel(): void {
        this.activeModal.dismiss();
    }
}
