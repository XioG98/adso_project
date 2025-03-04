const express = require('express')
const router = express.Router()
const modeloProducto = require('../models/products.model')

router.get('/productos', async (req, res) => {
    let listaProductos = await modeloProducto.find();
    if (listaProductos) {
        res.status(200).json(listaProductos)
    } else {
        res.status(500).json({ error });
    }
})

module.exports = router