const express = require("express");
const router = express.Router();

// authentication module
const auth = require("../auth/auth");

// controllers modules
const question_controller = require("../controllers/questionController");

const bodyParser = require("body-parser")
router.use(bodyParser.urlencoded({extended: true}))


router.route("/")

.get(auth, question_controller.get_all_questions)

.post(auth, question_controller.create_question);


router.route("/:id")

.get(auth, question_controller.getOneQuestion)

.put(auth, question_controller.updateQuestion)

.delete(auth, question_controller.deleteQuestion)

module.exports = router
