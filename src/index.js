const express=require('express');
const fs=require('fs');
const path=require('path');
const hbs=require('hbs');
require("./db/conn"); 
const Register=require("./models/register");
const College=require("./models/college");
const Message=require("./models/message");

const { error } = require('console');
const app=express();
const port=8000;

const viewsPath=path.join(__dirname, "../templates/views")
const partialPath=path.join(__dirname, "../templates/partial")
const publicPath=path.join(__dirname, "../public");

app.use(express.static(publicPath))

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'hbs');
app.set('views', viewsPath);




app.get('/', (req,res)=>{
    res.render("index");
});

app.get('/cutoff', (req,res)=>{
    res.render("cutoff");
});

// app.get('/index1', (req,res)=>{
//     res.render("index1");
// });
app.get('/cutoff2021', (req, res) => {
    const pdfPath = path.join(__dirname, '../public/pdf/cutoff2021.pdf'); 
    const file = fs.createReadStream(pdfPath);
    res.setHeader('Content-Type', 'application/pdf');
    file.pipe(res);
});
app.get('/cutoff2020', (req, res) => {
    const pdfPath = path.join(__dirname, '../public/pdf/cutoff2020.pdf'); 
    const file = fs.createReadStream(pdfPath);
    res.setHeader('Content-Type', 'application/pdf');
    file.pipe(res);
});
app.get('/cutoff2019', (req, res) => {
    const pdfPath = path.join(__dirname, '../public/pdf/cutoff2019.pdf'); 
    const file = fs.createReadStream(pdfPath);
    res.setHeader('Content-Type', 'application/pdf');
    file.pipe(res);
});

app.get('/cutoff2018', (req, res) => {
    const pdfPath = path.join(__dirname, '../public/pdf/cutoff2019.pdf'); 
    const file = fs.createReadStream(pdfPath);
    res.setHeader('Content-Type', 'application/pdf');
    file.pipe(res);
});



app.get('/news', (req,res)=>{
    res.render("NEWS");
});

app.get('/login', (req,res)=>{
    res.render("login");
});
app.get('/contactus', (req,res)=>{
    res.render("contactus");
});

// app.get('/predict', (req,res)=>{
//     res.render("predict");
// });
app.get('/signup', (req,res)=>{
    res.render("signup");
});

app.get('/getstarted', (req,res)=>{
    res.render("getstarted");
});

// post method for sginin
app.post('/signup', async (req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password===cpassword){
            const data=new Register({
                email:req.body.email,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
                phone:req.body.phone
    
            });
            const result=await data.save();
            res.status(201).render("getstarted");
        }else{
            res.send("Confirm Password and Entered Password are not matching.....");
        }  
    }catch(error){
        res.status(400).send("User already registered")
    }
});

app.post('/login', async (req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;

        const useremail=await Register.findOne({email:email});
        if(useremail.password===password){
            res.status(201).render("getstarted");
        }else{
            res.send("Invalid login details......")
        }

        
      } catch (error) {
        res.status(400).send("Invalid login details......");
 }
});

app.post('/contactus', async (req,res)=>{
    try {
        // const name=req.body.Name;
        // const message=req.body.Message;
        // const email=req.body.Email

        const data=new Message({
            Name:req.body.Name,
            Message:req.body.Message,
            Email:req.body.Email
        });
        const result=await data.save();
        // res.status(201).send("Mseeage sent");
        res.status(201).render("contactus");

        
      } catch (error) {
        res.status(400).send("404 EROOR");
 }
});

// // post method for college data
// app.post("/getstarted", async (req,res)=>{
//     try{
//         const percentile1=req.body.percentile;
//         const category1=req.body.category;

//         const result=await College
//         .find({Cutoff : {$lte : percentile1},Category : category1})
//         .select({_id:0,CollegeName:1,Branch:1,Cutoff:1});
//         // const result1=JSON.stringify(result);
//         // res.send(result);
//         // res.send(result);
//         // console.log(len);
//         // for(let a in result){
//             //     console.log("College : ", result[a].CollegeName);
//             //     console.log("Branch : " , result[a].Branch);
//             //     console.log("Cutoff : ", result[a].Cutoff);
//             //     console.log("\n");
//             // }
//         const len=result.length;
//         res.setHeader('Content-Type', 'text/html');
//         if(len!=0){
//             for(let a in result){
//                 // res.write(a);
//                 res.write(`<br/>${a})College :  ${result[a].CollegeName} <br/>Branch : ${result[a].Branch} <br/>Cutoff : ${result[a].Cutoff}`);
//                 res.write(`<br/>`);
//             }
//         }else{
//             res.write(`<h2>NO College</h2>`)
//         }
        
//     }
//     catch(error){
//         res.status(400).send("Unable to predict college");
//         console.log(error);
//     }
// })

app.post("/getstarted", async (req,res)=>{
    try{
      const percentile1=req.body.percentile;
      const category1=req.body.category;
      const branch1=req.body.branch;
      
      const min=percentile1-1;
      const min1=min-2;
      const min2=min1-10;
      
  
      const result=await College
      .find({[category1] : {$lte : percentile1 ,$gte : min},})
      .select({_id:0,CollegeName:1,Branch:1, [category1]: 1});

      const result1=await College
      .find({[category1] : {$lt : min ,$gte : min1},})
      .select({_id:0,CollegeName:1,Branch:1, [category1]: 1});

      const result2=await College
      .find({[category1] : {$lte : min1,$gte : min2 },})
      .select({_id:0,CollegeName:1,Branch:1, [category1]: 1});
  
      res.setHeader('Content-Type', 'text/html');
  
      if(result.length!=0 || result1.length!=0 || result2.length!=0){
        res.write('<!DOCTYPE html>');
        res.write('<html>');
        res.write('<head>');
        res.write('<link rel="stylesheet" type="text/css" href="css/style1.css">');
        res.write('</head>');
        res.write('<body>');
        res.write('<table>');
        // res.write('<tr>');
        // res.write('<th>Sr.No</th>');
        // res.write('<th>College</th>');
        // res.write('<th>Branch</th>');
        // res.write(`<th>Cutoff - ${category1}</th>`);
        // res.write('</tr>');

        res.write('<tr>');
        res.write(`<td style="text-align: center" colspan="4" rowspan="2"><h2><strong>(80% chances)</strong></h2></td>`);
        res.write('<tr>');
        
        res.write('<tr>');
        res.write('<th>Sr.No</th>');
        res.write('<th>College</th>');
        res.write('<th>Branch</th>');
        res.write(`<th>Cutoff - ${category1}</th>`);
        res.write('<tr>');
        
        let count=1;
        for(let a in result){
            res.write('<tr>');
            res.write(`<td>${count++}</td>`);
            res.write(`<td>${result[a].CollegeName}</td>`);
            res.write(`<td>${result[a].Branch}</td>`);
            res.write(`<td>${result[a][category1]}</td>`);
            res.write('</tr>');
        }

        res.write('<tr>');
        res.write(`<td style="text-align: center" colspan="4" rowspan="2"><h2><strong>(90% chances)</strong></h2></td>`);
        res.write('<tr>');

        res.write('<tr>');
        res.write('<th>Sr.No</th>');
        res.write('<th>College</th>');
        res.write('<th>Branch</th>');
        res.write(`<th>Cutoff - ${category1}</th>`);
        res.write('<tr>');


        for(let a in result1){
            res.write('<tr>');
            res.write(`<td>${count++}</td>`);
            res.write(`<td>${result1[a].CollegeName}</td>`);
            res.write(`<td>${result1[a].Branch}</td>`);
            res.write(`<td>${result1[a][category1]}</td>`);
            res.write('</tr>');
        }

        res.write('<tr>');
        res.write(`<td style="text-align: center" colspan="4" rowspan="2"><h2><strong>(100% chances)</strong></h2></td>`);
        res.write('<tr>');

        res.write('<tr>');
        res.write('<th>Sr.No</th>');
        res.write('<th>College</th>');
        res.write('<th>Branch</th>');
        res.write(`<th>Cutoff - ${category1}</th>`);
        res.write('<tr>');

        for(let a in result2){
            res.write('<tr>');
            res.write(`<td>${count++}</td>`);
            res.write(`<td>${result2[a].CollegeName}</td>`);
            res.write(`<td>${result2[a].Branch}</td>`);
            res.write(`<td>${result2[a][category1]}</td>`);
            res.write('</tr>');
        }
  
        res.write('</table>');

        res.write('<h1 style="text-align: center">THANK YOU</h1>');
        res.write(`<a href="/getstarted"><button class="back-button">Go Back</button></a>`);
        res.write('</body>');
        res.write('</html>');
      } else {
        res.write('<h2>No College</h2>');
      }
  
      res.end();
  
    } catch(err){
      console.log(err);
      res.send("Error : " + err.message);
    }
  });
  
  

// app.post("/getstarted", async (req,res)=>{
//     try{
//         const percentile1=req.body.percentile;
//         const category1=req.body.category;
//         const min=percentile1-10;

//         const result=await College
//         .find({[category1] : {$lte : percentile1 ,$gte : min},})
//         .select({_id:0,CollegeName:1,Branch:1,[category1]:1});

//         const len=result.length;
//         res.setHeader('Content-Type', 'text/html');
//         if(len!=0){
//             for(let a in result){
//                 res.write(`<br/>${a})College :  ${result[a].CollegeName} <br/>Branch : ${result[a].Branch} <br/>Cutoff : ${result[a][category1]}`);
//                 res.write(`<br/>`);
//             }
//         }else{
//             res.write(`<h2>NO College</h2>`)
//         }
        
//     }
//     catch(error){
//         res.status(400).send("Unable to predict college");
//         console.log(error);
//     }
// })


app.get('/help', (req,res)=>{
    res.send("HELP");
});

// app.get('*', (req,res)=>{
//     res.send("404", "EROOR");
// })

app.listen(port,"127.0.0.1",()=>{
    console.log(`Listening on port ${port}`);
});