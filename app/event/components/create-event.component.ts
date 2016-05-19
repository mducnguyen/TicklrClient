/**
 * @author ngnmhieu
 * @since 18.05.16
 */

import {Component, OnInit} from "@angular/core";
import {Control, ControlGroup, Validators} from "@angular/common";
import {Router} from "@angular/router";
import {Event} from "../event";
import {EventService} from "../event.service";
import {AuthContext} from "../../auth/auth.context";

@Component({
    templateUrl: 'app/event/templates/event-detail.component.html',
    providers: [EventService]
})
export class CreateEventComponent implements OnInit {

    public event:Event;

    public eventForm:ControlGroup;

    ngOnInit() {
        this.event = new Event();
    }

    constructor(private _eventService:EventService, private _router:Router, private _authContext:AuthContext) {
        this.eventForm = new ControlGroup({
            title: new Control('', Validators.required),
            description: new Control('')
        });
    }

    /**
     * Create new event and redirect to edit newly created event
     */
    public save() {
        let location = this._authContext.getUser().events.href;
        this._eventService.saveNew(location, this.event).subscribe(
            res => {
                let location = res.headers.get("Location");
                this._router.navigate(["/events", btoa(location)])
            },
            err => {

            }
        );
    }

    public authContext():AuthContext {
        return this._authContext;
    }
}
