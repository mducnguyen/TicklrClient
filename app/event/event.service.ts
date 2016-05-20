/**
 * @author ngnmhieu
 * @since 16.05.16
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Response} from "@angular/http";

import {Event} from "./event";

/**
 * Event object that implement this interface will
 * be accepted as request body at remote server.
 */
export interface EventRequest {
    title:string;
    description:string;
    startTime:Date;
    endTime:Date;
    isPublic:boolean;
}

@Injectable()
export class EventService {

    constructor(private _http:AuthHttp) {
    }

    /**
     * Get a list of events located at eventsURL
     * @param eventsURL
     * @returns {Observable<R>}
     */
    public getEvents(eventsURL:string):Observable<Event[]> {
        return this._http.get(eventsURL).map(res => {
            let body = res.json();
            return body.items.map((eventJSON) => {
                return new Event(eventJSON);
            });
        });
    }

    /**
     * Return an event located at eventURL
     * @param eventURL
     * @returns {Observable<R>}
     */
    public getEvent(eventURL:string):Observable<Event> {
        return this._http.get(eventURL).map(res => {
            return new Event(res.json());
        });
    }

    /**
     * Update an existing event at eventURL
     * @param eventURL
     * @param event
     * @returns {Observable<Response>}
     */
    public save(eventURL:string, event:EventRequest):Observable<Response> {
        return this._http.put(eventURL, JSON.stringify(event));
    }

    /**
     * Add a new event to the events located at eventsURL
     * @param eventsURL
     * @param event
     * @returns {Observable<Response>}
     */
    public saveNew(eventsURL:string, event:EventRequest) {
        return this._http.post(eventsURL, JSON.stringify(event));
    }
}
