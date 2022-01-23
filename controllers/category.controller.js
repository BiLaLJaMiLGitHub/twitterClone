const models = require("../models");

function index(req, res){
    models.Category.findAll().then((result) => {
        res.status(200).json({
            message: "Category founded!",
            data: result,
        });
    }).catch((error) => {
        res.status(400).json({
            message: "Something went wrong!",
            error: error,
        });
    });
}

function save(req, res){
    const category = {
        name : req.body.name,
    }

    models.Category.create(category).then((result) => {
        res.status(200).json({
            message: "Category created successfully",
            data: category,
        });
    }).catch((error) => {
        res.status(400).json({
            message: "Something went wrong!",
            error: error,
        });
    });
}

function update(req, res){
    const id = req.params.id;
    const category = {
        name: req.body.name,
    }

    models.Category.update(category, {where: {id: id}}).then((result) => {
          if(result == 1){
            res.status(200).json({
                message: "Category updated successfully!",
                data: category,
            });
          }  else {
            res.status(200).json({
                message: "Category not found!",
            });
          }
        
    }).catch((error) => {
            res.status(400).json({
                message: "Something went wrong!",
                error: error,
            });
    });
}

function destroy(req, res){
    const id = req.params.id;

    models.Category.destroy({where: {id: id}}).then((result) => {
            res.status(200).json({
                message: "Category deleted successfully",
                data: result,
            })
    }).catch((error) => {
            res.status(400).json({
                message: "Something went wrong!",
                error: error,
            })
    });
}

module.exports = {
    index: index,
    save: save,
    update: update,
    destroy: destroy,
}