const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: { 
        type:String, 
        required:true, 
        trim:true 
    },
    email: { 
        type:String, 
        required:true, 
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not valid Email!")
            }
        }
    },
    password: { 
        type:String, 
        required:true,
        minlength:6
    },
    role: { 
        type:String, 
        default:"user"
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

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12)
    }  
    next()
})

userSchema.methods.generateAuthtoken = async function () {
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

// userSchema.methods.generateAuthToken = function () {
// 	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
// 		expiresIn: "1d",
// 	});
// 	return token;
// };

const User = new mongoose.model("users", userSchema);
module.exports = User;

// npm i validator  ----> install