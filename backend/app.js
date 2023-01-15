
//***importation des modules **** */

// import express module
const express = require('express')

// import body-parser module

const commandesRoute = require('./routes/commandesRoute')
const productsRoute = require('./routes/productsRoute')
const userRoute = require('./routes/userRoute')


const bodyParser = require('body-parser')



// import monggoose module
// import Bcrypt module


// import multer module

const multer = require('multer')


const path = require('path');





const mongoose = require('mongoose');
// connect app to juilletDB
mongoose.connect('mongodb://localhost:27017/fashionDB');

//***importaion  models **** */

const User = require("./models/user");
const Product = require("./models/product");
const Commande = require("./models/commande");




const app = express();

//config app by baodyparser to parse object

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    ;
    next();
});

// config images path 

app.use('/images', express.static(path.join('backend/images')))

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




app.put("/change/:id", (req, res) => {


    console.log("here into edit user Body", req.body);
    console.log("here into edit user Id", req.params.id);

    User.updateOne({ _id: req.body.id }, { $set: { "statut": "true" } }).then((response) => {

        if (response.nModified == 1) {
            res.json({ message: "edit widh success" });

        }

    })

})



/****traitement logique store *** */

// traitements du request : get ProductseById
app.get("/store/:id", (req, res) => {
    console.log("here into get ProductseById", req.params.id);

    Product.find({ userId: req.params.id }).then((doc) => {

        res.json({ storeProduct: doc });
    })





});


app.delete("/store/:id", (req, res) => {
    console.log("here intà delete", req.params.id);

    Commande.deleteOne({ _id: req.params.id }).then((response) => {
        console.log("here reponse from DB, ", response);

        if (response.deletedCount == 1) {

            res.json({ message: "delete widh success" });

        }

    })




})



// *** nodemailer//



// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'slim.nejmawii@gmail.com',
//         pass: 'xhssswbldjsitsls'
//     }
// });

// var mailOptions = {
//     from: 'slim.nejmawii@gmail.com',
//     to: 'achrefnajar1@gmail.com',
//     subject: 'Sending Email using nodemailer',
//     text: 'hello!'
// };

// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });




app.use('/commandes', commandesRoute);
app.use('/products', productsRoute);
app.use('/users', userRoute);






// app is importable from another files

module.exports = app;