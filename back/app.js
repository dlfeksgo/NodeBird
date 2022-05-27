const express = require('express');
const db = require('./models');
const cors = require('cors');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const passportConfig = require('./passport');

dotenv.config();

db.sequelize
	.sync()
	.then(() => {
		console.log('db 연결 성공');
	})
	.catch(console.error);

passportConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	session({
		saveUninitialized: false,
		resave: false,
		secret: process.env.COOKIE_SECRET,
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: '*',
		credentials: true, //쿠키도 같이 전달
	})
);

//기본구조
app.get('/', (req, res) => {
	res.send('hello express');
});

//원래 /post가 있던 자리
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
	console.log('서버 실행 중!');
});
