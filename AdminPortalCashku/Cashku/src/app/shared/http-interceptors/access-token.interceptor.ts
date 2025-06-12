import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpParams,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from '../../core/services/storage.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
    constructor(
        private storageService: StorageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let params = new HttpParams({ fromString: req.params.toString() });
        let headers = req.headers;

        // Skip token for sign-up requests
        if (req.url.indexOf('sign-up') !== -1) {
            return next.handle(req);
        }

        if (params.get('noToken')) {
            params = params.delete('noToken');
        } else if (params.get('refreshToken')) {
            params = params.delete('refreshToken');
            headers = headers.set('Authorization', `Bearer ${this.storageService.refreshToken}`);
        } else {
            // Add access token for all other requests
            headers = headers.set('Authorization', `Bearer ${this.storageService.accessToken}`);
        }

        // Clone the request with updated params and headers
        const modifiedReq = req.clone({
            params,
            headers
        });

        return next.handle(modifiedReq);
    }
}
