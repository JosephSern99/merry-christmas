import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpResponseInterceptor } from './http-response.interceptor';
import { AccessTokenInterceptor } from './access-token.interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AccessTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true },
];
