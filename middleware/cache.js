const cache = new Map();

const TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {
  if (req.method !== "GET") {
    return next();
  }

  const key = req.originalUrl;

  const cached = cache.get(key);

  if (cached) {
    const age = Date.now() - cached.createdAt;

    if (age < TTL) {
      res.setHeader("X-Cache", "HIT");
      return res.json(cached.data);
    }

    cache.delete(key);
  }

  res.setHeader("X-Cache", "MISS");

  const originalJson = res.json.bind(res);

  res.json = (data) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.set(key, {
        data: data,
        createdAt: Date.now()
      });
    }

    return originalJson(data);
  };

  next();
}

function clearCache() {
  cache.clear();
}

module.exports = {
  cacheMiddleware,
  clearCache
};