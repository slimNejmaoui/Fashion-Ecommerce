
const mongoose = require("mongoose");
// create un shema

const commandeShema = mongoose.Schema({

    quantity: Number,
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },


});

const commande = mongoose.model("Commande", commandeShema);
module.exports = commande;