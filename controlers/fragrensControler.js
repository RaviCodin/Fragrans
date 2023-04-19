const FragrensInfo = require("../models/fragrensModel");
const Errorhandler = require("../utils/errorhandler.js");
const catchAsyncError = require("../middleWare/catchAsyncError.js");
const sendEmail = require("../utils/Email");
const   sheetAdd = require("../utils/sheetsAdd");
// const cloudinery = require("cloudinary")




exports.createFragrensInfo = catchAsyncError(async (req, res, next) => {
  const { Name, Email, DOB, Rating, Product } = req.body;
  
  const  [name, email, dob, rating, product ]=[ Name, Email, DOB, Rating, Product ]
  
  // console.log(name, email, dob, rating, product)
  
  if(!name || !email || !dob || !rating || !product){
    console.log(name, email, dob, rating, product. req.body )
    next(new Errorhandler("Data not found", 403));
  }

  const fragrensInfo = await FragrensInfo.create({name, email, dob, rating, product });

  const subject = "Email from Fragrens";
  // const massage = "thankyou for join us.";
  const html =   `<h3>Email from ${email}</h3>
                  <h4>Name : ${name}</h4>
                  <h4>Product : ${product}</h4>
                  <h4>DOB : ${dob}</h4>
                  <h4>Rating : ${rating}</h4>`
  let EmailSendSeccess = ""
  console.log()
  try{
    await sendEmail({subject,html})
    EmailSendSeccess = "Email send Successfully."

  }catch(error){
    console.log(error)
    next(new Errorhandler(error.massage, 500));
  }
  try{
    
    sheetAdd({Name, Email, DOB, Rating, Product })
    

  }catch(error){
    console.log(error)
   
  }




  res.status(201).json({
    success: true,
    message: "Data Submit successfully",
    fragrensInfo,
    EmailSendSeccess
  });
});


// exports.getAlltodos = catchAsyncError(async (req, res, next) => {
//   // console.log("get blog")

//   const todos = await Todo.find();

//   if (!todos) {
//     next(new Errorhandler("todos not Found", 403));
//   }

//   res.status(200).json({
//     success: true,
//     todos,
//   });
// });


// exports.deleteTodo = catchAsyncError(async (req, res, next) => {
//   const todos = await Todo.findById(req.params.id);
// // console.log("delete",req.params.id)

//   if (!todos) {
//     next(new Errorhandler("todo not Found", 403));
//   }

//   await todos.remove();

//   res.status(200).json({
//     success: true,
//     message:"todo Deleted successfully"
//   });
// });

// exports.updateTodo = catchAsyncError(async (req, res, next) => {
 
//   let todos = await Todo.findById(req.params.id);

//   if (!todos) {
//     next(new Errorhandler("todos not Found", 403));
//   }
  
//   todos = await Todo.findByIdAndUpdate(req.params.id,req.body,{
//     new:true,
//     runValidators:true,
//     useFindAndModify:false
// })

//   res.status(200).json({
//     success: true,
//     message: "update successfully",
//   });
// });
