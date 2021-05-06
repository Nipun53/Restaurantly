var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var flash=require("connect-flash");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var campground=require("./models/campground.js");
var comment = require("./models/comment.js");
var user=require("./models/user");
var seedDB=require("./seeds.js");
var methodOverride=require("method-override");
const port=process.env.PORT || 5000;

var campgroundRoutes=require("./routes/campgrounds.js"),
    commentRoutes=require("./routes/comments.js"),
    indexRoutes=require("./routes/index.js")

const { findOneAndReplace } = require("./models/comment.js");

// seedDB();

// mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true,useUnifiedTopology: true});
mongoose.connect("mongodb+srv://Nipun23:Nipun1@cluster0.po0nl.mongodb.net/test?retryWrites=true&w=majority");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname+"/public"));
app.use(require("express-session")({
    secret:"Once again rusty wins cutest dog",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    // console.log(currentUser);
    next();
});



var campgrounds=[{"name":"Kheerganga","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoAoEhhvaLT0jCiR_X8z9uCBw_5cMTpqLg7A&usqp=CAU"},
    {"name":"Triund","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoAoEhhvaLT0jCiR_X8z9uCBw_5cMTpqLg7A&usqp=CAU"},
    {"name":"Braham Tal","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoAoEhhvaLT0jCiR_X8z9uCBw_5cMTpqLg7A&usqp=CAU"}
];



app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/",indexRoutes);


app.listen(port,function(){
    console.log("YelpCamp Server started on port 5000");
});