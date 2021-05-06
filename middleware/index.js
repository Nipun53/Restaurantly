var campground=require("../models/campground.js");
var comment=require("../models/comment.js");

var middleware={};
middleware.checkCampgroundOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                res.redirect("back");
            }
            else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        console.log("You need to be logged in to do that");
    }
}

middleware.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        console.log("You need to be logged in to do that");
    }
}

middleware.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first.");
    res.redirect("/login");
}
module.exports=middleware;