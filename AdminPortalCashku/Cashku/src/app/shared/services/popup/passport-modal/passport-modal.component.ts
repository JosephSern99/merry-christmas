import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PassportImageModel } from 'src/app/core/models/passport-verification/passport-verification.model';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-detail-modal',
    templateUrl: './passport-modal.component.html',
    styleUrls: ['./passport-modal.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class PassportModalComponent implements OnInit {
    utilityBillImageUrl: string = '';
    submittedDate: string = '';
    image: PassportImageModel;

    constructor(
        public activeModal: NgbActiveModal,
    ) { }

    ngOnInit(): void {}

}
