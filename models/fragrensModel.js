const mongoose = require('mongoose')
const validator = require('validator');


const fragrensInfoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter  Name"],
        maxlength:[30,"Name can not Exceed more the 30 charecter"],
        // minlength:[4,"please more than 4 charecter"]
    },
   
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        // validate:[validator.isEmail,"Please Enter valid Email"]
    },
    rating:{
            type:Number,
    },
    product:{
        type:String,
        required:[true,"Please Select Product"]
    },
    dob:{
        type:String,
        required:[true, "Please Select your Date of Birth"]
    },

    Date:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("fragrensInfo",fragrensInfoSchema);
