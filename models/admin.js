var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
    userName:String,
    password:String
});
var AdminUser = mongoose.model('AdminUsers',adminSchema);

module.exports = AdminUser;