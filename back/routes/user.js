const express = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res) => {
	// POST /user/마지막테스트
	await User.create({
		email: req.body.email,
		nickname: req.body.nickname,
		password: req.body.password,
	});
	res.send('하이');
});

module.exports = router;
