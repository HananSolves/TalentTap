// Third-Party Module
import path from "path";

// Path to the NotFound page
const __dirname = path.resolve();
const notFoundPage = path.join(__dirname, "backend", "NotFound.html");

export default function notFound(req, res, next) {
  res.status(404).sendFile(notFoundPage, (err) => {
    if (err) {
      const error = new Error("Failed to send '404: Not Found' Page");
      error.status = 500;

      next(error);
    }
  });
}
