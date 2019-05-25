const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const path = require("path");
var formidable = require('formidable');
const fs = require("fs")
const port =process.env.PORT||3000;
const formidableMiddleware = require('express-formidable');
const nodemailer=require("nodemailer");
app.engine("handlebars", hbs())
app.set('view engine', 'handlebars');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: __dirname + '/tmp',
    multiples: false,
}));

app.get("/", (req, res) => {

    res.render("index", { layout: false })
});


app.post("/upload", (req, res) => {
    console.log(req.files.name);
    // console.log(req.fields);
var newname=req.files.avatar.path + '.pdf'
    fs.rename(req.files.avatar.path,newname, (err, data) => {
        console.log(data);
        // console.log(err);
    });
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vinod.aadvik@gmail.com',
          pass: 'vinoth108'
        }
      });
      //machine leanring is an art
      var string=""
      for(var key in req.fields){
          string+= key+":"+req.fields[key]+"\n"
      }
      console.log(string)
      var mailOptions = {
        from: 'vinod.aadvik@gmail.com',
        to:"vinod.looser00@gmail.com",
        //to: 'linguisticsresearch@phoenicorn.com',
        subject: 'phosphene mails',
        text: string,
      
        attachments:[{filename:newname}]
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send("Thank you for your response ")
          
        }
      }); 
});
app.listen(port, (req, res) => {
    console.log("app is running on 1000")
})
