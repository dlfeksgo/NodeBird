const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			async (email, password, done) => {
				try {
					const user = await User.findOne({
						where: { email: email },
					});
					if (!user) {
						return done(null, false, { reason: '존재하지 않는 이메일입니다.' });
					}
					const result = await bcrypt.compare(password, user.password);
					if (result) {
						return done(null, user); //done은 콜백인데 성공해서 user를 받았으니 다시 router로 돌아가자~
					}
					return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
				} catch (error) {
					console.error(error);
					return done(error);
				}
			}
		)
	);
};
