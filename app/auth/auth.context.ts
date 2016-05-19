/**
 * @author ngnmhieu
 * @since 15.05.16
 */
import {Injectable} from  '@angular/core';
import {User} from "./user";
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";
import {Observer} from "rxjs/Observer";

@Injectable()
export class AuthContext {

    private _observers:Observer<AuthContext>[];

    private _user:User;

    constructor() {
        this._observers = [];
    }

    /**
     * @returns {User} currently logged-in user
     */
    public getUser():User {
        return this._user;
    }

    /**
     * @return an Observable. Any client that subscribes to
     *         this observable will be notified when an event
     *         occurs like user login or logout.
     */
    public observable():Observable<AuthContext> {
        return new Observable<AuthContext>((observer:Observer<AuthContext>) => {
            this._observers.push(observer);
        });
    }

    /**
     * @param user
     * @ensure if user == null then isLoggedIn() == false
     */
    public setUser(user:User):void {
        this._user = user;
        this.notify();
    }

    /**
     * @returns {boolean} true if user is logged in
     */
    public isLoggedIn():boolean {
        return this._user != null;
    }

    /**
     * Notifies the registered observers of the current state
     */
    private notify():void {
        this._observers.forEach(observer => {
            observer.next(this);
        })
    }
}
