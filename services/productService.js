const {
  readProducts,
  writeProducts
} = require("../database/productDatabase");

async function getProducts() {
  return await readProducts();
}

async function getProductById(id) {
  const products = await readProducts();

  return products.find(product => product.id === id);
}

async function createProduct(product) {
  const products = await readProducts();

  const newProduct = {
    id: products.length
      ? Math.max(...products.map(p => p.id)) + 1
      : 1,
    ...product
  };

  products.push(newProduct);

  await writeProducts(products);

  return newProduct;
}

async function updateProduct(id, data) {
  const products = await readProducts();

  const index = products.findIndex(product => product.id === id);

  if (index === -1) {
    return null;
  }

  products[index] = {
    ...products[index],
    ...data,
    id: products[index].id
  };

  await writeProducts(products);

  return products[index];
}

async function deleteProduct(id) {
  const products = await readProducts();

  const index = products.findIndex(product => product.id === id);

  if (index === -1) {
    return false;
  }

  products.splice(index, 1);

  await writeProducts(products);

  return true;
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};