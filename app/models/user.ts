/**
 * User model
 */
export class User {

    // id user's unique id
    public id:string;

    // url to the user resource
    public href:string;

    // email user's email
    public email:string;

    // events object
    public events:{
        href:string;
        items:Event[];
    };

    /**
     * Constructs new User object
     * @param user JSON object returned by server
     */
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.href = user.href;
        let eventHref = user.events.href;
        let events:Event[] = [];
        this.events = {
            href: eventHref,
            items: events
        };
    }
}
