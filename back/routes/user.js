const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();

// POST /user
router.post('/', async (req, res, next) => {
	try {
		const exUser = await User.findOne({
			where: { email: req.body.email },
		});
		if (exUser) {
			return res.status(403).send('이미 등록된 이메일입니다.');
		}
		const hashedPassword = await bcrypt.hash(req.body.password, 12);
		await User.create({
			email: req.body.email,
			nickname: req.body.nickname,
			password: hashedPassword,
		});
		res.status(201).send('하이');
	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = router;
