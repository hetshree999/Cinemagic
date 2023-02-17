const mongoose = require("mongoose")
const validator = require("validator");

const TAdminSchema = new mongoose.Schema({
    tname: {
        type:String, 
        required:true, 
        trim:true
    },
    temail: { 
        type:String, 
        required:true, 
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not valid Email!")
            }
        }
    },
    tpassword: { 
        type:String, 
        required:true,
        minlength:6
    },
    isApproved: {
        type: Boolean,
        default: false,
        required: false
    }
})

const TAdmin = new mongoose.model("Theatreadmin", TAdminSchema);
module.exports = TAdmin;