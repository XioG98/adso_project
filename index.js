const exp = require('express');
require('dotenv').config();
const modeloProducto = require('./src/models/products.model');



const app = exp(); //Constructor de express
const enrutador = require('./src/routes/router')

app.use(exp.urlencoded({extended: false})); 
app.use(exp.json());

app.use('/v1', enrutador)


// app.get('/productos', );



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