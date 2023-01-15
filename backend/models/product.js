

const mongoose = require("mongoose");
// create un shema

const productShema = mongoose.Schema({

    description: String,
    userId: String,
    price: Number,
    quantity: Number,
    date: String,
    categorie: String,
    statut: String,
    avatar: String,

});

const product = mongoose.model("Product", productShema);
module.exports = product;