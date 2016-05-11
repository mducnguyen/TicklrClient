/**
 * @author DucNguyenMinh
 * @since 10/05/16
 */

import {Component} from '@angular/core'
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'auth',
    templateUrl: 'app/templates/auth.component.html',
})
export class AuthComponent {

    public email:String;
    public password:String;

    /**
     * @param _authService handles remote authentication
     */
    constructor(private _authService:AuthService) {
    }

    /**
     * Try to log user in using the given email and password
     */
    public login() {
        this._authService.login(this.email, this.password).subscribe(
            user => {
            },
            error => {
                // TODO: Error message
            });
    }

    // more methods for querying the state
}