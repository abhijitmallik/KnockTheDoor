module.exports = {
	server:{
		port:[3000]
	},
	dbURL:'mongodb://knockthedoor:laptoppc84@ds231245.mlab.com:31245/knockthedoor',
	redis:{
		host: process.env.REDISCLOUD_URL,
        port: 17586
	}
}