/**
 * @author ngnmhieu
 * @since 16.05.16
 */

export class Event {

    public id:string;

    public href:string;

    public title:string;

    public description:string;

    public startTime:Date;

    public endTime:Date;

    public isPublic:boolean;

    public canceled:boolean;

    public ticketSets;

    expired:boolean;

    happening:boolean;

    /**
     * @param eventJSON JSON object received from server
     */
    constructor(eventJSON?:any) {
        this.id = eventJSON && eventJSON.id || null;
        this.href = eventJSON && eventJSON.href || "";
        this.title = eventJSON && eventJSON.title || "";
        this.description = eventJSON && eventJSON.description || "";
        this.startTime = eventJSON && new Date(eventJSON.startTime) || new Date();
        this.endTime = eventJSON && new Date(eventJSON.endTime) || new Date();
        this.isPublic = eventJSON && eventJSON.isPublic || false;
        this.canceled = eventJSON && eventJSON.canceled || false;
        this.expired = eventJSON && eventJSON.expired || false;
        this.happening = eventJSON && eventJSON.happening || false;
    }
}
