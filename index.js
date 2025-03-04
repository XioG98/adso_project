const exp = require('express');
require('dotenv').config();
const modeloProducto = require('./src/models/products.model');


const app = exp(); //Constructor de express

app.use(exp.urlencoded({extended: false})); 
app.use(exp.json());


app.get('/productos', async (req, res) => {
    let listaProductos = await modeloProducto.find();
    if (listaProductos) {
        res.status(200).json(listaProductos)
    } else {
        res.status(500).json({ error });
    }
});

app.get('/productos/:ref', async (req,res)=>{
    let listaProductos = await modeloProducto.findOne({"referencia":req.params.id});
    console.log(listaProductos)
    res.json(listaProductos)
});

app.post('/productos',async (req,res)=>{  //hay save insert
    var nuevoProducto = new modeloProducto(
        {
        "referencia": req.body.ref,
        "nombre":  req.body.nom
        }
    );
  
    if (await nuevoProducto.save()){
        res.json({"respuesta":"registro exitoso"});
    }else{ 
        res.json({"respuesta":"Hubo un error"});
    }  
});
//patch
app.put('/productos/:id', async (req,res)=>{  //hay save insert

    var nuevoProducto = new modeloProducto(
    {
    "referencia": req.body.ref,
    "nombre":  req.body.nom
    }
);
if (await nuevoProducto.save()){
    res.json({"respuesta":"registro exitoso"});
}else{ 
    res.json({"respuesta":"Hubo un error"});
}  
})

app.listen(process.env.PORT, () => {
    console.log('Aplicacion corriendo en el puerto' + process.env.PORT);
});