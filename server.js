import express from "express";
import fs from 'fs';

const app = express();

class ProductManager {
  constructor() {
      this.getProducts = [];
  }
  async addProducts(title, description, price, thumbnail, stock) {
    try{
     const producto ={
      id: this.#getMaxId() + 1,
      title,
      description,
      price,
      thumbnail,
      code: [],
      stock,
  };
  this.getProducts.push(producto);
  if(fs.existsSync('getProducts.json')){
    const getProducts = JSON.parse(await fs.promises.readFile('getProducts.json','utf8'));
    this.getProducts = getProducts;
    this.getProducts.push(producto);
  } else{
    this.getProducts.push(producto);
    fs.promises.writeFile('getProducts.json',JSON.stringify(this.getProducts))
  }

  }catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
getProductById(idProducto) {
  const producto = this.#getProducts(idProducto);
  if (producto) {
    if (!producto.includes(idProducto)) producto.push(idProducto);
    console.log(this.getProducts);
  } else {  
     console.log("El producto existe");
  }
}
#getMaxId() {
  let maxId = 0;
  this.getProducts.map((producto) => {
    if (producto.id > maxId) maxId = producto.id
  });
  return maxId;
}
#getProducts(idProducto) {
  return this.getProducts.find((producto) => producto.id === idProducto);
}
 
updateProduct(idProducto) {
  const producto = this.getProductById(this.getProducts);
  if (producto) {
    idProducto.title = this.title;
    idProducto.description = this.description;
  } else{
    console.log("el producto no existe");
  }
 
}

deleteProduct(idProducto){
  const producto = this.getProductById(this.getProducts);
  if (producto) {
    idProducto.title = this.title;
   
  }else{
   console.log("title not found");
  }

}

}
const productManager = new ProductManager();
productManager.addProducts("Producto 1 Mesa de comedor", "mesa de madera", 1400, "Sin imagen", 60);
productManager.addProducts("Producto 2 Sofa de sala", "Producto de sala", 1000, "Sin imagen", 100);
productManager.addProducts("Producto 3 silla", "silla de cocina", 230, "Sin imagen", 200);

const PORT = 8080;


app.get("/producto", (req, res) => {
  res.json(productManager); 
});

app.get("/producto/:pid", (req, res) => { 
  console.log(req);
  const {pid} = req.params; 
  console.log(pid);
  const product = productManager.find((product) => product.id == pid);
  res.json(product);
});  
app.listen(PORT, () => { 
    console.log('🔥listening on port ${PORT}');
});