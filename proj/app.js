//jshint esversion:6
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const express = require("express");
const nyc = require("nyc");
const { spawn } = require('child_process')
const npx = require("npx");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mocha = require("mocha");
var passport = require("passport");
const bcrypt = require("bcrypt");
//const flash = require("express-flash");
const flash = require("connect-flash");
const session = require("express-session");
var passwordValidator = require('password-validator');
const mongoose = require('mongoose');
const { faCommentsDollar } = require('@fortawesome/free-solid-svg-icons');

//var foo = require('./foo.js');
//var bar = require('../lib/bar.js');
//var gamma = require('gamma');

const aboutContent = "Find Parking ..";

var SearchLocation;
var SearchVehicle;
var Arrivel;
var loggedinUser;
var time;
var amount =0;


const app = express();





app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())




//users models

const usersSchema = {
  userName: String,
  email: String,
  password: String,
  phone: String,
  isOwner: String,
  isCustomer: String,
  isAdmin: String
};

const User = mongoose.model("User", usersSchema);

//parking model
const parkingSchema = {
  seller_id: String,
  title: {
    type: String,
    //required: [false, "Please enter a Title."],
    unique: true
  },
  description: String,
  address: String,
  type: String,
  status: String,
  price: String,
  vehicle: String
};
const Parking = mongoose.model("Parking", parkingSchema);


//cart model
const orderSchema = {
  buyer_id: String,
  seller_id: String,
  item_id: String,
  Arrival: String,
  hours: String
}
const Order = mongoose.model("Order", orderSchema);






var passwordschema = new passwordValidator();
var phoneschema = new passwordValidator();
var usernameschema = new passwordValidator();

// Add properties to it
passwordschema
  .is().max(50) // Maximum length 25
  .has().uppercase() // Must have uppercase letters
  .has().digits(2) // Must have at least 2 digits
// Validate against a password string

phoneschema
  .is().min(10)
  .has().digits(10) // Minimum length 10


usernameschema
  .is().min(8) // Minimum length 8
  .has().not().spaces() // Should not have spaces
  .has().lowercase() // Must have lowercase letters



//////////////////gets


app.get("/signup", function(req, res) {
  res.render("signup", {
    message: req.flash("message")
  });
});


app.get("/login", function(req, res) {
  res.render("login", {
    message: req.flash("message")
  });
});


app.get("/", function(req, res) {
  res.render("homepage");
});

//
app.get("/map", function(req, res) {
  res.render("map");

});


app.get("/sort", function(req, res) {
  res.render("sort");

});


//cart functions
app.get("/cart", function(req, res) {
  res.render("cart");
});

app.get("/parkings", function(req, res) {
  Parking.find({}, function(err, posts) {
    res.render("parkings", {
      posts: posts,
      username : loggedinUser.userName
    });

  });
});


app.get("/ownerPage", function(req, res) {
  Parking.find({
    seller_id: loggedinUser._id
  }, function(err, posts) {
    res.render("ownerPage", {
      posts: posts,
      username : loggedinUser.userName
    });

  });
});

app.get("/home", function(req, res) {
  Parking.find({}, function(err, posts) {
    res.render("home", {
      posts: posts,
      username : loggedinUser.userName
    });

  });
});


app.get("/compose", function(req, res) {
  res.render("compose",
{username: loggedinUser.userName});
});

//:))))))

app.get("/composeAdmin", function(req, res) {
  res.render("composeAdmin", {username: loggedinUser.userName});
});




app.get("/addUser", function(req, res) {
  res.render("addUser", {
    message: req.flash("message"),
    username : loggedinUser.userName
  });
});


app.get("/ownerPage", function(req, res) {
  res.render("ownerPage",
{username: loggedinUser.userName});
});


app.get("/customerPage", function(req, res) {
  Parking.find({}, function(err, posts) {
    res.render("customerPage", {
      posts: posts,
      username: loggedinUser.userName
    });

  });
});


app.get("/adminPage", function(req, res) {
  res.render("adminPage",
{username: loggedinUser.userName});
});




app.get('/users', function(req, res) {
  User.find({}, function(err, foundUser) {
    res.render("users", {
      users: foundUser,
      username : loggedinUser.userName
    });

  });
});


app.get("/cart/:parkingId", function(req, res) {
  const requestedParkingId = req.params.parkingId;
  console.log(requestedParkingId);
  Parking.findOne({
    _id: requestedParkingId
  }, function(err, item) {
    if (err) {
      res.redirect("/customerPage");
    }

    try {
      if (item) {
        if (loggedinUser === null) {
          res.redirect("/login");
        }
        const order = new Order({
          buyer_id: loggedinUser._id,
          seller_id: item.seller_id,
          item_id: item._id,
          Arrival: Arrivel,
        });
        order.save(function(err) {
          if (!err) {
            console.log(Arrivel);
            res.render("buy", {
              title: item.title,
              description: item.description,
              price: item.price,
              username : loggedinUser.userName,
              arrival:Arrivel,
              time:req.body.time,
              item:item
            });
          }
        });
      }

    } catch (e) {
      res.redirect("/");
    }
  });
});


app.get("/edit/:id", function(req, res) {
  let parkingid = req.params.id;
  Parking.findOne({
    _id: parkingid,
    seller_id: loggedinUser._id
  }, function(err, parking) {
    if (parking) {
      res.render("edit", {
        message: req.flash("message"),
        title: parking.title,
        parking: parking._id,
        username : loggedinUser.userName
      });
    }
  });
});


//adminH
app.get("/editt/:id", function(req, res) {
  let parkingid = req.params.id;
  console.log(parkingid)
  console.log(loggedinUser._id)
  Parking.findOne({
    _id: parkingid,
  
  }, function(err, parking) {
    console.log(parking.title)
    console.log(parking._id)
    if (parking) {
      res.render("editAdmin", {
        message: req.flash("message"),
        title: parking.title,
        parking: parking._id,
        username : loggedinUser.userName
      });
    }
  });
});

 //edit Status
 app.get("/status/:id", function(req, res) {
  let parkingid = req.params.id;
  Parking.findOne({
    _id: parkingid,
    seller_id: loggedinUser._id
  }, function(err, parking) {
    console.log("***********");
    if (parking) {
      res.render("editStatus", {
        message: req.flash("message"),
        title: parking.title,
        vehicle: parking.vehicle,
        description: parking.description,
        address: parking.address,
        type: parking.type,
        status: parking.status,
        price: parking.price,
        parking:parking,
        username : loggedinUser.userName
      });
      console.log("***********");
    }
  });
});


app.get("/posts/:postId", function(req, res) {

  const requestedPostId = req.params.postId;
  console.log(requestedPostId);
  console.log( post.price);
  Parking.findOne({
    _id: requestedPostId,
  }, function(err, post) {

    res.render("post", {
      description: post.description,
      title: post.title,
      address: post.address,
      type: post.type,
      status: post.status,
      price: post.price,
      vehicle: post.vehicle,
      username : loggedinUser.userName
    });
  });

});


app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent,
    username : loggedinUser.userName
  });
});




//////////////////posts

app.post("/sort", function(req, res) {
  time = req.body.time
});


app.post("/cart/:parkingId", function(req, res) {


  const requestedParkingId = req.params.parkingId;


  console.log(requestedParkingId);
  Parking.findOne({
    _id: requestedParkingId
  }, function(err, item) {
    timet = req.body.time
    pricet = item.price
    console.log(timet);
    console.log(pricet);
    let amount = parseInt(timet)*parseInt(pricet);
    res.render("cheakout", {
      title: item.title,
      description: item.description,
      price: item.price,
      username : loggedinUser.userName,
      arrival:Arrivel,
      time:req.body.time,
      item: item,
      amount: amount

    });
  });


});



app.post("/edit/:id", function(req, res) {
  console.log("***********");
  let parkingid = req.params.id;
  console.log(parkingid);
  Parking.findOne({
    _id: parkingid
  }, function(err, parking) {
    try {
      if (parking) {
        console.log("***********");
        console.log(parking.title);
        console.log(req.body.description);
        console.log(req.body.address);
        console.log(req.body.type);
        console.log(req.body.status);
        console.log(req.body.price);
        console.log(req.body.vehicle);
        Parking.updateOne({
          _id:parking._id
        }, {
          seller_id: parking.seller_id,
          title: parking.title,
          description: req.body.description,
          address: req.body.address,
          type: req.body.type,
          status: req.body.status,
          price: req.body.price,
          vehicle: req.body.vehicle
        }, function(err, success) {
          if (err) {
            console.log("error");
          } else {
              req.flash("message", "Updated successfuly");
              res.render("edit" , {parking : parking ,title: parking.title,
              username : loggedinUser.userName, message: req.flash("message")} );
          }
        });

      }
    } catch (e) {

    }
  });
});


app.post("/editt/:id", function(req, res) {
  console.log("***********");
  let parkingid = req.params.id;
  console.log(parkingid);
  console.log(parking.title)
  console.log(parking.description)
  
  Parking.findOne({
    _id: parkingid
  }, function(err, parking) {
    try {
      if (parking) {
        console.log("***********");
        console.log(parking.title);
        console.log(req.body.description);
        console.log(req.body.address);
        console.log(req.body.type);
        console.log(req.body.status);
        console.log(req.body.price);
        console.log(req.body.vehicle);
        Parking.updateOne({
          _id:parking._id
        }, {
          seller_id: parking.seller_id,
          title: parking.title,
          description: req.body.description,
          address: req.body.address,
          type: req.body.type,
          status: req.body.status,
          price: req.body.price,
          vehicle: req.body.vehicle
        }, function(err, success) {
          if (err) {
            console.log("error");
          } else {
              req.flash("message", "Updated successfuly");
              res.render("editAdmin" , {parking : parking ,title: parking.title,
              username : loggedinUser.userName, message: req.flash("message")} );
          }
        });

      }
    } catch (e) {

    }
  });
});


 app.post("/status/:id", function(req, res) {
   console.log("***********");
   let parkingid = req.params.id;
   console.log(parkingid);
   console.log(parking.seller_id)
   console.log(parking.type)
   console.log(parking.vehicle)
   Parking.findOne({
     _id: parkingid
   }, function(err, parking) {
     try {
       if (parking) {
         Parking.updateOne({
           _id:parking._id
         }, {
           seller_id: parking.seller_id,
           title: parking.title,
           description: parking.description,
           address: parking.address,
           type: parking.type,
           status: req.body.status,
           price:parking.price,
           vehicle: parking.vehicle
         }, function(err, success) {
           if (err) {
             console.log("error");
           } else {
               req.flash("message", "Updated successfuly");
               res.render("editStatus" , {parking : parking ,title: parking.title,
               username : loggedinUser.userName, message: req.flash("message")} );
           }
         });

       }
     } catch (e) {

     }
   });
 });



app.post("/map", function(req, res) {
  SearchLocation = req.body.place
  SearchVehicle = req.body.vehicle
  Arrivel = req.body.arrival
  console.log(Arrivel);
  Parking.find({
    address: req.body.place,
    vehicle: req.body.vehicle
  }, function(err, posts) {
    res.render("sort", {
      result: posts,
      username : loggedinUser.userName
    });
  })
});



app.post("/available", function(req, res) {
  console.log(SearchLocation);
  console.log(SearchVehicle);
  Parking.find({
    status: "Available",
    address: SearchLocation,
    vehicle: SearchVehicle
  }, function(err, posts) {
    res.render("sort", {
      result: posts,
      username : loggedinUser.userName
    });
  });
});



app.post("/unavailable", function(req, res) {
  Parking.find({
    status: "Unavailable",
    address: SearchLocation,
    vehicle: SearchVehicle
  }, function(err, posts) {
    res.render("sort", {
      result: posts,
      username : loggedinUser.userName
    });
  });
});



app.post("/regular", function(req, res) {
  Parking.find({
    type: "Regular",
    address: SearchLocation,
    vehicle: SearchVehicle
  }, function(err, posts) {
    res.render("sort", {
      result: posts,
      username : loggedinUser.userName
    });
  });
});



app.post("/disabled", function(req, res) {
  Parking.find({
    type: "Disabled",
    address: SearchLocation,
    vehicle: SearchVehicle
  }, function(err, posts) {
    res.render("sort", {
      result: posts,
      username : loggedinUser.userName
    });
  });
});



app.post("/allavailable", function(req, res) {
  Parking.find({
    status: "Available"
  }, function(err, posts) {
    res.render("customerPage", {
      posts: posts,
      username : loggedinUser.userName
    });
  });
});



app.post("/allunavailable", function(req, res) {
  Parking.find({
    status: "Unavailable"
  }, function(err, posts) {
    res.render("customerPage", {
      posts: posts,
      username : loggedinUser.userName
    });
  });
});


app.post("/allregular", function(req, res) {
  Parking.find({
    type: "Regular"
  }, function(err, posts) {
    res.render("customerPage", {
      posts: posts,
      username : loggedinUser.userName
    });
  });
});


app.post("/alldisabled", function(req, res) {
  Parking.find({
    type: "Disabled"
  }, function(err, posts) {
    res.render("customerPage", {
      posts: posts,
      username : loggedinUser.userName
    });
  });
});


app.post("/carSort", function(req, res) {
  Parking.find({
    vehicle: "Car"
  }, function(err, posts) {
    res.render("customerPage", {
      posts: posts,
      username : loggedinUser.userName
    });
  });
});


app.post("/busSort", function(req, res) {
  Parking.find({
    vehicle: "Bus"
  }, function(err, posts) {
    res.render("customerPage", {
      posts: posts,
      username : loggedinUser.userName
    });
  });
});


app.post("/truckSort", function(req, res) {
  Parking.find({
    vehicle: "Truck"
  }, function(err, posts) {
    res.render("customerPage", {
      posts: posts,
      username : loggedinUser.userName
    });
  });
});


app.post("/motorcycleSort", function(req, res) {
  Parking.find({
    vehicle: "Motorcycle"
  }, function(err, posts) {
    res.render("customerPage", {
      posts: posts,
      username : loggedinUser.userName
    });
  });
});


app.post('/login', function(req, res) {
  const password = req.body.password;
  User.findOne({
    userName: req.body.username,

  }, function(err, user) {
    if (err) {
      res.json({
        error: err
      })
    }
    if (user) {
      if (req.body.password === user.password) {
        loggedinUser = user;
        console.log(loggedinUser);
        if (user.isOwner === "on") {
          res.redirect("/ownerPage");
        } else if (user.isAdmin === "on") {
          res.redirect("/home");
        } else {
          res.redirect("/customerPage");
        }
      } else {
        req.flash("message", "paswword not match!");
        res.redirect("/login");
      }
    } else {
      req.flash("message", "user not found !");
      res.redirect("/login");
    }
  });
});


app.post('/signup', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let users = new User({
      userName: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      isOwner: req.body.isOwner,
      isCustomer: req.body.isCustomer,

    });
    User.findOne({
      userName: req.body.username,

    }, function(err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
      if (!user) {
        if (passwordschema.validate(req.body.password)) {
          if (usernameschema.validate(req.body.username)) {
            if (phoneschema.validate(req.body.phone)) {
              users.save(function(err) {
                if (!err) {
                  res.redirect("/login");
                }
              });
            } else {
              req.flash("message", "phone number should have 10 digits");
              res.redirect("/signup");
            }
          } else {
            req.flash("message", "username should have for Min 8 letters,no spaces, lowcase");
            res.redirect("/signup");
          }

        } else {
          req.flash("message", "password should 1 uppercase letter and minimum of 2 digits");
          res.redirect("/signup");
        };

      } else {
        req.flash("message", "the user is already exist!");
        res.redirect("/signup");
      }
    });


  } catch {
    res.redirect('/signup')
  }
});


app.post('/addUser', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let users = new User({
      userName: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      isOwner: req.body.isOwner,
      isCustomer: req.body.isCustomer,

    });
    User.findOne({
      userName: req.body.username,

    }, function(err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
      if (!user) {
        if (passwordschema.validate(req.body.password)) {
          if (usernameschema.validate(req.body.username)) {
            if (phoneschema.validate(req.body.phone)) {
              users.save(function(err) {
                if (!err) {
                  res.redirect("/users");
                }
              });
            } else {
              req.flash("message", "The phone should have a length of 10 digits of numbers");
              res.redirect("/addUser");
            }
          } else {
            req.flash("message", "The username should have a  Min length 8 and max 10 , no space , lowcase");
            res.redirect("/addUser");
          }

        } else {
          req.flash("message", "the password should have a max length of 15 characters, min of 1 uppercase letter and minimum of 2 digits");
          res.redirect("/addUser");
        };

      } else {
        req.flash("message", "the user is already exist!");
        res.redirect("/addUser");
      }
    });


  } catch {
    res.redirect('/signup')
  }
});


app.post("/compose", function(req, res) {
  let post = new Parking({
    seller_id: loggedinUser._id,
    title: req.body.postTitle,
    description: req.body.postDescription,
    address: req.body.place,
    type: req.body.postType,
    status: req.body.postStatus,
    price: req.body.postPrice,
    vehicle: req.body.Vehicle
  });


  post.save(function(err) {
    if (!err) {
      res.redirect("ownerPage");
    }

  });
});


app.post("/composeAdmin", function(req, res) {
  let post = new Parking({
    seller_id: loggedinUser._id,
    title: req.body.postTitle,
    description: req.body.postDescription,
    address: req.body.place,
    type: req.body.postType,
    status: req.body.postStatus,
    price: req.body.postPrice,
    vehicle: req.body.Vehicle
  });

  post.save(function(err) {
    if (!err) {
      res.redirect("/home");
    }
  });
});



app.post("/delete", function(req, res) {
  const deleted = req.body.deleting;
  console.log(deleted);
  User.findByIdAndRemove(deleted, function(err) {
    if (!err) {
      console.log("successfuly deleting cheked Item");
    }
  });
  res.redirect("users");
});


app.post("/postdelete", function(req, res) {
  const deleted = req.body.deleting;
  console.log(deleted);
  Parking.findByIdAndRemove(deleted, function(err) {
    if (!err) {
      console.log("successfuly deleting cheked Item");
    }
  });
  res.redirect("parkings");
});


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/home')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/home')
  }
  next()
}


module.exports = app;
/* eslint-enable */