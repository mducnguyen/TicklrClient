/**
 * @author ngnmhieu
 * @since 15.05.16
 */
import {Injectable} from  '@angular/core';
import {User} from "../models/user";

@Injectable()
export class AuthContext {

    private _user:User;

    /**
     * @returns {User} currently logged-in user
     */
    public getUser():User {
        return this._user;
    }

    /**
     * @param user
     * @ensure if user == null then isLoggedIn() == false
     */
    public setUser(user:User) {
        this._user = user;
    }

    /**
     * @returns {boolean} true if user is logged in
     */
    public isLoggedIn():boolean {
        return this._user != null;
    }
}
