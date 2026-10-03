const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const { cacheMiddleware } = require("../middleware/cache");
const invalidateCache = require("../middleware/invalidateCache");

// GET routes use cache middleware

router.get(
  "/products",
  cacheMiddleware,
  productController.getProducts
);

router.get(
  "/products/:id",
  cacheMiddleware,
  productController.getProductById
);

// Modification routes use cache invalidation middleware

router.post(
  "/products",
  invalidateCache,
  productController.createProduct
);

router.put(
  "/products/:id",
  invalidateCache,
  productController.updateProduct
);

router.patch(
  "/products/:id",
  invalidateCache,
  productController.updateProduct
);

router.delete(
  "/products/:id",
  invalidateCache,
  productController.deleteProduct
);

module.exports = router;