const express = require('express')
const router = express.Router();

const Commande = require("../models/commande");
const Product = require("../models/product");



/****traitement logique commandes *** */


const { ObjectId } = require("mongodb");





router.post("/", (req, res) => {
    console.log("this commande", req.body);

    Product.findOne({ _id: req.body.productId }).then((doc) => {

        console.log("object", req.body.productId);

        if (doc.quantity <= req.body.quantity) {

            let result = {

                quantity: doc.quantity,

            }

            res.json({ message: "quantity insuffisante", resultQuantity: result })
        }
        else {

            console.log("this is my new commande", req.body);
            let commande = new Commande({

                productId: ObjectId(req.body.productId),
                clientId: ObjectId(req.body.clientId),
                quantity: req.body.quantity,
                storeId: ObjectId(req.body.storeId),



            });

            commande.save((err, doc) => {
                if (err) {

                    res.json({ message: "problem" })
                } else {

                    res.json({ message: "add widh success" });
                }

            });


            Product.updateOne({ _id: req.body.productId }, { quantity: doc.quantity - req.body.quantity }).then((response) => { })


        }





    })




})




//*** commandse for Client */


router.get("/:id", (req, res) => {
    console.log("here into get commandeeById", req.params.id);




    Commande.aggregate(


        [
            { $match: { clientId: ObjectId(`${req.params.id}`) } },
            {
                $lookup: {
                    from: "products", // collection to join
                    localField: "productId", //field from the input documents
                    foreignField: "_id", //field from the documents of the "from" collection
                    as: "products", // output array field
                },
            },
            {
                $lookup: {
                    from: "users", // collection to join
                    localField: "storeId", //field from the input documents
                    foreignField: "_id", //field from the documents of the "from" collection
                    as: "stores", // output array field
                },
            },

        ],

        (error, docs) => {
            res.status(200).json({ commandeClient: docs });
            console.log(docs);
        }

    )






});


router.delete("/:id", (req, res) => {
    console.log("here intà delete", req.params.id);

    Commande.deleteOne({ _id: req.params.id }).then((response) => {
        console.log("here reponse from DB, ", response);

        if (response.deletedCount == 1) {

            res.json({ message: "delete widh success" });

        }

    })




})




router.get("/", (req, res) => {
    console.log("here id ", req.params.id);

    Commande.aggregate(
        [

            {
                $lookup: {
                    from: "products", // collection to join
                    localField: "productId", //field from the input documents
                    foreignField: "_id", //field from the documents of the "from" collection
                    as: "products", // output array field
                },
            },
            {
                $lookup: {
                    from: "users", // collection to join
                    localField: "storeId", //field from the input documents
                    foreignField: "_id", //field from the documents of the "from" collection
                    as: "stores", // output array field
                },
            },
        ],

        (error, docs) => {
            res.status(200).json({ order: docs });
            console.log(docs);
        }

    )


})


//*** commandse for store */
router.get("/Store/:id", (req, res) => {
    console.log("here into get ProductseById", req.params.id);

    Commande.aggregate(
        [
            { $match: { storeId: ObjectId(`${req.params.id}`) } },
            {
                $lookup: {
                    from: "products", // collection to join
                    localField: "productId", //field from the input documents
                    foreignField: "_id", //field from the documents of the "from" collection
                    as: "products", // output array field
                },
            },
            {
                $lookup: {
                    from: "users", // collection to join
                    localField: "clientId", //field from the input documents
                    foreignField: "_id", //field from the documents of the "from" collection
                    as: "clients", // output array field
                },
            },

        ],

        (error, docs) => {
            res.status(200).json({ storeCommande: docs });
            console.log(docs);
        }

    )

});


module.exports = router;