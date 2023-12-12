const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (err) {
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }

  addProduct(product) {
    const newId = this.products.length + 1;
    product.id = newId;

    this.products.push(product);
    this.saveProducts();

    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    return product || null;
}


  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((p) => p.id === id);

    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      this.saveProducts();
      return this.products[index];
    }

    return null;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);

    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      this.saveProducts();
      return deletedProduct;
    }

    return null;
  }
}

const productManager = new ProductManager('productos.json');
const newProduct = {
  title: 'Producto',
  description: 'Descripción del producto',
  price: 2000,
  thumbnail: '/images/ejemplo.jpg',
  code: '123456',
  stock: 50,
};

productManager.addProduct(newProduct);
productManager.saveProducts();


const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);



const productIdToFind = 1;
const foundProduct = productManager.getProductById(productIdToFind);
console.log(`Producto con ID ${productIdToFind}:`, foundProduct);



const productIdToUpdate = 1;
const updatedFields = { price: 3000, stock: 45 };
const updatedProduct = productManager.updateProduct(productIdToUpdate, updatedFields);
console.log(`Producto actualizado con ID ${productIdToUpdate}:`, updatedProduct);


const productIdToDelete = 1;
const deletedProduct = productManager.deleteProduct(productIdToDelete);
console.log(`Producto eliminado con ID ${productIdToDelete}:`, deletedProduct);

