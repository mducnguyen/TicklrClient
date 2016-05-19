/**
 * @author ngnmhieu
 * @since 16.05.16
 */
import {Component, AfterViewChecked, OnInit} from "@angular/core";
import {RouteSegment, OnActivate, RouteTree} from "@angular/router"
import {EventService, EventRequest} from "../event.service";
import {Validators, ControlGroup, Control} from "@angular/common"
import {Event} from "../event";
import {DateTimeInput} from "./datetime.input";

@Component({
    templateUrl: "app/event/templates/event-detail.component.html",
    providers: [EventService],
    directives: [DateTimeInput]
})
export class EventDetailComponent implements OnActivate, AfterViewChecked {

    ngAfterViewChecked() {
    }

    private _event:Event;

    public model:EventModel;

    public eventForm:ControlGroup;

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {

        // URL of single event
        let href = atob(curr.getParam("eventHref"));

        this._eventService.getEvent(href).subscribe(
            event => {
                this._event = event;
                this.model = new EventModel(event);
            },
            error => {
            }
        );
    }

    constructor(private _eventService:EventService) {
        this.eventForm = new ControlGroup({
            title: new Control('', Validators.required),
            description: new Control('')
        });
    }

    /**
     * Save the event being edited
     */
    public save():void {

        let eventRequest:EventRequest = {
            title: this.model.title,
            description: this.model.description,
            isPublic: this.model.isPublic,
            startTime: this.model.startTime,
            endTime: this.model.endTime
        };

        this._eventService.save(this._event.href, eventRequest).subscribe(
            res => {
            },
            error => {
            }
        );
    }
}

class EventModel {

    title:string;

    description:string;

    startTime:Date;

    endTime:Date;

    isPublic:boolean;

    /**
     * @param event original event object
     */
    constructor(event:Event) {
        this.title = event.title;
        this.description = event.description;
        this.startTime = event.startTime;
        this.endTime = event.endTime;
        this.isPublic = event.isPublic;
    }
}

