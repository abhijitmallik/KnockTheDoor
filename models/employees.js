var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    title:String,
    age:Number,
    occupation:String,
    city:String,
    state:String,
    phone:Number,
    pin:Number	
});
var Employees = mongoose.model('Employee',employeeSchema);

module.exports = Employees;