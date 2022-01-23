const models = require("../models");

function index(req, res){
    models.Tweet.findAll().then((result) => {
        res.status(200).json({
            message: "Record founded!",
            data: result,
            });
        }).catch((error) => {
            res.status(400).json({
                message: "Something went wrong!",
                error: error,
            })
        });
}

function show(req, res){
    const id = req.params.id;

    models.Tweet.findByPk(id).then((result) => {
        res.status(200).json({
                message: "Tweet founded!",
                tweet: result,
            });
        }).catch((error) => {
        res.status(400).json({
            message: "Something went wrong!",
            error: error,
            });
    });
}

function save(req, res){
    const tweet = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: 1,
    }

    models.Tweet.create(tweet).then((result) => {
        res.status(201).json({
            message: "Tweet created successfully",
            data: result
                });
            }).catch((error) => {
            res.status(400).json({
                message: "Something went wrong",
                error: error,
            });
        });
}

function update(req, res){
    const id = req.params.id;
    const updatedTweet = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
    }

    const userId = 1;

    models.Tweet.update(updatedTweet, {where: { id: id, userId: userId}}).then((result) => {
        res.status(200).json({
            message: "Tweet updated successfully",
            data: updatedTweet,
             });
        }).catch((error) => {
            res.status(400).json({
                message: "Something went wrong",
                error: error,
            });
        });
}

function destroy(req, res){
    const id = req.params.id;
    const userId = 1;

    models.Tweet.destroy({where: {id: id, userId: userId}}).then((result) => {
        res.status(200).json({
            message: "Tweet deleted Successfully",
        }).catch((error) => {
        res.status(400).json({
            message: "Something went wrong",
            error: error,
            });
         });
    });
}



module.exports = {
    index: index,
    show: show, 
    save: save,
    update: update,
    destroy: destroy,
};