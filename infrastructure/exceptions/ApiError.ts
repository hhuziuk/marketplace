class ApiError extends Error {
    status: number;
    errors: any[];

    constructor(status: number, message: string, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static BadRequest(message: any, errors = []) {
        throw new ApiError(400, message, errors);
    }

    static Unauthorized() {
        throw new ApiError(401, 'User is not authorized')
    }

    static RequestFailed() {
        throw new ApiError(402, 'The parameters were valid but the request failed');
    }

    static AccessDenied() {
        throw new ApiError(403, 'Access denied');
    }

    static NotFound(message) {
        throw new ApiError(404, message);
    }

    static Conflict(message) {
        throw new ApiError(409, message);
    }

    static TooManyRequests() {
        throw new ApiError(429, 'Too many requests hit the API too quickly. We recommend an exponential backoff of your requests.');
    }

    static InternalServerError(message) {
        throw new ApiError(500, message);
    }
}

export default ApiError;