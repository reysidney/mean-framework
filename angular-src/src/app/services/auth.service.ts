import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
    authToken: any;
    user: any;
    backendServer : String = "http://localhost:3000";

    constructor(
        private http: Http
    ) { }

    registerUser(user) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.backendServer + '/users/register', user, {headers: headers})
            .map(res => res.json());
    }

    authenticateUser(user) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.backendServer + '/users/authenticate', user, {headers: headers})
            .map(res => res.json());
    }

    getProfile() {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.backendServer + '/users/profile', {headers: headers})
            .map(res => res.json());
    }

    storeUserData(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }

    loadToken() {
        const token = localStorage.getItem('token');
        this.authToken = token;
    }

    loggedIn() {
        return tokenNotExpired();
    }

    logout() {
        localStorage.clear();
        this.authToken = null;
        this.user = null;
    }
}
