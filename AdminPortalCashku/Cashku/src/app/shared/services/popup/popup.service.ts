import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApproveModalComponent } from 'src/app/shared/services/popup/approve-modal/approve-modal.component';
import { AssignAdvisorModalComponent } from 'src/app/shared/services/popup/assign-advisor-modal/assign-advisor-modal.component';
import { PassportModalComponent } from 'src/app/shared/services/popup/passport-modal/passport-modal.component';
import { PopupModalComponent } from 'src/app/shared/services/popup/popup-modal.component';
import { PopupOptions } from 'src/app/shared/services/popup/popup-options';
import { PopupType } from 'src/app/shared/services/popup/popup-type.enum';
import { ResetPasswordModalComponent } from 'src/app/shared/services/popup/reset-password-modal/reset-password-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdvisorUpdateModalComponent } from './advisor-update-modal/advisor-update-modal.component';
import { FundDocConfigEditModalComponent } from './fund-doc-config-edit-modal/fund-doc-config-edit-modal.component';
import { SuspendCustomerModalComponent } from './suspend-customer-modal/suspend-customer-modal.component';

@Injectable({
  providedIn: SharedModule,
})
export class PopupService {
  defaultOptions: any = {
    size: 'sm',
    backdrop: 'static',
    centered: true,
    keyboard: false,
    windowClass: 'modal-popup',
    backdropClass: 'backdrop-popup',
  }
  bigModalOptions: any = {
    size: 'lg',
    backdrop: 'static',
    centered: true,
    keyboard: false,
    windowClass: 'modal-popup',
    backdropClass: 'backdrop-popup',
  }

  constructor(private modalService: NgbModal) { }

  alert(message: string, options?: PopupOptions): Promise<any> {
    return this.open(message, PopupType.alert, options);
  }

  showPassportImage(utilityBillImageUrl:string, submittedDate: string) {
    const modalRef = this.modalService.open(PassportModalComponent, {...this.bigModalOptions, windowClass: 'passport-popup'});
    modalRef.componentInstance.utilityBillImageUrl = utilityBillImageUrl;
    modalRef.componentInstance.submittedDate = submittedDate;
    return modalRef.result;
  }

  fundNameChangeAlert(): Promise<any> {
    const modelRef = this.modalService.open(FundDocConfigEditModalComponent, {...this.bigModalOptions, windowClass: 'fund-doc-config-edit-popup'});
    return modelRef.result;
  }

  updateCustomerAdvisor(custId: string) {
    const modelRef = this.modalService.open(AdvisorUpdateModalComponent, { ...this.bigModalOptions, size: 'container-xl', windowClass: 'advisor-update-popup'});
    modelRef.componentInstance.custId = custId;
    return modelRef.result;
  }

  confirm(message: string, options?: PopupOptions): Promise<any> {
    return this.open(message, PopupType.confirm, options);
  }

  approve(message: string): Promise<any> {
    const modalRef = this.modalService.open(ApproveModalComponent, {...this.defaultOptions, windowClass: 'approve-popup'});
    modalRef.componentInstance.message = message;
    return modalRef.result;
  }

  resetPassword(email: string): Promise<any> {
    const modalRef = this.modalService.open(ResetPasswordModalComponent, {...this.defaultOptions, size: 'container-md' });
    modalRef.componentInstance.email = email;
    return modalRef.result;
  }

  assignAdvisor(advisorId: string): Promise<any> {
    const modalRef = this.modalService.open(AssignAdvisorModalComponent, { ...this.defaultOptions, size: 'container-xl' });
    modalRef.componentInstance.advisorId = advisorId;
    return modalRef.result;
  }

  suspendCustomer(custId: string, isSuspending = true): Promise<any> {
    const containerCSS = isSuspending ? 'container-xl' : 'container-md';
    const modalRef = this.modalService.open(SuspendCustomerModalComponent, { ...this.defaultOptions, size: containerCSS });
    modalRef.componentInstance.id = custId;
    modalRef.componentInstance.isSuspending = isSuspending;
    return modalRef.result;
  }

  private open(message: string, popupType: PopupType, options?: PopupOptions): Promise<any> {
    const modalRef = this.modalService.open(PopupModalComponent, this.defaultOptions);
    modalRef.componentInstance.type = popupType;
    modalRef.componentInstance.message = message;

    if (options) {
      modalRef.componentInstance.okLabel = options.okLabel;
      modalRef.componentInstance.cancelLabel = options.cancelLabel;
      modalRef.componentInstance.okClass = options.okClass;
      modalRef.componentInstance.cancelClass = options.cancelClass;
      modalRef.componentInstance.confirmationTitle = options.confirmationTitle;
    }

    return modalRef.result;
  }
}
