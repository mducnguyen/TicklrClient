/**
 * @author DucNguyenMinh
 * @since 10/05/16
 */

import {Component, provide, OnInit} from '@angular/core';
import {AuthComponent} from "./auth.component";
import {AuthHttp, AuthConfig, JwtHelper} from "angular2-jwt/angular2-jwt";
import {HTTP_PROVIDERS, Http} from "@angular/http";
import {Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router";
import {AUTH_TOKEN, AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {AbstractStorage} from "../services/storage/abstract.storage";
import {DelegateStorage} from "../services/storage/delegate.storage";
import {APP_CONFIG, AppConfig} from "../config/app.config";
import {EventsComponent} from "./event/events.component";
import {EventDetailComponent} from "./event/event-detail.component";
import {AuthContext} from "../contexts/auth.context";
import {CreateEventComponent} from "./event/create-event.component";

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

let appConfigProvider = provide(AppConfig, {
    useValue: APP_CONFIG
});

@Component({
    selector: 'app',
    templateUrl: 'app/templates/app.component.html',
    directives: [AuthComponent, ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, UserService, JwtHelper, authProvider,
        storageProvider, AuthService, appConfigProvider, AuthContext]
})
@Routes([
    {path: '/events/create', component: CreateEventComponent},
    {path: '/events/:eventHref', component: EventDetailComponent},
    {path: '/events', component: EventsComponent},
    {path: '/login', component: AuthComponent},
])
export class AppComponent {

    /**
     * @param _authService
     */
    constructor(private _authService:AuthService, private _authContext:AuthContext, private _router:Router) {

        // redirect user to authentication page
        this._authContext.observable().subscribe(
            (authContext:AuthContext) => {
                if (!authContext.isLoggedIn()) {
                    this._router.navigate(['login']);
                }
            }
        );

        this._authService.tryLogin();
    }

    /**
     * @returns {AuthService} performs authentication operations
     */
    public authService():AuthService {
        return this._authService;
    }

    /**
     * @returns {AuthContext} holds authentication information
     */
    public authContext():AuthContext {
        return this._authContext;
    }
}
