var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/cat_app",{useNewUrlParser:true,useUnifiedTopology: true});
var catSchema=new mongoose.Schema({
    "name":String,
    "age":Number,
    "temperament":String
});
var Cat=mongoose.model("Cat",catSchema);
// var george=new Cat({
//     "name":"George",
//     "age":12,
//     "temperament":"Grouchy"
// });
// george.save(function(err, cat){
//     if(err){
//         console.log("Something went wrong");
//     }
//     else{
//         console.log("WE just added a cat to database");
//         console.log(cat);
//     }
// });

// another and most commonly used method use to add data
// Cat.create({
//     "name":"Snow White",
//     age:15,
//     temperament:"bland"
// },function(err,cat){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(cat);
//     }
// });
 // Retrieving data from database
 Cat.find({name:"Snow White"},function(err,cats){  // here we write empty curly brackets bcz we don't want any particular cat.
 //if we are finding cats from cat database using cmd thn we need to write db.cats.find but if we finding cat in code we only write cat.find().
     if(err){
         console.log("OOPs!");
     }
     else{
         console.log(cats); // here we are printing what's coming back from server.
     }
 });