export class AuthorizationError extends Error {
    name: string;
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super(message);
        this.name = this.constructor.name;
        this.status = status || 401;
        this.message = message || "unauthorizedUser";
    }
}

