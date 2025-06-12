import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { ChangePassword, EditProfileModel } from 'src/app/core/models/profile/profile.model';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})

export class AccountService extends BaseApiService{
    route = env.apiServer + '/v1/';
    routeApi = env.apiServer + '/admin/api/v1/';

    subUserProfile = new BehaviorSubject(null);
    currUserProfile = this.subUserProfile.asObservable();
    isLogin: boolean = false;
    userProfile: any;

    constructor(
        protected http: HttpClient,
        private storageService: StorageService
    ) {
        super(http);
    }

    login(email: string, password: string, deviceInfo: any): Observable<any> {
        const body = {
            'email': email.trim(),
            'password': password.trim(),
            'device': deviceInfo,
        };

        return this.http.post(env.apiServer + '/admin/api/v1/Users/login', body)
            .pipe(map((data: any) => {
                this.storageService.setFromLogin(data);
                return data.result;
            }));
    }

    logout() {
        return this.http.post(env.apiServer + '/admin/api/v1/Users/logout', null)
            .pipe(map((data: any) => {
                this.isLogin = false;

                this.userProfile = null;
                this.subUserProfile.next(this.userProfile);

                this.storageService.clear();
            }))
    }

    forgotPassword(email: string): Observable<any> {
        const body = {
            email: email,
        }
        console.log(body);
        return this.http.post(this.routeApi + 'Users/reset', body);
    }

    resetPassword(email: string, password: string, confirmPassword: string): Observable<any> {
        const body = {
            email: email,
            newPassword: password,
            confirmNewPassword: confirmPassword,
        }

        return this.http.post(this.routeApi + 'Users/resetPassword', body);
    }

    verifyEmailRegister(email: string, deviceInfo: any): Observable<any> {
        const body = {
            'email': email.trim(),
            'device': deviceInfo,
        };

        return this.http.post(env.apiServer + '/api/v1/Users/verifyEmail', body);
    }

    getProfile(): Observable<any> {
        return this.http.get(this.routeApi + 'Users/profile')
            .pipe(
                map((data: any) => {
                    this.isLogin = true;
                    this.userProfile = data;
                    this.storageService.userProfile = JSON.stringify(this.userProfile);
                    this.subUserProfile.next(this.userProfile);

                    return this.userProfile;
                }),
                catchError((err) => {
                    console.error(err);
                    return throwError(err);
                })
            )
    }

    refreshToken(): Observable<any> {
        const params = {
            refreshToken: "true"
        };

        return this.http.post(this.routeApi + 'Users/refreshToken', null, { params: params });
    }

    updateProfile(data: EditProfileModel, email: string, calendlyLink: string): Observable<any> {
        const body = {
            'fullName': data.fullName,
            'phoneNumber': data.phoneNumber,
            'countryCode': data.countryCode,
            'email': email,
            'calendlyLink': data.calendlyLink,
        };

        return this.http.post(this.routeApi + 'Users/profile', body)
    }

    changePassword(passwords: ChangePassword): Observable<any> {
        return this.http.post(this.routeApi + 'Users/changePassword', passwords);
    }
}
