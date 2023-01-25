import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager('../utils/products.json');

app.get('/products', async (request, response) => {
    const products = await productManager.getProducts(request.query);
    if (products) response.json({message: 'Productos encontrados.', products})
    else response.json({message: 'Error. No se encontraron los productos.'})
});

app.get('/products/:id', async (request, response) => {
    const { id } = request.params;
    const productFound = await productManager.getProductById(parseInt(id));
    if (productFound) response.json({message: 'Producto encontrado.', productFound})
    else response.json({message: 'Error. Producto no encontrado.'})
})


app.listen(8080, () => {
    console.log('Servidor escuchando al puerto 8080.')
});