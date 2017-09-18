var path = require('path');

const webpack = require('webpack');

module.exports = {
	entry:'./public/javascripts/app.js',
	output:{
		filename:'production.js',
		path:path.resolve(__dirname,'production')
	},
	watch:true,
	module:{
		loaders: [
           {
           	 test:/\.js$/,
           	 exclude:/node_modules/,
           	 loader:'babel-loader',
           	 query:{
           	 	presets:['react','es2015','stage-1']
           	 }
           }
		]
	},
	plugins: [
	  new webpack.ProvidePlugin({
	    "React": "react",
	  }),
	]
}
