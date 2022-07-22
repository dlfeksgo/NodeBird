const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Comment, User, Image, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
	fs.accessSync('uploads');
} catch (error) {
	console.log('uploads 폴더가 없어 새로 생성합니다.');
	fs.mkdirSync('uploads');
}

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, done) {
			done(null, 'uploads');
		},
		filename(req, file, done) {
			const ext = path.extname(file.originalname); //확장자
			const basename = path.basename(file.originalname, ext); //파일명
			done(null, basename + '_' + new Date().getTime() + ext);
		},
	}),
	limits: { fileSize: 20 * 1024 * 1024 },
});

router.get('/:postId', async (req, res, next) => {
	// GET /post
	try {
		const post = await Post.findOne({
			where: { id: req.params.postId },
		});
		if (!post) {
			return res.status(404).send('존재하지 않는 게시글입니다.');
		}
		const fullPost = await Post.findOne({
			where: { id: post.id },
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
		res.status(200).json(fullPost);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
	try {
		const hashtags = req.body.content.match(/(#[^\s#]+)/g);
		const post = await Post.create({
			content: req.body.content,
			UserId: req.user.id,
		});
		if (hashtags) {
			const result = await Promise.all(
				hashtags.map((tag) =>
					Hashtag.findOrCreate({
						where: { name: tag.slice(1).toLowerCase() },
					})
				)
			);
			await post.addHashtags(result.map((v) => v[0]));
		}
		if (req.body.image) {
			if (Array.isArray(req.body.image)) {
				const images = await Promise.all(
					req.body.image.map((image) => Image.create({ src: image }))
				);
				await post.addImages(images);
			} else {
				const image = await Image.create({ src: req.body.image });
				await post.addImages(image);
			}
		}
		const fullPost = await Post.findOne({
			where: { id: post.id },
			include: [
				{
					model: Image, //post.Images로 들어온다.
				},
				{
					model: Comment,
					include: [
						{
							model: User, // 댓글 작성자
							attributes: ['id', 'nickname'],
						},
					],
				},
				{
					model: User, // 게시글 작성자
					attributes: ['id', 'nickname'],
				},
				{
					model: User,
					as: 'Likers',
					attributes: ['id'],
				},
			],
		});
		res.status(201).json(fullPost);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.post(
	'/images',
	isLoggedIn,
	upload.array('image'),
	async (req, res, next) => {
		console.log(req.files); //업로드 된 이미지 정보
		res.json(req.files.map((v) => v.filename));
	}
);

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
			PostId: parseInt(req.params.postId, 10),
			UserId: req.user.id,
		});
		const fullComment = await Comment.findOne({
			where: { id: comment.id },
			include: [
				{
					model: User,
					attributes: ['id', 'nickname'],
				},
			],
		});
		res.status(201).json(fullComment); //프론트 saga로 전달
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
	//리트윗한 게시글을 찾아서 나의 새로운 게시글에 리트윗 데이터를 넣는다.
	try {
		const post = await Post.findOne({
			//리트윗할 게시물 찾기
			where: { id: req.params.postId },
			include: [
				{
					model: Post,
					as: 'Retweet', //post안에 Retweet이라는 항목이 생성된다.
				},
			],
		});
		if (!post) {
			return res.status(403).send('존재하지 않는 게시글입니다.');
		}
		if (
			req.user.id === post.UserId ||
			(post.Retweet && post.Retweet.UserId === req.user.id)
		) {
			return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
		}
		const retweetTargetId = post.RetweetId || post.id;
		const exPost = await Post.findOne({
			where: { UserId: req.user.id, RetweetId: retweetTargetId },
		});
		if (exPost) {
			return res.status(403).send('이미 리트윗 했습니다.');
		}
		const retweet = await Post.create({
			UserId: req.user.id,
			RetweetId: retweetTargetId,
			content: 'retweet',
		});
		console.log(retweet);
		const retweetWithPrevPost = await Post.findOne({
			where: { id: retweet.id },
			include: [
				{
					model: Post,
					as: 'Retweet', //Retweet이라는 이름으로 Post의 테이블 구조를 가져옴
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
					model: User,
					as: 'Likers',
					attributes: ['id'],
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
			],
		});
		res.status(200).json(retweetWithPrevPost);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
	try {
		const post = await Post.findOne({
			where: { id: req.params.postId },
		});
		if (!post) {
			return req.status(403).send('게시글이 존재하지 않습니다.');
		}
		await post.addLikers(req.user.id);
		res.json({ PostId: post.id, UserId: req.user.id });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
	try {
		const post = await Post.findOne({ where: { id: req.params.postId } });
		if (!post) {
			return res.status(403).send('게시글이 존재하지 않습니다.');
		}
		await post.removeLikers(req.user.id);
		res.json({ PostId: post.id, UserId: req.user.id });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
	try {
		await Post.destroy({
			where: { id: req.params.postId, UserId: req.user.id },
		});
		res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;
