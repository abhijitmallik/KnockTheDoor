let mongoose = require('mongoose');

let adminSchema = mongoose.Schema({
    userName:String,
    password:String
});
let AdminUser = mongoose.model('AdminUsers',adminSchema);

module.exports = AdminUser;