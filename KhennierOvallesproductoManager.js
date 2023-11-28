class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
addProduct(title, description, price, image, code, stock) {
    if (!title || !description || !price || !image || !code || !stock) {
        console.error("Todos los campos son obligatorios");
        return;
    }
  
    if (this.products.some(product => product.code === code)) {
        console.error("El código ya existe. Por favor, elija uno diferente.");
        return;
    }
  
  const newProduct = {
    id: this.productIdCounter++,
    title,
    description,
    price,
    image,
    code,
    stock
  };
  
    this.products.push(newProduct);
    console.log("Producto agregado:", newProduct);
}
  
getProducts() {
    return this.products;
  }
  
getProductById(id) {
    const product = this.products.find(product => product.id === id);
  
    if (product) {
      return product;
    } else {
      console.error("Producto no encontrado. ID:", id);
    }
    }
  }
  

const productManager = new ProductManager();
  
productManager.addProduct("Producto 1", "Descripción 1", 19.99, "imagen", "12345", 10);
productManager.addProduct("Producto 2", "Descripción 2", 29.99, "imagen", "67890", 15);
productManager.addProduct("Producto 3", "Descripción 3", 29.99, "imagen", "67890", 15);
  
console.log("Todos los productos:", productManager.getProducts());
  
const productIdToFind = 6;
const foundProduct = productManager.getProductById(productIdToFind);
  
if (foundProduct) {
    console.log(`Producto con ID ${productIdToFind}:`, foundProduct);
}
  