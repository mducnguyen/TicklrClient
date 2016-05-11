/**
 * User model
 */
export class User {
    id: string;
    email:string;

    /**
     * Constructs new User object
     * @param id
     * @param email
     */
    constructor(id:string, email:string) {
        this.id = id;
        this.email = email;
    }
}
