export interface AuthorizationError {
    name: any;
    status: any;
    detail: any;
    code: any;
}

export class AuthorizationError extends Error {
    constructor(status: number, code: string, detail: string) {
        super(code);

        this.name = this.constructor.name;
        this.status = status || 401;
        this.detail = detail || "unauthorizedUser";
        this.code = code || "Unkown error";
    }

    statusCode() {
        return this.status;
    }
}
