const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    q: {
        type: Array,
        required: true
    },
    a: {
        type: Array,
        required: true
    },
    topic: {
        type: String
    }
});

const Question = mongoose.model("qaReddit", QuestionSchema, "qaReddit");

module.exports = Question;