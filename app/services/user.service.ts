import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {User} from "../models/user";

/**
 * @author DucNguyenMinh
 * @since 11/05/16
 */

/**
 *  TODO: comment
 */
@Injectable()
export class UserService{

    // TODO: Dynamic user_endpoint
    private USERS_ENDPOINT:string = 'http://192.168.1.8:8080/api/users';

    /**
     * @param _http
     */
    constructor(private _http:AuthHttp) {
    }

    /**
     * TODO: comment!!!
     * @param id
     * @returns {null}
     */
    getUser(id:string):Observable<User> {

        // TODO: remove USER_ENDPOINT
        return this._http.get(this.USERS_ENDPOINT + '/' + id)
            .map(res => {
                if (200 == res.status) {
                    let result = res.json();
                    return new User(result.id, result.email);
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