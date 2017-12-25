var mongoose = require('mongoose');

var contentSchema = mongoose.Schema({
    id:String,
    desc:String
});
var Contents = mongoose.model('Contents',contentSchema);

module.exports = Contents;