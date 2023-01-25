import fs from 'fs';

export default class ProductManager {
    constructor(path){
        this.path = path;
        if(!fs.existsSync(path)) fs.writeFileSync(path, '[]')
    }

    #setId = async () => {
        const productsArray = await this.getProducts();
        if(productsArray.length !== 0){
            let id = 0;
            productsArray.forEach(product => {
                if(product.id >= id){
                    id = product.id + 1
                }
            });
            return id
        }else{
            return 1
        }
    }

    #isCodeInUse = async (code) => {
        const productsArray = await this.getProducts();
        return productsArray.some(product => product.code === code)
    } 

    async addProduct(title, description, price, thumbnail, code, stock){
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Error. No se pueden dejar campos vacíos al agregar un nuevo producto.')
        }else if(await this.#isCodeInUse(code)){
            console.log('Error. No se pueden ingresar dos productos con el mismo code.')    
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
            const productsArray = await this.getProducts();
            productsArray.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productsArray));
            console.log('Se ha agregado el producto exitosamente.')
        }
    }

    async getProducts(queries){
        const productsFromFile = await fs.promises.readFile(this.path, 'utf-8');
        const productsArray = JSON.parse(productsFromFile);
        if (!productsArray) console.log('Error. Not found.')
        else{
            if(queries){
                const { limit } = queries;
                return productsArray.slice(0, limit)
            }else{
                return productsArray
            }
        }    
    }

    async getProductById(id){
        const productsArray = await this.getProducts();
        const productFound = productsArray.find(product => product.id === id);
        if (!productFound) console.log('Error. Not found.')
        else return productFound
    }

    async updateProduct(id, prop, value){
        const productsArray = await this.getProducts();
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
        const productsArray = await this.getProducts();
        if(productsArray.find(product => product.id === id)){
            const newProductsArray = productsArray.filter(product => product.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(newProductsArray))
            console.log('Se ha eliminado el producto exitosamente.')
        }else{
            console.log('Error. No se ha encontrado ningún producto con el id ingresado.')
        }
    }
}