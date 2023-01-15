const express = require('express')
const router = express.Router();

const User = require("../models/user");

var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')



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





router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.send({
                message: "Auth failed no such user"
            })
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.pwd, user.pwd);
    }).then(result => {
        if (!result) {
            return res.send({
                message: "Auth failed inccorect password"
            })
        }
        const token = jwt.sign(
            {
                email: fetchedUser.email,
                userId: fetchedUser._id,
                userRole: fetchedUser.userRole,
                statut: fetchedUser.statut,

            },
            "secret_this_should_be_longer",
            { expiresIn: "5min" }
        );
        res.status(200).send({
            token: token,
            expiresIn: 300,
            userId: fetchedUser._id,
            userRole: fetchedUser.role,
            statut: fetchedUser.statut,


        });
        console.log('here role', fetchedUser.role);
    })
        .catch(e => {
            console.log(e)
        })
})




// traitements du request :signup users


router.post("/signup", multer({ storage: storage }).single('img'), (req, res) => {

    console.log("here into add users", req.body);

    bcrypt.hash(req.body.pwd, 10).then((cryptedpwd) => {

        const url = req.protocol + '://' + req.get('host');

        let user = new User({

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            pwd: cryptedpwd,
            role: req.body.role,
            statut: req.body.statut,
            avatar: url + '/images/' + req.file.filename


        })
        user.save((err, doc) => {
            if (err) {

                res.json({ message: "email existe" })
            } else {

                res.json({ message: "add widh success" });
            }


        });




    })




})


router.get("/", (req, res) => {

    console.log("here into get all Users");

    User.find().then((docs) => {

        res.json({ users: docs });
    })


})



// traitements du request : get userbyid




router.get("/:id", async (req, res) => {
    console.log("here into get userById", req.params.id);

    try {
        let user = await User.findOne({ _id: req.params.id })



        res.json({ user });



    } catch (error) {

    }



});

// traitements du request : delete user

router.delete("/:id", (req, res) => {
    console.log("here intà delete", req.params.id);

    User.deleteOne({ _id: req.params.id }).then((response) => {
        console.log("here reponse from DB, ", response);

        if (response.deletedCount == 1) {

            res.json({ message: "delete widh success" });

        }

    })
})

// traitements du request : edit user


router.put("/:id", (req, res) => {


    console.log("here into edit user Body", req.body);
    console.log("here into edit user Id", req.params.id);

    User.updateOne({ _id: req.body._id }, req.body).then((response) => {

        if (response.nModified == 1) {
            res.json({ message: "edit widh success" });

        }

    })

})















module.exports = router;