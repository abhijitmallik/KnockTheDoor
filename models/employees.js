let mongoose = require('mongoose');

let employeeSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    age:Number,
    occupation:String,
    password:String,
    reenterpassword:String,
    city:String,
    state:String,
    phone:String,
    pin:Number,
    email:String,
    dateOfJoin:Date,
    croppedImage:String,
    online:String,
    canAcceptSession:Boolean	
});
let Employees = mongoose.model('Employee',employeeSchema);

module.exports = Employees;