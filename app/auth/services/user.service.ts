import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {User} from "../user";
import {AppConfig} from "../../shared/config/app.config";

/**
 * @author DucNguyenMinh
 * @since 11/05/16
 */

/**
 *  Manages user resources
 */
@Injectable()
export class UserService {

    /**
     * @param _http
     */
    constructor(private _http:AuthHttp) {
    }

    /**
     * Fetches a user resource located at url
     * @param url URL to the user resource
     * @return
     */
    getUser(url:string):Observable<User> {

        return this._http.get(url)
            .map(res => {
                if (200 == res.status) {
                    return new User(res.json());
                } else if (401 == res.status) {
                    throw new Error("Authorization failed: current user is not allowed to access this resource.");
                } else {
                    throw new Error("Unknown error");
                }
            }).catch(err => {
                let errMsg = err.message || 'Unknown error';
                return Observable.throw(errMsg);
            });
    }
}