import ApiError from "../exceptions/api.error.js";
import { validateAccessToken } from "../services/token.service.js";

export default function authMiddleware(req, res, next) {
  try {
    const authorizationHeaders = req.headers.authorization;
    if (!authorizationHeaders) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeaders.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    return;
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}
