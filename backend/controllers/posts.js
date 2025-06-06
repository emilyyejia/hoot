const Post = require('../models/post');
;
module.exports = {
    index,
    create,
    show,
    update,
    remove,
};

async function index(req, res) {
  try {
    const posts = await Post.find({}).populate("author");
    // below would return all posts for just the logged in user
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
}

async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to create post' });
  }
}

async function show(req, res) {
  try {
    const post = await Post.findById(req.params.postId)
    .populate("author")
    .populate("comments.author");
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
}

async function update(req, res) {
  try {
    const post = await Post.findById(req.params.postId);
    if(post.author.equals(req.user._id)) {
    await Post.findByIdAndUpdate(req.params.postId,req.body);
    res.json(post);} else {
      res.status(403);
      throw new Error('You are not allowed');
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to update post' });
  }
}

async function remove(req, res) {
  try {
    const post = await Post.findById(req.params.postId);
    if(post.author.equals(req.user._id)) {
    await Post.findByIdAndDelete(req.params.postId);
    res.json(post);} else {
      res.status(403);
      throw new Error('You are not allowed');
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to delete post' });
  }
}