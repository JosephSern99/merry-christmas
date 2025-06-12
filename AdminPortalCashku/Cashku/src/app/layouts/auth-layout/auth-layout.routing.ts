import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { NgModule } from '@angular/core';
import { PaymentSuccessDetailComponent } from 'src/app/pages/payment-success-detail/payment-success-detail.component';
import { ReleaseNoteComponent } from 'src/app/pages/auth/release-note/release-note.component';
import { ResetPasswordComponent } from 'src/app/pages/reset-password/reset-password.component';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from 'src/app/pages/success/success.component';

/**
 * Define route of auth layout here.
 */
const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full', title: 'Login' },

    { path: 'login', component: LoginComponent, title: 'Login' },

    { path: 'release-note', component: ReleaseNoteComponent , title: 'Release Note' },

    { path: 'reset-password/:email/:token', component: ResetPasswordComponent, data: { title: 'Reset Password' }, title: 'Reset Password' },

    // For common user
    { path: 'sign-up', component: SuccessComponent, title: 'Sign Up Success' },
    { path: 'sign-up/:email', component: SuccessComponent, title: 'Sign Up Success Email' },
    { path: 'sign-up/:email/:token', component: SuccessComponent, title: 'Sign Up Success Token' },

    { path: 'receipt/:orderno/:token', component: PaymentSuccessDetailComponent, title: 'Payment Success' },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AuthLayoutRoutingModule { }
