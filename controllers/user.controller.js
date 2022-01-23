//const validatior = require("fastest-validator");
const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// function index (req, res){
//     models.User.findAll().then((result) => {
//         res.status(200).json({
//             mesage: "User founded!",
//             users: result,
//         })
//     }).catch((error) => {
//         res.status(400).json({
//             message: "Something went wrong",
//             error: error,
//         });
//     });
// }

function signUp(req, res){

    models.User.findOne({where: {email: req.body.email}}).then((result) => {
            if(result){
                res.status(400).json({
                    message: "Email already exists!"
                })
            }else{
                bcryptjs.genSalt(10, function(error, salt){
                    bcryptjs.hash(req.body.password, salt, function(error, hash){
                        const user = {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                        }
                    
                        // const schema = {
                        //     name = {type: "string", max: "20"},
                        //     email = {type: "email", unique: true, lowercase: true},
                        //     password = {type: "string", }
                        // }
                    
                        models.User.create(user).then((result) => {
                            res.status(200).json({
                                message: "User registered successfully",
                                data: result,
                            })
                        }).catch((error) => {
                            res.status(400).json({
                                message: "Something went wrong",
                                error: error,
                            })
                        });
                    });
                });
            }
    }).catch((error) => {
        res.status(400).json({
            message: "Something went wrong!",
            error: error,
        });
    });   
}

function login(req, res){
    models.User.findOne({where: {email:req.body.email}}).then((user) => {
        if(user === null){
            res.status(401).json({
                message: "Invalid credentials!",
            });
        }else{
            bcryptjs.compare(req.body.password, user.password, function(error, result){
                    if(result){
                        const token = jwt.sign({
                            email: user.email,
                            userId: user.id,
                        }, process.env.JWT_KEY, function(error, token){
                            res.status(200).json({
                                "message": "Authentication successful!",
                                "token": token,
                            })
                        });
                    }else{
                        res.status(401).json({
                            "message": "Invalid credentials!",
                        });
                    }
            });
        }
    }).catch((error) => {
        res.status(400).json({
            "message": "Something went wrong!",
            "error": error,
        });
    })
}

function show(req, res){
    const id = req.params.id;
    models.User.findByPk(id).then((result) => {
        res.status(200).json({
            message: "User founded!",
            data: result,
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
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    console.log(user);

    models.User.update(user, { where: {id: id}}).then((result) => {
        res.status(200).json({
            message: "User updated successfully",
            data: user,
        })
    }).catch((error) => {
        res.status(400).json({
            message: "Something went wrong",
            error: error,
        })
    });
}

function destroy(req, res){
    const id = req.params.id;
    models.User.destroy({where: {id: id}}).then((result) => {
        res.status(200).json({
            message: "User deleted!",
        });
    }).catch((error) => {
        res.status(400).json({
            message: "Something went wrong",
        })
    });
}


module.exports = {
   // index: index,
    signUp: signUp,
    login: login,
    show: show,
    update: update,
    destroy: destroy,
}