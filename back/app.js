const express = require('express');
const db = require('./models');
const app = express();

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

db.sequelize
	.sync()
	.then(() => {
		console.log('db 연결 성공');
	})
	.catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
