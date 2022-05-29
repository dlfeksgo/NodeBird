const express = require('express');
const { User, Post } = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', async (req, res, next) => {
	try {
		if (req.user) {
			const user = await User.findOne({
				where: { id: req.user.id },
			});
			const fullUserWithoutPassword = await User.findOne({
				where: { id: req.user.id },
				attributes: {
					exclude: ['password'],
				},
				include: [
					{
						model: Post,
						attributes: ['id'],
					},
					{
						model: User,
						as: 'Followings',
						attributes: ['id'],
					},
					{
						model: User,
						as: 'Followers',
						attributes: ['id'],
					},
				],
			});
			res.status(200).json(fullUserWithoutPassword);
		} else {
			res.status(200).json(null);
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
	passport.authenticate('local', (err, user, option) => {
		if (err) {
			console.error(err);
			return next(err);
		}
		if (option) {
			return res.status(401).send(option.reason);
		}
		return req.login(user, async (loginErr) => {
			if (loginErr) {
				console.error(loginErr);
				return next(loginErr);
			}
			const fullUserWithoutPassword = await User.findOne({
				where: { id: user.id },
				attributes: {
					exclude: ['password'],
				},
				include: [
					{
						model: Post,
					},
					{
						model: User,
						as: 'Followings',
					},
					{
						model: User,
						as: 'Followers',
					},
				],
			});
			return res.status(200).json(fullUserWithoutPassword);
		});
	})(req, res, next);
});

// POST /user
router.post('/', isNotLoggedIn, async (req, res, next) => {
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

router.post('/logout', isLoggedIn, (req, res) => {
	req.logout(() => {
		res.redirect('/');
	});
	req.session.destroy();
	res.send('빠잉~');
});

module.exports = router;
