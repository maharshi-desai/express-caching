const { clearCache } = require("./cache");

function invalidateCache(req, res, next) {
  const methods = ["POST", "PUT", "PATCH", "DELETE"];

  if (!methods.includes(req.method)) {
    return next();
  }

  const originalEnd = res.end.bind(res);

  res.end = (...args) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      clearCache();
    }

    return originalEnd(...args);
  };

  next();
}

module.exports = invalidateCache;