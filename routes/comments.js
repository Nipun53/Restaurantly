var express=require("express");
var router=express.Router({mergeParams:true});
var campground=require("../models/campground.js");

var comment=require("../models/comment.js");
var middleware=require("../middleware/index.js");
const { isLoggedIn } = require("../middleware/index.js");

//================
//MENU ROUTE
router.get("/new",middleware.checkCampgroundOwnership,function(req,res){
    campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:campground});
        }
    });
});

router.post("/",middleware.checkCampgroundOwnership,function(req,res){
    campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
});

//EDIT COMMENT ROUTE
router.get("/:comment_id/edit",middleware.checkCampgroundOwnership,function(req,res){
    comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
    });
});


//UPDATE COMMENT
router.put("/:comment_id",middleware.checkCampgroundOwnership,function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
router.get("/watch",middleware.isLoggedIn,function(req,res){
    
    res.render("comments/watch");
});

//DELETE ROUTE
router.delete("/:comment_id",middleware.checkCampgroundOwnership,function(req,res){
    comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});




module.exports=router;