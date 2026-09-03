class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError(message = "User is not authorized.") {
    return new ApiError(401, message);
  }

  static Forbidden(message = "Access denied") {
    return new ApiError(403, message);
  }

  static NotFound(message = "Resource not found") {
    return new ApiError(404, message);
  }

  static Internal(message = "Internal server error") {
    return new ApiError(500, message);
  }
}

export default ApiError;
