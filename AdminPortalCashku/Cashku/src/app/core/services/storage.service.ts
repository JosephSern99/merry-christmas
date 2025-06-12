import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {

    //
    get accessToken(): string | null {
        return localStorage.getItem("accessToken");
    }

    set accessToken(accessToken: string | null) {
        if (accessToken === null)
            localStorage.setItem("accessToken", "");
        else
            localStorage.setItem("accessToken", accessToken);
    }

    //
    get refreshToken(): string | null {
        return localStorage.getItem("refreshToken");
    }

    set refreshToken(refreshToken: string | null) {
        if (refreshToken === null)
            localStorage.setItem("refreshToken", "");
        else
            localStorage.setItem("refreshToken", refreshToken);
    }

    //
    get userId(): string | null {
        return localStorage.getItem("userId");
    }

    set userId(userId: string | null) {
        if (userId === null)
            localStorage.removeItem("userId");
        else
            localStorage.setItem("userId", userId);
    }

    //
    get fullname(): string | null {
        return localStorage.getItem("fullname");
    }

    set fullname(fullname: string | null) {
        if (fullname === null)
            localStorage.removeItem("fullname");
        else
            localStorage.setItem("fullname", fullname);
    }

    //
    get userAddress(): string | null {
        return localStorage.getItem("userAddress");
    }

    set userAddress(userAddress: string | null) {
        if (userAddress === null)
            localStorage.removeItem("userAddress");
        else
            localStorage.setItem("userAddress", userAddress);
    }

    //
    get deviceId(): string | null {
        return localStorage.getItem("deviceId");
    }

    set deviceId(id: string | null) {
        if (id === null)
            localStorage.removeItem("deviceId");
        else
            localStorage.setItem("deviceId", id);
    }

    //
    get userProfile(): string | null {
        return localStorage.getItem("userProfile");
    }

    set userProfile(list: string | null) {
        if (list === null) {
            localStorage.removeItem("userProfile");
        } else {
            localStorage.setItem("userProfile", list);
        }
    }

    get registerStep(): string | null {
        return localStorage.getItem("registerStep");
    }

    set registerStep(registerStep: string | null) {
        if (registerStep === null)
            localStorage.removeItem("registerStep");
        else
            localStorage.setItem("registerStep", registerStep);
    }

    get email(): string | null {
        return localStorage.getItem("email");
    }

    set email(email: string | null) {
        if (email === null)
            localStorage.removeItem("email");
        else
            localStorage.setItem("email", email);
    }

    get roles(): string | null {
        return localStorage.getItem("roles");
    }

    set roles(roles: string | null) {
        if (roles === null)
            localStorage.removeItem("roles");
        else
            localStorage.setItem("roles", roles);
    }

    get pathHistory() {
        return localStorage.getItem('pathHistory');
    }

    set pathHistory(path: string | null) {
        if (path === null)
            localStorage.removeItem('pathHistory');
        else
            localStorage.setItem('pathHistory', path);
    }

    //
    setFromLogin(data: any): void {
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.userId = data.id;
        this.fullname = data.fullname;
        this.email = data.email;
        this.registerStep = data.registerStep;
        if (data.roles.length > 0) {
            this.roles = data.roles[0].toLowerCase();
        }
    }

    clear(): void {
        this.accessToken = null;
        this.refreshToken = null;
        this.userId = null;
        this.fullname = null;
        this.userProfile = null;
        this.email = null;
        this.registerStep = null;
        this.roles = null;
    }
}
