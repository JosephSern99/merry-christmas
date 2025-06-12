import { AcceptLanguageInterceptor } from 'src/app/shared/http-interceptors/accept-language.interceptor';
import { AccessTokenInterceptor } from 'src/app/shared/http-interceptors/access-token.interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from 'src/app/core/services/guard/auth-guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpResponseInterceptor } from 'src/app/shared/http-interceptors/http-response.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatSelectModule,
        MatTooltipModule,
        NgbModule,
        ReactiveFormsModule,
        SharedModule
        , HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AccessTokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AcceptLanguageInterceptor, multi: true },
        AuthGuard,
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
export class AppModule { }
