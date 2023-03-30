const mongoose = require("mongoose")
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

// const TAdminSchema = new mongoose.Schema({
//     tname: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     temail: {
//         type: String,
//         required: true,
//         unique: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error("Not valid Email!")
//             }
//         }
//     },
//     tpassword: {
//         type: String,
//         required: true,
//         minlength: 6
//     },
//     gstNum: {
//         type: String,
//         required: true,
//         minlength: 15
//     },
//     isApproved: {
//         type: String,
//         default: "false"
//     }
// })

const TAdminSchema = new mongoose.Schema({
    tname: {
        type: String,
        required: true,
        trim: true
    },
    temail: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not valid Email!")
            }
        }
    },
    tpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    gstNum: {
        type: String,
        required: true,
        minlength: 15
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state : {
        type:String,
        required:true
    },
    pincode : {
        type: Number,
        required:true,
        minlength:6
    },
    inspectionDate:{
        type:Date,
        required:true
    },
    isApproved: {
        type: String,
        default: "false"
    }
})

TAdminSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.tpassword = await bcrypt.hash(this.password, 12)
    }  
    next()
})

TAdminSchema.methods.generateAuthtoken = async function () {
    try {
        let token23 = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
            expiresIn: "1d"
        });

        // this.tokens = this.tokens.concat({ token: token23 });
        // await this.save();
        return token23;
    } catch (error) {
        res.status(422).json(error)
    }
}

const TAdmin = new mongoose.model("Theatreadmin", TAdminSchema);
module.exports = TAdmin;