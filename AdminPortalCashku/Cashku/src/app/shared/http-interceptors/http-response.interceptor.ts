import { AccountService } from 'src/app/core/services/account.service';
import { catchError, map, filter, switchMap, finalize, take } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { PagedResult } from '../models/paged-result/paged-result';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Injectable()

export class HttpResponseInterceptor implements HttpInterceptor {
    refreshTokenInProgress = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );

    constructor(
        private router: Router,
        private accountService: AccountService,
        private route: ActivatedRoute,
        private storageService: StorageService,
        private popupService: PopupService
    ) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.indexOf('Users/verifyEmail') != -1) {
            return next.handle(req);
        }

        return next.handle(req).pipe(
            map(event => {
                if (event instanceof HttpResponse) {

                    if (event.body.result) {
                        return event.clone({
                            body: event.body.result
                        });
                    }

                    return event;
                }

                return event;
            }),

            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    let path = "";

                    if (this.route && this.route.snapshot && this.route.snapshot.firstChild) {
                        path = this.route.snapshot.firstChild.url.map(urlSegment => urlSegment.path).join('/');
                    }

                    if (err.status === 401) {
                        //this.storageService.clear();
                        // this.router.navigate(['login']);

                        if (req.url.includes("refresh")) {
                            this.storageService.clear();
                        } else {
                            if (this.refreshTokenInProgress) {
                                return this.refreshTokenSubject.pipe(
                                    filter(result => result !== null),
                                    take(1),
                                    switchMap(() => next.handle(this.addAuthenticationToken(req)))
                                )
                            } else {
                                this.refreshTokenInProgress = true;

                                this.refreshTokenSubject.next(null);
                                return this.accountService.refreshToken()
                                    .pipe(
                                        switchMap(
                                            (data: any) => {
                                                //this.storageService.accessToken = data.auth_token;
                                                //this.storageService.refreshToken = data.refresh_token;
                                                //this.refreshTokenSubject.next(data.refresh_token);
                                                this.storageService.accessToken = data.accessToken;
                                                this.storageService.refreshToken = data.refreshToken;
                                                this.refreshTokenSubject.next(data.refreshToken);
                                                return next.handle(this.addAuthenticationToken(req)).pipe(
                                                    map(event => {
                                                        if (event instanceof HttpResponse) {
                                                            //if (event.headers.get("x-total-records")) {
                                                            //  return event.clone({
                                                            //    body: new PagedResult(event.body, parseInt(event.headers.get("x-total-records")))
                                                            //  });
                                                            //}

                                                            if (event.body.result) {
                                                                return event.clone({
                                                                    body: event.body.result
                                                                });
                                                            }

                                                            return event;
                                                        }

                                                        return event;
                                                    })
                                                );
                                            }
                                        ),
                                        catchError((err: any) => {
                                            //this.storageService.clear()
                                            //this.router.navigate(['login'], { queryParams: { 'redirectURL': path } });
                                            if (err.error) {
                                                return throwError(err.error);
                                            }

                                            return throwError({ errorMessage: "Application Error. Please report to our engineer." });
                                        }),
                                        finalize(() => this.refreshTokenInProgress = false)
                                    );
                            }
                        }
                    }

                    if (err.error) {
                        if (this.router.url !== '/login') {
                            this.storageService.pathHistory = this.router.url;
                        }
                        this.popupService.alert(err.error.error.messages[0].message || "Application Error. Please report to our engineer.");
                        if (err.error.error.statusCode === 401 || err.error.error.code === 'ERR_INVALID_REFRESH_TOKEN') {
                            this.router.navigate(['/login']);
                        }
                        return throwError(err.error);
                    }

                    if (err.status === 403) {
                        this.router.navigate(['/login']);
                    }

                    return throwError({ errorMessage: "Application Error. Please report to our engineer." });
                }

                return throwError({ errorMessage: "Application Error. Please report to our engineer." });
            })
        );
    }

    addAuthenticationToken(request: any) {
        const accessToken = this.storageService.accessToken;

        if (!accessToken) {
            return request;
        }

        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.storageService.accessToken}`,
            }
        });
    }
}
