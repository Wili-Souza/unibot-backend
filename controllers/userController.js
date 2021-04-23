require("dotenv").config()

const User = require("../models/userModel");

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltRounds = 10

exports.user_login_get = (req, res) => {
    res.send("LOGIN PAGE")
}

// Login - authentication
exports.user_login = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.countDocuments({ email: email }, (err, c) => {
        if (err) { res.status(500).json({ error: true, message: 'internal error'}); }
        if ( c > 0) {
            User.findOne({ email: email }, (err, data) => {
                bcrypt.compare(password, data.password, function(err, result) {
                    if (err) {
                        res.status(400).send({error: true, message: "internal error"})
                    }
                    if (result) {
                        const id = data.user_id
                        const token = jwt.sign({ id }, process.env.SECRET, {
                            expiresIn: 1800 // 15min
                        })
                        return res.status(200).json({ auth: true, token: token })
                    } 

                    res.status(401).json({
                        success: false, message: 'password incorrect'
                    });

                });
            })
        } else {
            res.status(401).json({
                error: true, 
                message: 'email not registered'
            });
        }
    })

}

// register
exports.create_user = (req, res) => {
    const email = req.body.email
    var admin = req.body.admin
    var password = req.body.password

    User.countDocuments({ email: email }, (err, c) => {
        if (err) {
            res.status(500).json({
                error: true, 
                message: 'internal error'
            });
        }

        if ( c === 0) {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        error: true, message: 'error during registration, try again later'
                    });
                } else {
                    if (admin !== true) {
                        admin = false;
                    }
    
                    const newUser = new User({
                        email: email,
                        password: hash,
                        admin: admin
                    })
    
                    newUser.save((err, user) => {
                        if (err) {
                            res.status(500).send(err);
                        }
                        res.status(200).json(user);
                    });
                }
            });
        } else {
            res.status(401).json({
                error: true, 
                message: 'email already registered'
            });
        }

    })

}


exports.get_all_users = (req, res) => {
    User.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: true, 
                message: 'internal error'
            });
        }
        res.status(200).send(data)
    })
}

exports.get_one_user = (req, res) => {
    const userId = req.params.id;

    User.find({ _id: userId })
    .then( response => {
        res.status(200).send(response);
    }, err => {
        console.log(err)
        res.status(500).send(err);
    });
}

exports.update_one_user = (req, res) => {
    const userId = req.params.id;
    
    const email = req.body.email
    var admin = req.body.admin
    var password = req.body.password

    User.find({ _id: userId }, (err, data) => {
        if (err) { 
            res.status(500).send({error:true, message:"internal error"}) 
        }

        if (email !== data.email) {
            User.countDocuments({ email:email }, (err, c) => {
                if (err) { 
                    res.status(500).send({error:true, message:"internal error"}) 
                }
                if (c > 0) {
                    res.status(500).send({
                        success: false, 
                        message: "Email already registered"
                    })
                }
                if (admin !== true) { admin = false }

                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) { 
                        res.status(500).send({error:true, message:"internal error"}) 
                    }

                    const updatedUser ={
                        email: email,
                        password: hash,
                        admin: admin
                    }

                    User.findOneAndUpdate(
                        { _id: userId },
                        updatedUser
                    ).then((response) => {
                        res.status(200).send(response);
                    }, err => {
                        console.log(err);
                        res.status(500).send(err);
                    });
                })
            })
        }
    })
}

exports.delete_one_user = (req, res) => {
    const userId = req.params.id;

    User.findOneAndDelete({ _id: userId })
    .then( () => {
        res.status(200).send("success");
    }, err => {
        console.log(err)
        res.status(500).send(err);
    });
}
