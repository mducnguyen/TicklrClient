/**
 * @author DucNguyenMinh
 * @since 10/05/16
 */

import {Component, OnInit} from '@angular/core'
import {AbstractControl, ControlGroup, Control, Validators} from '@angular/common'
import {AuthService} from "../services/auth.service";
import {AuthContext} from "../contexts/auth.context";

@Component({
    selector: 'auth',
    templateUrl: 'app/templates/auth.component.html',
})
export class AuthComponent implements OnInit {

    public loginForm:ControlGroup;

    public registerForm:ControlGroup;

    public ctrlEmail:Control;

    public ctrlPassword:Control;

    public ctrlRegPassword:Control;

    public ctrlRegPasswordConfirm:Control;

    public isLogin;

    public wrongEmailPassword;

    private regEmailConflict;

    ngOnInit() {

        this.ctrlEmail = new Control('', Validators.compose([Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$")]));

        this.ctrlPassword = new Control('', Validators.compose([
            Validators.required, Validators.minLength(8), Validators.maxLength(255),
        ]));

        this.ctrlRegPassword = new Control('', Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(255),
        ]));

        this.ctrlRegPasswordConfirm = new Control('', (password:AbstractControl) => {
            return password.value != this.ctrlRegPassword.value ? {passwordConfirmation: 'Password confirmation does not match'} : null;
        });


        this.loginForm = new ControlGroup({
            password: this.ctrlPassword,
            email: this.ctrlEmail
        });

        this.registerForm = new ControlGroup({
            email: this.ctrlEmail,
            password: this.ctrlRegPassword,
            passwordConfirm: this.ctrlRegPasswordConfirm
        });

        this.isLogin = true;

        this.wrongEmailPassword = false;

        this.regEmailConflict = false;
    }

    /**
     * @param _authService handles remote authentication
     */
    constructor(private _authService:AuthService, private _authContext:AuthContext) {
    }

    /**
     * Try to log user in using the given email and password
     */
    public login() {
        this._authService.login(this.ctrlEmail.value, this.ctrlPassword.value).subscribe(
            user => {
                this.ctrlEmail.updateValue("");
                this.ctrlPassword.updateValue("");
                this.wrongEmailPassword = false;
            },
            errorRes => {
                if (errorRes.status == 401) {
                    this.wrongEmailPassword = true;
                    console.log(errorRes);
                } else {
                    console.log(errorRes);
                }
            });
    }

    /**
     * Performs user registration
     */
    public register() {

        this._authService.register(this.ctrlEmail.value, this.ctrlRegPassword.value).subscribe(
            res => {
                this.ctrlRegPasswordConfirm.updateValue("");
                this.regEmailConflict = false;
                this.login();
            },
            errorRes => {
                if (errorRes.status == 409) {
                    this.regEmailConflict = true;
                    console.log(errorRes);
                } else {
                    console.log(errorRes);
                }
            }
        );
    }
}