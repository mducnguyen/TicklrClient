/**
 * @author ngnmhieu
 * @since 16.05.16
 */
import {Component, AfterViewChecked} from "@angular/core";
import {RouteSegment, OnActivate, RouteTree} from "@angular/router"
import {EventService} from "../../services/event.service";
import {Validators, ControlGroup, Control} from "@angular/common"
import {Event} from "../../models/event";
import {AuthContext} from "../../contexts/auth.context";

declare var jQuery:any;

@Component({
    templateUrl: "app/templates/event-detail.component.html",
    providers: [EventService]
})
export class EventDetailComponent implements OnActivate, AfterViewChecked {

    ngAfterViewChecked() {
        // init datetimepicker fields
        // jQuery('.datetimepicker').appendDtpicker();
    }

    public event:Event;

    public eventForm:ControlGroup;

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {

        // URL of single event
        let href = atob(curr.getParam("eventHref"));

        this._eventService.getEvent(href).subscribe(
            event => {
                this.event = event;
            },
            error => {
            }
        );
    }

    constructor(private _eventService:EventService, private _authContext:AuthContext) {
        this.eventForm = new ControlGroup({
            title: new Control('', Validators.required),
            description: new Control('')
        });
    }

    /**
     * Save the event being edited
     */
    public save() {

        this._eventService.save(this.event).subscribe(
            res => {
            },
            error => {
            }
        );
    }

    public authContext():AuthContext {
        return this._authContext;
    }
}
