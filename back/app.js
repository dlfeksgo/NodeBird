// const http = require('http');
// const server = http.createServer((req, res) => {
// 	req.end('Hello node');
// });

// server.listen(3065, () => {
// 	console.log('서버 실행 중');
// });

const express = require('express');
const postRouter = require('./routes/post');
const db = require('./models');
const app = express();

db.sequelize
	.sync()
	.then(() => {
		console.log('db 연결 성공');
	})
	.catch(console.error);

//기본구조
app.get('/', (req, res) => {
	res.send('hello express');
});

//원래 /post가 있던 자리
app.use('post', postRouter);

app.listen(3065, () => {
	console.log('서버 실행 중');
});
