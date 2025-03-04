const mongoose = require('mongoose');
require('dotenv').config();

const URI = `mongodb+srv://${process.env.USUARIOBD}:${process.env.PASSBD}@clusteradsi.nzwbkjo.mongodb.net/${process.env.BD}`

mongoose.connect(URI)

module.exports = mongoose;