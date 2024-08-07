const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/signindata")
.then(()=>{
    console.log("Connection sucessfull .......");
})
.catch((err)=>{
    console.log("connection not established");
    console.log(err);
});





