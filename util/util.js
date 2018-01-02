const bcrypt   = require('bcrypt-nodejs');
module.exports.util = {
	// generating a hash
	generateHash:function(password) {
	    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	},
	// checking if password is valid
	validPassword:function(password,checkpassword) {
		console.log("===password===",password);
		console.log("====checkpassword===",checkpassword);
		console.log("return check val",bcrypt.compareSync(password, checkpassword));
	    return bcrypt.compareSync(password, checkpassword);
	}
}