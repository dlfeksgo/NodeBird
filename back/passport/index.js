const passport = require('passport');
const local = require('./local');

module.exports = () => {
	passport.serializeUser = (user, done) => {
		done(null, user.id);
	}; //app.js에 연결
	passport.deserializeUser = (id, done) => {};
	local(); //local.js에 연결
};
