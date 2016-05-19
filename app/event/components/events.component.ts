/**
 * @author ngnmhieu
 * @since 15.05.16
 */
import {Component, OnInit} from '@angular/core';
import {AuthContext} from "../../auth/auth.context";
import {EventService} from "../event.service";
import {Event} from "../event";
import {CapitalizePipe} from "../../shared/pipes/captitalize.pipe";
import {ROUTER_DIRECTIVES} from "@angular/router"
import {Base64Pipe} from "../../shared/pipes/base65.pipe";

@Component({
    selector: 'events',
    templateUrl: 'app/event/templates/events.component.html',
    providers: [EventService],
    directives: [ROUTER_DIRECTIVES],
    pipes: [CapitalizePipe, Base64Pipe]
})
export class EventsComponent implements OnInit {

    public events:Event[];

    ngOnInit() {
        if (this._authContext.isLoggedIn()) {
            this._eventService.getEvents(this._authContext.getUser().events.href)
                .subscribe(
                    events => {
                        this.events = events;
                    },
                    error => {
                    }
                );
        }
    }

    constructor(private _authContext:AuthContext, private _eventService:EventService) {
    }

    public authContext() {
        return this._authContext;
    }
}
