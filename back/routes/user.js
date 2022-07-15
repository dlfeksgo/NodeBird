const express = require('express');
const { User, Post, Comment, Image } = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');

const { Op } = require('sequelize');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', async (req, res, next) => {
	try {
		if (req.user) {
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

//팔로우&팔로잉 정보 가져오기
router.get('/followers', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { id: req.user.id },
		});
		if (!user) {
			res.status(403).send('없는 사람을 찾으려고 하시네요?');
		}
		const followers = await user.getFollowers({
			attributes: ['id', 'nickname'],
			// limit: parseInt(req.query.limit, 10),
		});
		res.status(200).json(followers);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.get('/followings', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { id: req.user.id },
		});
		if (!user) {
			res.status(403).send('없는 사람을 찾으려고 하시네요?');
		}
		const followings = await user.getFollowings({
			attributes: ['id', 'nickname'],
			// limit: parseInt(req.query.limit, 10),
		});
		res.status(200).json(followings);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

//user/1
router.get('/:userId', async (req, res, next) => {
	try {
		const fullUserWithoutPassword = await User.findOne({
			where: { id: req.params.userId },
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
		if (fullUserWithoutPassword) {
			const data = fullUserWithoutPassword.toJSON();
			data.Posts = data.Posts.length;
			data.Followings = data.Followings.length;
			data.Followers = data.Followers.length;
			res.status(200).json(data);
		} else {
			res.status(404).json('존재하지 않는 사용자입니다.');
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.get('/:userId/posts', async (req, res, next) => {
	// GET /user/1/posts
	try {
		const where = { UserId: req.params.userId };
		if (parseInt(req.query.lastId, 10)) {
			where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
		}
		const posts = await Post.findAll({
			where,
			limit: 10,
			order: [
				['createdAt', 'DESC'],
				[Comment, 'createdAt', 'DESC'],
			],
			include: [
				{
					model: Post,
					as: 'Retweet',
					include: [
						{
							model: User,
							attributes: ['id', 'nickname'],
						},
						{
							model: Image,
						},
					],
				},
				{
					model: User,
					attributes: ['id', 'nickname'],
				},
				{
					model: Image,
				},
				{
					model: Comment,
					include: [
						{
							model: User,
							attributes: ['id', 'nickname'],
						},
					],
				},
				{
					model: User,
					as: 'Likers',
					attributes: ['id'],
				},
			],
		});
		res.status(200).json(posts);
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
		console.error(error);
		next(error);
	}
});

router.post('/logout', isLoggedIn, (req, res) => {
	req.logout(() => {
		res.redirect('/');
	});
	// req.session.destroy();
	// res.send('빠잉~');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
	try {
		await User.update(
			{
				nickname: req.body.nickname, //1. 어떤걸 바꿀래 ?
			},
			{
				where: { id: req.user.id }, //2. 어디에서 ?
			}
		);
		res.status(200).json({ nickname: req.body.nickname });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.patch('/:userId/follow', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { id: req.params.userId }, //팔로우 할 사람 찾고
		});
		await user.addFollowers(req.user.id);
		res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.delete('/:userId/follow', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { id: req.params.userId },
		});
		await user.removeFollowers(req.user.id);
		res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;
