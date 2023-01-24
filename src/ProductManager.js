const fs = require('fs');

class productManager {
    constructor(){
        this.path = './products.json';
        fs.writeFileSync(this.path, JSON.stringify([]))
    }

    #setId = () => {
        const productsArray = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        if(productsArray.length !== 0){
            let id = 0;
            productsArray.forEach(product => {
                if(product.id > id){
                    id = product.id + 1
                }
            });
            return id
        }else{
            return 1
        }
    }

    #isCodeInUse = (code) => JSON.parse(fs.readFileSync(this.path, 'utf-8')).find(product => product.code === code); 

    addProduct(title, description, price, thumbnail, code, stock){
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Error. No se pueden dejar campos vacíos al agregar un nuevo producto.')
        }else if (this.#isCodeInUse(code)) console.log('Error. No se pueden ingresar dos productos con el mismo code.')
        else{
            const product = {
                id: this.#setId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            const productsArray = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            productsArray.push(product);
            fs.writeFileSync(this.path, JSON.stringify(productsArray))
            console.log('Se ha agregado el producto exitosamente.')
        }
    }

    getProducts(){
        const productsArray = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        console.log('Estos son los productos que se encuentran en el array:');
        console.log(productsArray)
    }

    getProductById(id){
        const productsArray = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        const productFound = productsArray.find(product => product.id === id);
        if (!productFound) console.log('Error. Not found.')
        else {
            console.log('Se ha encontrado el siguiente producto:');
            console.log(productFound)
        }
    }

    updateProduct(id, prop, value){
        const productsArray = JSON.parse(fs.readFileSync(this.path), 'utf-8');
        const productFound = productsArray.find(product => product.id === id);
        if(productFound){
            if(prop === 'title'){
                productFound.title = value;
                console.log('Se ha actualizado el producto exitosamente.')
            }else if(prop === 'description'){
                productFound.description = value;
                console.log('Se ha actualizado el producto exitosamente.')
            }else if(prop === 'price'){
                productFound.price = value;
                console.log('Se ha actualizado el producto exitosamente.')
            }else if(prop === 'thumbnail'){
                productFound.thumbnail = value;
                console.log('Se ha actualizado el producto exitosamente.')
            }else if(prop === 'code'){
                productFound.code = value;
                console.log('Se ha actualizado el producto exitosamente.')
            }else if(prop === 'stock'){
                productFound = value;
                console.log('Se ha actualizado el producto exitosamente.')
            }else{
                console.log('Error. Se ha ingresado una propiedad no válida.')
            }
            fs.writeFileSync(this.path, JSON.stringify(productsArray))
        }else{
            console.log('Error. No se ha encontrado ningún producto con el id ingresado.')
        }
    }

    deleteProduct(id){
        const productsArray = JSON.parse(fs.readFileSync(this.path), 'utf-8');
        if(productsArray.find(product => product.id === id)){
            const newProductsArray = productsArray.filter(product => product.id !== id);
            fs.writeFileSync(this.path, JSON.stringify(newProductsArray))
            console.log('Se ha eliminado el producto exitosamente.')
        }else{
            console.log('Error. No se ha encontrado ningún producto con el id ingresado.')
        }
    }
}

//              *****************************TESTING*****************************             

const productManagerTester = new productManager();

productManagerTester.getProducts();

productManagerTester.addProduct('producto prueba', 'este es un producto prueba', 200, 'sin imagen', 'abc123', 25);

productManagerTester.addProduct('producto prueba', 'este es un producto prueba', 200, 'sin imagen', 'abc123', 25);

productManagerTester.addProduct('segundo producto prueba 222', 'este es un producto prueba', 200, 'sin imagen', 'abc143', 25);

productManagerTester.getProducts();

productManagerTester.getProductById(1);

productManagerTester.getProductById(7);

productManagerTester.updateProduct(1, 'title', 'nuevo producto prueba con nombre modificado');

productManagerTester.updateProduct(4, 'title', 'producto inexistente');

productManagerTester.getProductById(1);

productManagerTester.deleteProduct(1);

productManagerTester.deleteProduct(9);

productManagerTester.getProducts();

productManagerTester.addProduct('tercer producto prueba 33', 'este es un producto prueba', 200, 'sin imagen', 'rteo1123', 25);

productManagerTester.getProducts();