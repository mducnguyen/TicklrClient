/**
 * @author ngnmhieu
 * @since 15.05.16
 */
import {Injectable} from  '@angular/core';
import {User} from "../models/user";

@Injectable()
export class AuthContext {

    private _user:User;

    public getUser():User {
        return this._user;
    }

    public setUser(user:User) {
        this._user = user;
    }
}
