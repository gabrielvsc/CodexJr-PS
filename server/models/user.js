const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

// Creating UserSchema
const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, select: false},
});                                                     

// Generate token with jwt
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"})
    return token;
};

// Creating User
const User = mongoose.model("user", userSchema);

// Creating Validate with Joi
const validate = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().required().label("Full Name"),
        gender: Joi.string().required().label("Gender"),
        age: Joi.number().required().label("Age"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    
    return schema.validate(data);
};

// Export
module.exports = { User, validate };