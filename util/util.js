const bcrypt   = require('bcrypt-nodejs');
module.exports.util = {
	// generating a hash
	generateHash:function(password) {
	    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	},
	// checking if password is valid
	validPassword:function(password,checkpassword) {
	    return bcrypt.compareSync(password, checkpassword);
	},
    cookies:{
    	userLoogedIn:"",
    	adminLoggedIn:""
    }
}