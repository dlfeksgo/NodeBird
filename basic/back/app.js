const express = require('express');
const db = require('./models');
const cors = require('cors');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const postsRouter = require('./routes/posts');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const passportConfig = require('./passport');

dotenv.config();

db.sequelize
	.sync()
	.then(() => {
		console.log('db 연결 성공');
	})
	.catch(console.error);

passportConfig();

app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, 'uploads')));
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
		origin: 'http://localhost:3000',
		credentials: true, //쿠키도 같이 전달
	})
);

//기본구조
app.get('/', (req, res) => {
	res.send('hello express');
});

//원래 /post가 있던 자리
app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(3065, () => {
	console.log('서버 실행 중!');
});
