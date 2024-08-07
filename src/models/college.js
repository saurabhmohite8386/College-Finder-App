

const mongoose=require("mongoose");

// const collegeSchema=new mongoose.Schema({
//     CollegeName : {
//         type:String,
//         required:true,
//     },
    
//     Branch : {
//         type:String,
//         required:true
//     },
//     Category : {
//         type:String,
//         required:true
//     },
//     Gender : {
//         type:String,
//         // required:true
//     },
//     Cutoff : {
//         type:Number,
//         required:true,
//     }

    
// });

const collegeSchema=new mongoose.Schema({
    CollegeName : {
        type:String,
        required:true,
    },
    
    Branch : {
        type:String,
        required:true
    },
    // Category : {
    //     type:String,
    //     required:true
    // },
    // Gender : {
    //     type:String,
    //     // required:true
    // },
    // Cutoff : {
    //     type:Number,
    //     required:true
    // },
    GOPEN : {
        type:Number,
        required:true
    },
    GOBC : {
        type:Number,
        required:true
    },
    SC : {
        type:Number,
        required:true
    },
    ST : {
        type:Number,
        required:true
    },
    NT1 : {
        type:Number,
        required:true
    },
    NT2 : {
        type:Number,
        required:true
    },
    NT3 : {
        type:Number,
        required:true
    },
    TFWS : {
        type:Number,
        required:true
    }
    


    
});


const College123=new mongoose.model("College123",collegeSchema);

module.exports=College123;



