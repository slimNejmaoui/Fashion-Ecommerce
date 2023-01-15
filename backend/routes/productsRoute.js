const express = require('express')
const router = express.Router();

const Product = require("../models/product");
const User = require("../models/user");


const multer = require('multer')


const path = require('path');


// config images path 

router.use('/images', express.static(path.join('backend/images')))

// MIME_TYPE  (only images)

const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'

}
const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});


// traitements du request : get all Productses

router.get("/", (req, res) => {
    console.log("here into get all Products");

    Product.find().then((docs) => {

        res.json({ Products: docs });
    })


})

// traitements du request : get ProductseById

router.get("/:id", (req, res) => {
    console.log("here into get ProductseById", req.params.id);

    Product.findOne({ _id: req.params.id }).then((doc) => {

        res.json({ Product: doc });
    })





});



router.post("/addProduct", multer({ storage: storage }).single('img'),
    (req, res) => {
        User.findOne({ _id: req.body.userId }).then(
            (result) => {
                console.log("user", result);
                if (result.statut == 'NonActive') {
                    res.json({ message: "not access" })
                } else {
                    console.log("here into add annonce", req.body);
                    const url = req.protocol + '://' + req.get('host');
                    let product = new Product({
                        description: req.body.description,
                        price: req.body.price,
                        quantity: req.body.quantity,
                        userId: req.body.userId,
                        date: req.body.date,
                        categorie: req.body.categorie,
                        avatar: url + "/images/" + req.file.filename
                    });
                    product.save((err, doc) => {
                        if (err) {
                            res.json({ message: "error" })
                        } else {
                            res.json({ message: "added with success" })
                        }
                    })
                }
            })
    });


// traitements du request :delete Productses
router.delete("/:id", (req, res) => {
    console.log("here intà delete", req.params.id);

    Product.deleteOne({ _id: req.params.id }).then((response) => {
        console.log("here reponse from DB, ", response);

        if (response.deletedCount == 1) {

            res.json({ message: "delete widh success" });

        }

    })




})
// traitements du request :edit Productses

router.put("/:id", (req, res) => {


    console.log("here into edit Products Body", req.body);
    console.log("here into edit Products Id", req.params.id);


    Product.updateOne({ _id: req.body._id }, req.body).then((response) => {

        if (response.nModified == 1) {

            res.json({ message: "edit widh success" });

        }

    })






})

















module.exports = router;