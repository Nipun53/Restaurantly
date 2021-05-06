var express=require("express");
var router=express.Router();
var campground=require("../models/campground.js");
var middleware=require("../middleware/index.js");

router.get("/",function(req, res){
    campground.find({},function(err,allCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/campgrounds",{campgrounds:allCampground,currentUser:req.user});
        }
    });
        
});


router.post("/",middleware.isLoggedIn,function(req, res){
    var a=req.body.name;
    var b=req.body.image;
    var c=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var newCampground={"name":a,"image":b,"description":c,"author":author};
    // campgrounds.push(newCampground);
    campground.create(newCampground,function(err,newlycreated){
        if(err){
            console.log(err);
        }
        else{
            console.log(newlycreated);
            res.redirect("/campgrounds");
        }
    });
    // res.redirect("/campgrounds");
});

//CREATE ROUTE
router.get("/new",middleware.isLoggedIn,function(req, res){
    res.render("campgrounds/new"); 
});


//SHOW ROUTE -Shows info about one campground
router.get("/:id",function(req, res){
    var a=req.params.id;
    campground.findById(a).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});

//EDIT CAMPGROUND
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
        campground.findById(req.params.id,function(err,foundCampground){
         res.render("campgrounds/edit",{campground:foundCampground});
     });    
});

//UPDATE ROUTE
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});


//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});



module.exports=router;