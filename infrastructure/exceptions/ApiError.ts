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
        return new ApiError(400, message, errors);
    }
    static Unauthorized() {
        return new ApiError(401, 'User is not authorized')
    }
    static RequestFailed() {
        return new ApiError(402, 'The parameters were valid but the request failed');
    }
    static AccessDenied() {
        return new ApiError(403, 'Access denied');
    }
    static NotFound() {
        return new ApiError(404, 'The requested resource doesn’t exist.');
    }
    static Conflict() {
        return new ApiError(409, 'The request conflicts with another request (perhaps due to using the same idempotent key).');
    }
    static TooManyRequests() {
        return new ApiError(429, 'Too many requests hit the API too quickly. We recommend an exponential backoff of your requests.');
    }
}

export default ApiError;