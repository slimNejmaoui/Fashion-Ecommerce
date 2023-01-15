
// import uniqueValidator

var uniqueValidator = require('mongoose-unique-validator');

// import mongoose


const mongoose = require("mongoose");
// create un shema

const userShema = mongoose.Schema({

    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    pwd: String,
    role: String,
    statut: String,
    avatar: String,


});

userShema.plugin(uniqueValidator);

const user = mongoose.model("User", userShema);
module.exports = user;