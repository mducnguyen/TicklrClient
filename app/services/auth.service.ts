import {Injectable, Inject} from "@angular/core";
import {JwtHelper} from "angular2-jwt/angular2-jwt";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import {UserService} from "./user.service";
import {Response, Headers, Http} from "@angular/http";
import {AbstractStorage} from "./storage/abstract.storage";
import {AppConfig} from "../config/app.config";

/**
 * AuthService manages remote authentication and holds information about authenticated user.
 *
 * @author DucNguyenMinh
 * @since 10/05/16
 */
@Injectable()
export class AuthService {

    private _authEndpoint:string;
    private _registerEndpoint:string;

    // authenticated user
    private _currentUser:User;

    /**
     * @param _http makes HTTP requests
     * @param jwtHelper decodes JWT Token
     * @param _userService
     */
    constructor(private _http:Http, private jwtHelper:JwtHelper,
                private _userService:UserService,
                private _storage:AbstractStorage, appConfig:AppConfig) {

        this._authEndpoint = appConfig.API_ENDPOINT.AUTH;
        this._registerEndpoint = appConfig.API_ENDPOINT.REGISTER;

        let jwtToken = this.getToken();

        if (!this.isLoggedIn() && jwtToken != null) {
            let jwtContent = this.jwtHelper.decodeToken(jwtToken);
            this._userService.getUser(jwtContent.url).subscribe(user => {
                this._currentUser = user;
                return user;
            }, error => {

            });
        }
    }

    /**
     * @param email
     * @param password
     */
    login(email:String, password:String):Observable<User> {

        let options = {headers: new Headers({'Content-Type': 'application/json'})};
        let body = {
            email: email,
            password: password,
        };

        return this._http.post(this._authEndpoint, JSON.stringify(body), options)
            .flatMap((res) => {

                if (res.status == 200) {

                    let body = res.json();
                    let token = body.key;
                    let jwtContent = this.jwtHelper.decodeToken(token);

                    this.saveToken(token);

                    return this._userService.getUser(jwtContent.url).map((user:User) => {
                        this._currentUser = user;
                        return user;
                    });

                } else if (res.status == 401) {
                    // TODO: more meaningful error
                    throw new Error();

                } else {
                    // TODO: more meaningful error
                    throw new Error();
                }

            });
    }

    /**
     * Register new user
     * @param email
     * @param password
     */
    public register(email:String, password:String): Observable<Response> {
        let options = {headers: new Headers({'Content-Type': 'application/json'})};
        let body = {
            email: email,
            password: password,
        };
        return this._http.post(this._registerEndpoint, JSON.stringify(body), options);
    }

    /**
     * Logs user out
     */
    public logout() {
        this._storage.removeItem(AUTH_TOKEN);
        this._currentUser = null;
    }


    /**
     * @return {boolean} true if user is already logged in, else false
     */
    public isLoggedIn():boolean {
        return this._currentUser != null;
    }

    /**
     * Save the token to the provided storage
     * @param token authentication token
     */
    private saveToken(token:string) {
        this._storage.setItem(AUTH_TOKEN, token);
    }

    /**
     * @return Authentication token retrieved from storage
     */
    private getToken():string {
        return this._storage.getItem(AUTH_TOKEN);
    }
}

export var AUTH_TOKEN:string = "ticklr-auth-token";
