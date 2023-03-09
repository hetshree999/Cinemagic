const mongoose = require("mongoose")
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

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
        type: String,
        default: "false",
        required: false
    },
    tokens:[
        {
            token:{
                type: String,
                required:true
            }
        }
    ]
})

TAdminSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12)
    }  
    next()
})

TAdminSchema.methods.generateAuthtoken = async function () {
    try {
        let token23 = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: token23 });
        await this.save();
        return token23;
    } catch (error) {
        res.status(422).json(error)
    }
}

const TAdmin = new mongoose.model("Theatreadmin", TAdminSchema);
module.exports = TAdmin;