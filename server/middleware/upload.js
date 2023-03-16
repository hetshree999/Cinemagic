// const path = require('path')
// const multer = require('multer')
// const express = require('express')
// const router = require("express").Router();
// router.use(express.static(__dirname + "./public/"))

// var storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, 'public/uploads/')
//     },
//     filename: function(req, file, cb){
//         let ext = path.extname(file.originalname)
//         cb(null, Date.now() + ext)
//     }
// })

// var upload = multer({
//     storage: storage,
//     fileFilter: function(req, file, callback){
//         if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg'){
//             console.log("done")
//             callback(null, true)
//         } else {
//             console.log('only jpg and png file supported!')
//         }
//     }
// })

// module.exports = upload