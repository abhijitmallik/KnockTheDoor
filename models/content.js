var mongoose = require('mongoose');

var contentSchema = mongoose.Schema({
	title:String,
	desc:String,
    img:String,
    source:String,
    date:String,
});
var Contents = mongoose.model('Contents',contentSchema);

module.exports = Contents;