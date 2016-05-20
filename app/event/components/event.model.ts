import {Event} from "../event";


/**
 * Event model for the view
 *
 * @author ngnmhieu
 * @since 20.05.16
 */
export class EventModel {

    title:string;

    description:string;

    startTime:Date;

    endTime:Date;

    isPublic:boolean;

    /**
     * @param event original event object
     */
    constructor(event?:Event) {
        this.title = event && event.title || "";
        this.description = event && event.description || "";
        this.startTime = event && event.startTime || new Date();
        this.endTime = event && event.endTime || new Date();
        this.isPublic = event && event.isPublic || false;
    }
}
