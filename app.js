//jshint esversion: 6

const express = require("express");
const bodyParser =require("body-parser");
const request = require("request");
const app = express();
var expressSanitizer = require("express-sanitizer");
app.set("view engine", "ejs");
app.use('/public', express.static('public'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());

  app.get("/", function(req, res){

   res.sendFile(__dirname+"/index.html");
	});

  app.post("/", function (req, res) {
  var q=req.sanitize(req.body.search);


    var options = {

      url : "http://www.omdbapi.com/?s="+q+"&apikey=bf05335c",
      method: "GET",
    };
    request(options, function(error, response, body){
      var data = JSON.parse(body);
      if(error && response.statusCode==200){
        res.sendFile(__dirname +"/failure.html");
        }
        else if(data.Response=='False') {
          res.sendFile(__dirname +"/failure.html");
        }
        else{

          res.render("result.ejs",{data:data});


	}

});

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.get("/result", function(req, res){
  res.redirect("/");
});

app.post("/result", function(req, res){
  res.redirect("/");
});




//Listen to the server

app.listen(process.env.PORT||3000, function(){
	console.log("Search Engine is starting")
});
