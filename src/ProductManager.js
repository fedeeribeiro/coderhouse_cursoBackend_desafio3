import fs from 'fs';

export default class ProductManager {
    constructor(path){
        this.path = path
    }

    #setId = async () => {
        const productsFromFile = await fs.promises.readFile(this.path, 'utf-8');
        const productsArray = JSON.parse(productsFromFile);
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

    #isCodeInUse = async (code) => {
        const productsFromFile = await fs.promises.readFile(this.path, 'utf-8');
        const productsArray = JSON.parse(productsFromFile);
        return productsArray.find(product => product.code === code)
    } 

    async addProduct(title, description, price, thumbnail, code, stock){
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Error. No se pueden dejar campos vacíos al agregar un nuevo producto.')
        // }else if(this.#isCodeInUse(code)){
        //     console.log('Error. No se pueden ingresar dos productos con el mismo code.')    
        }else{
            const product = {
                id: await this.#setId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            const productsFromFile = await fs.promises.readFile(this.path, 'utf-8');
            const productsArray = JSON.parse(productsFromFile);
            productsArray.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productsArray));
            console.log('Se ha agregado el producto exitosamente.')
        }
    }

    async getProducts(queries){
        const { limit } = queries;
        const productsFromFile = await fs.promises.readFile(this.path, 'utf-8');
        const productsArray = JSON.parse(productsFromFile);
        if (!productsArray) console.log('Error. Not found.')
        else{
            if (limit) return productsArray.slice(0, limit)
            else return productsArray
        }    
    }

    async getProductById(id){
        const productsFromFile = await fs.promises.readFile(this.path, 'utf-8');
        const productsArray = JSON.parse(productsFromFile);
        const productFound = productsArray.find(product => product.id === id);
        if (!productFound) console.log('Error. Not found.')
        else return productFound
    }

    async updateProduct(id, prop, value){
        const productsFromFile = await fs.promises.readFile(this.path, 'utf-8');
        const productsArray = JSON.parse(productsFromFile);
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
            await fs.promises.writeFile(this.path, JSON.stringify(productsArray))
        }else{
            console.log('Error. No se ha encontrado ningún producto con el id ingresado.')
        }
    }

    async deleteProduct(id){
        const productsFromFile = await fs.promises.readFile(this.path, 'utf-8');
        const productsArray = JSON.parse(productsFromFile);
        if(productsArray.find(product => product.id === id)){
            const newProductsArray = productsArray.filter(product => product.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(newProductsArray))
            console.log('Se ha eliminado el producto exitosamente.')
        }else{
            console.log('Error. No se ha encontrado ningún producto con el id ingresado.')
        }
    }
}