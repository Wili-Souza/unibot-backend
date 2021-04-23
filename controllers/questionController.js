const Question = require("../models/questionModel");

exports.get_all_questions = (req, res) => {
    console.log("get all...")
    Question.find({})
    .then( response => {
        res.status(200).send(response);
    }, err => {
        console.log(err)
        res.status(500).send(err);
    })   
}

exports.create_question = (req, res) => {
    const q = req.body.q;
    const a = req.body.a;
    const topic = req.body.topic;

    let newQuestion = new Question ({
        q: q,
        a: a,
        topic: topic
    });

    newQuestion.save((err, question) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(question);
    });
}


exports.getOneQuestion = (req, res) => {
    const questionId = req.params.id;

    Question.find({ _id: questionId })
    .then( response => {
        res.status(200).send(response);
    }, err => {
        console.log(err)
        res.status(500).send(err);
    });
}

exports.deleteQuestion = (req, res) => {
    const questionId = req.params.id;

    Question.findOneAndDelete({ _id: questionId })
    .then( () => {
        res.status(200).send("success");
    }, err => {
        console.log(err)
        res.status(500).send(err);
    });
    
}

exports.updateQuestion = (req, res) => {
    const questionId = req.params.id;

    const q = req.body.q;
    const a = req.body.a;
    const topic = req.body.topic;

    const updatedQuestion = {
        q: q,
        a: a,
        topic: topic
    };

    Question.findOneAndUpdate(
        { _id: questionId },
        updatedQuestion
    ).then((response) => {
        res.status(200).send(response);
    }, err => {
        console.log(err);
        res.status(500).send(err);
    });
}


    