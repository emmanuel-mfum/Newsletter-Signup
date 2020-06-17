const express = require("express"); // import the module Express in the app
const https = require("https"); // import the module https in the app
const bodyParser = require("body-parser"); // import the module body-parser

const app = express(); // initialize new Express app

app.use(bodyParser.urlencoded({extended:true})); // line of code required to use the module body-parser

app.use(express.static("public")); // allow us to refer to static files such as CSS or image by refering to its relative URL

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html"); // renders the html file when the route "/" is accesssed
});


app.post("/", function(req, res){ // taps into the data sent via a POST method
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  var data = { // data object to be sent to the Mailchimp API
    members: [ // we only add one subscriber at a time, so our array has only one object
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME: lastName
        }

      }
    ]
  }

  const jsonData = JSON.stringify(data); // converts the Javascript object data into JSON

  const url = "https://us**.api.mailchimp.com/3.0/lists/**********";
  const options = { // options of the https request
    method:"POST",
    auth:"*****:************"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html"); // renders the appropriate page if the request is sucessful
    }
    else{
      res.sendFile(__dirname + "/failure.html"); // renders the appropriate page if the request fails
    }
    response.on("data", function(data){
      console.log(JSON.parse(data)); // converts the data we get back from Mailchimp into JS
    })
  });

  request.write(jsonData); // sends the request
  request.end(); // signals that we are done with the request
});


app.post("/failure", function(req, res){
  res.redirect("/"); // redirects the user to the home route
});


app.listen(process.env.PORT || 3000, function(){ // the app can both run on the port 3000 or any port choosen by Heroku
  console.log("The server is running on port 3000.");
});
