import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthData } from 'backend/models/user.js';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = false;
    private isClent = false;
    private isStore = false;
    private isAdmin = false;


    private token: string;
    private tokenTimer: any;
    private userId: string;
    private userRole: string;

    private statut: any;
    private authStatusListener = new Subject<boolean>();
    private authClient = new Subject<boolean>();
    private authStore = new Subject<boolean>();
    private authAdmin = new Subject<boolean>();

    public err = new BehaviorSubject<any>(null);

    authURl: string = "http://localhost:3003/users";
    errorMsg: string;

    constructor(private http: HttpClient, private route: Router) {

        var currentUser = (localStorage.getItem('userId'))
        if (currentUser === null) {
            this.isAuthenticated = false;
        } else {
            this.isAuthenticated = true;
            var currentUser = (localStorage.getItem('userRole'))
            if (currentUser === "client") {
                this.isClent = true;
                this.authClient.next(true);
            } else if (currentUser === "store") {
                this.isStore = true;
                this.authStore.next(true);
            }
            else {
                this.isAdmin = true;
                this.authAdmin.next(true);
            }

        }


    }


    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;

    }
    getIsAuthClient() {
        return this.isClent;
    }
    getIsAuthStore() {
        return this.isStore;
    }
    getIsAuthAdmin() {
        return this.isAdmin;
    }


    getUserId() {
        return this.userId;
    }
    getStatut() {
        return this.statut;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }
    getAuthClient() {
        return this.authClient.asObservable();
    }
    getAuthStore() {
        return this.authStore.asObservable();
    }
    getAuthAdmin() {
        return this.authAdmin.asObservable();
    }

    getRole() {
        return this.userRole;
    }



    login(email: string, pwd: string) {

        const authData: AuthData = { email: email, pwd: pwd };

        return this.http
            .post<{
                token: string; expiresIn: number, userId: string,
                userRole: string,
            }>(`${this.authURl}/login`, authData)
            .pipe(map(response => {
                this.err.next(null)
                const token = response.token;
                this.token = token;
                if (response.userRole === "client") {
                    this.isClent = true;
                    this.authClient.next(true);
                } else if (response.userRole === "store") {
                    this.isStore = true;
                    this.authStore.next(true);
                }
                else {
                    this.isAdmin = true;
                    this.authAdmin.next(true);
                }
                if (token) {



                    const expiresInDuration = response.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.userId = response.userId;
                    this.userRole = response.userRole;



                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() +
                        expiresInDuration * 1000);
                    this.saveAuthData(token, expirationDate, this.userId, this.userRole);
                    if (response.userRole === 'admin') {
                        this.route.navigate(["/dashboard"]);
                    } else if (response.userRole === 'store') {
                        this.route.navigate(["/add-products"]);
                    } else {
                        this.route.navigate([""]);
                    }
                    return response.token

                }
            },
                err => {
                    this.err.next(err)

                }));
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.isClent = false;
        this.isStore = false;
        this.isAdmin = false;

        this.authStatusListener.next(false);
        this.authClient.next(false);
        this.authStore.next(false);
        this.authAdmin.next(false);

        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.route.navigate(["login"]);
    }
    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() -
            now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.userRole = authInformation.userRole;

            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }
    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");
        const userRole = localStorage.getItem("userRole");

        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId,
            userRole: userRole,

        }
    }
    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }
    private saveAuthData(token: string, expirationDate: Date, userId:
        string, userRole: string,) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId", userId);
        localStorage.setItem("userRole", userRole);

    }
    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");

    }




}
