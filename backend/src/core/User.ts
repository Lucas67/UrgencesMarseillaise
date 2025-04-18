export class User {
    private username: string;
    private email: string;
    private password: string;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    getUsername() {
        return this.username;
    }
    getEmail() {
        return this.email;
    }
}