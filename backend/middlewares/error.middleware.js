import ApiError from "../exceptions/api.error.js";

const errorMiddleware = (error, req, res, next) => {
  console.log(error);

  if (err instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errors: error.errors,
    });
  }

  if (error.name === "CastError") {
    return res.status(404).json({ message: "Resource not found." });
  }

  if (error.code === 11000) {
    return res.status(400).json({ message: "Duplicate filed value entered." });
  }

  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map((val) => val.message);
    return res.status(400).json({ message: message.join(", ") });
  }

  return res.status(500).json({ message: "Server error." });
};

export default errorMiddleware;
