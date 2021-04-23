const express = require("express");
const router = express.Router();

// authentication module
const auth = require("../auth/auth");

// controllers modules
const user_controller = require("../controllers/userController");

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));



router.route("/")  // admin

.get(auth, user_controller.get_all_users)  // get all users


router.route("/:id")  // admin

.get(auth, user_controller.get_one_user)  // get one user

.put(auth, user_controller.update_one_user)  // update one user

.delete(auth, user_controller.delete_one_user)  // delete one user


//login
router.route("/login") 

.post(user_controller.user_login)


//registration
router.route("/create")   

.post(auth, user_controller.create_user)  // register one users


module.exports = router

