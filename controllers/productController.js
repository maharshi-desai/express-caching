const productService = require("../services/productService");

async function getProducts(req, res) {
  try {
    const products = await productService.getProducts();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load products"
    });
  }
}

async function getProductById(req, res) {
  try {
    const id = parseInt(req.params.id);

    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load product"
    });
  }
}

async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create product"
    });
  }
}

async function updateProduct(req, res) {
  try {
    const id = parseInt(req.params.id);

    const product = await productService.updateProduct(
      id,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update product"
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const id = parseInt(req.params.id);

    const deleted = await productService.deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete product"
    });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};