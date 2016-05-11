/**
 * @author DucNguyenMinh
 * @since 10/05/16
 */

import {Component} from '@angular/core';
import {AuthComponent} from "./auth.component";
import {provide} from "@angular/core";
import {AuthHttp, AuthConfig, JwtHelper} from "angular2-jwt/angular2-jwt";
import {Http} from "@angular/http";
import {HTTP_PROVIDERS} from "@angular/http";
import {AUTH_TOKEN, AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {AbstractStorage} from "../services/storage/storage.abstract";
import {DelegateStorage} from "../services/storage/delegate-storage";

let authProvider = provide(AuthHttp, {
    useFactory: (http, storage) => {
        return new AuthHttp(new AuthConfig({
            headerName: "Authorization",
            headerPrefix: "Bearer",
            tokenName: AUTH_TOKEN,
            tokenGetter: () => storage.getItem(AUTH_TOKEN),
            globalHeaders: [{'Content-Type': 'application/json'}],
            noJwtError: true
        }), http);
    },
    deps: [Http, AbstractStorage]
});

let storageProvider = provide(AbstractStorage, {
    useFactory: () => new DelegateStorage(localStorage)
});

@Component({
    selector: 'app',
    templateUrl: 'app/templates/app.component.html',
    directives: [AuthComponent],
    providers: [HTTP_PROVIDERS, UserService, JwtHelper, authProvider, storageProvider, AuthService]
})
export class AppComponent {

    /**
     * @param _authService
     */
    constructor(private _authService:AuthService) {
    }

    /**
     * @returns {AuthService}
     */
    public authService():AuthService {
        return this._authService;
    }
}
