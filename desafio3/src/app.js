import express from 'express';
import ProductManager from './KhennierOvallesProductManager.js';

const PORT = 8080;
const app = express();

const productManager = new ProductManager('productos.json');

app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();

        if (!limit) {
            return res.send({ products });
        }

        const limitedProducts = products.slice(0, parseInt(limit, 10));
        res.send({ products: limitedProducts });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(parseInt(pid, 10));

        if (!product) {
            return res.status(404).send({ error: 'Producto no encontrado' });
        }

        res.send({ product });
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en ${PORT}`);
});
