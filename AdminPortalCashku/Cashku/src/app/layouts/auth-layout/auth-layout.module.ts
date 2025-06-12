import { AuthLayoutComponent } from './auth-layout.component';
import { AuthLayoutRoutingModule } from 'src/app/layouts/auth-layout/auth-layout.routing';
import { CommonModule } from '@angular/common';
import { ForgotPasswordPopup } from 'src/app/pages/auth/login/forgot-password-popup/forgot-password-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { NgModule } from '@angular/core';
import { PaymentSuccessDetailComponent } from 'src/app/pages/payment-success-detail/payment-success-detail.component';
import { ReleaseNoteComponent } from 'src/app/pages/auth/release-note/release-note.component';
import { ResetPasswordComponent } from 'src/app/pages/reset-password/reset-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SuccessComponent } from 'src/app/pages/success/success.component';
import {PopupService} from '../../shared/services/popup/popup.service';

@NgModule({
    declarations: [
        AuthLayoutComponent,
        ForgotPasswordPopup,
        LoginComponent,
        PaymentSuccessDetailComponent,
        ReleaseNoteComponent,
        ResetPasswordComponent,
        SuccessComponent,
    ],
    imports: [
        AuthLayoutRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    providers: [
        PopupService, // Add PopupService here
        // ... other providers
    ]
})
export class AuthLayoutModule { }
