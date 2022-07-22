const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

const passportConfig = () => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	}); //app.js에 연결
	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findOne({ where: id });
			done(null, user); //req.user.id
		} catch (error) {
			console.error(error);
			done(error);
		}
	});
	local(); //local.js에 연결
};

module.exports = passportConfig;
