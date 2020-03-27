const router = require('express').Router();
const Post = require('../models/Post');

router
  .route('/')
  .post(async (req, res) => {
    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
      hidden: false
    });

    res.send(`blog post ${post.title} created with id: ${post._id}`);
  })
  .get(async (req, res) => {
    res.send(
      await Post.find({ hidden: false })
        .where('date')
        .gt(new Date(new Date().setFullYear(new Date().getFullYear() - 1)))
    );
  });

router
  .route('/:id')
  .get(async (req, res) => {
    res.send(await Post.findById(req.params.id));
  })
  .patch(async (req, res) => {
    const mod = await Post.updateOne({ _id: req.params.id }, { title: req.body.title });
    res.status(200).send(`updated sucessfully ${mod.nModified} blog post`);
  })
  .delete(async (req, res) => {
    const del = await Post.deleteOne({ _id: req.params.id });
    res.send(`deleted ${del.deletedCount} blog post`);
  });

module.exports = router;
