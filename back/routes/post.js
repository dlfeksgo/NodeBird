const express = require('express');
const { Post, Comment, User, Image } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
	try {
		const post = await Post.create({
			content: req.body.content,
			UserId: req.user.id,
		});
		const fullPost = await User.findOne({
			where: { id: post.id },
			attributes: {
				exclude: ['password'],
			},
			include: [
				{
					model: User,
				},
				{
					model: Image,
				},
				{
					model: Comment,
				},
			],
		});

		res.status(201).json(fullPost); //프론트 saga로 전달
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
	try {
		const post = await Post.findOne({
			where: { id: req.params.postId },
		});
		if (!post) {
			return res.status(403).send('존재하지 않는 게시물입니다.');
		}
		const comment = await Comment.create({
			content: req.body.content,
			PostId: req.params.postId,
			UserId: req.user.id,
		});
		res.status(201).json(comment); //프론트 saga로 전달
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.delete('/', (req, res) => {});

module.exports = router;
