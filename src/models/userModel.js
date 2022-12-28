const mongoose= require("mongoose")


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true
    },
    
    mobile:{
        type: Number
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{type: String},
    state:{type: String},
    city:{type:String},
    description:{String},
    image:{type:String,
        required: true}
})
module.exports = mongoose.model('User', userSchema)

