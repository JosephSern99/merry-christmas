import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { RecurringPaymentService } from 'src/app/core/services/api/recurring-payment.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Component({
    selector: 'app-upload-document',
    templateUrl: './upload-document.component.html',
    styleUrls: ['./upload-document.component.scss'],
    standalone: false
})
export class UploadDocumentComponent implements OnInit {

    form: UntypedFormGroup;
    showFormError = false;
    dragAreaClass: string;
    onFileChange(event: any) {
        let files: FileList = event.target.files;
        this.saveFiles(files);
    }
    fileName: string;
    fileDetail: FileList;
    error: string;

    constructor(
        protected router: Router,
        private fb: UntypedFormBuilder,
        private route: ActivatedRoute,
        private activeModal: NgbActiveModal,
        private popUp: PopupService,
        private apiService: RecurringPaymentService,
        private loaderService: LoaderService,
    ) { }

    ngOnInit(): void {
        // this.form = this.fb.group({
        //     file: ['', Validators],
        // });
    }

    @HostListener("dragover", ["$event"]) onDragOver(event: any) {
        this.dragAreaClass = "droparea";
        event.preventDefault();
    }

    @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
        this.dragAreaClass = "droparea";
        event.preventDefault();
    }

    @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    }

    @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    }

    @HostListener("drop", ["$event"]) onDrop(event: any) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files) {
            let files: FileList = event.dataTransfer.files;
            this.saveFiles(files);
        }
    }

    submit(){

        if (!this.fileDetail) {
            this.popUp.alert("Please select your document file for upload");
            return
        }

        this.loaderService.open();
        this.apiService.uploadAutoDebit(this.fileDetail).subscribe(
            () => {
                this.popUp.alert("Successfully upload document file").then(() => {
                    this.cancel();
                });
            },
            (error: any) => {
                if (error.error.message[0]) {
                    this.popUp.alert(error.error.message[0]);
                }
                else {
                    this.popUp.alert("Please contact administrator");
                }
            }
        ).add(() => {  this.loaderService.close(); });
    }

    cancel(): void {
        this.activeModal.dismiss();
    }

    private saveFiles(files: FileList) {
        if (files.length > 1) this.error = "Only one file at time allow";
        else {
          this.error = "";
          this.fileName = files[0].name;
          this.fileDetail = files;
        }
      }
}
