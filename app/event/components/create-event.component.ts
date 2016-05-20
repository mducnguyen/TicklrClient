/**
 * @author ngnmhieu
 * @since 18.05.16
 */

import {Component, OnInit} from "@angular/core";
import {Control, ControlGroup, Validators} from "@angular/common";
import {Router} from "@angular/router";
import {EventService, EventRequest} from "../event.service";
import {AuthContext} from "../../auth/auth.context";
import {EventModel} from "./event.model";
import {DateTimeInput} from "./datetime.input";

@Component({
    templateUrl: 'app/event/templates/event-detail.component.html',
    providers: [EventService],
    directives: [DateTimeInput]
})
export class CreateEventComponent implements OnInit {

    public model:EventModel;

    public eventForm:ControlGroup;

    ngOnInit() {
        this.model = new EventModel();
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

        let eventRequest:EventRequest = {
            title: this.model.title,
            description: this.model.description,
            isPublic: this.model.isPublic,
            startTime: this.model.startTime,
            endTime: this.model.endTime
        };

        this._eventService.saveNew(location, eventRequest).subscribe(
            res => {
                let location = res.headers.get("Location");
                this._router.navigate(["/events", btoa(location)])
            },
            err => {

            }
        );
    }
}
