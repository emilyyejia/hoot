const Post = require('../models/post');
;
module.exports = {
    create,
    update,
    remove,
};



async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const post = await Post.findById(req.params.postId);
    post.comments.push(req.body);
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to create comment' });
  }
}

async function update(req, res) {
  try {
    const post = await Post.findById(req.params.postId);
    const comment = post.comments.id(req.params.commentId);
    if(comment.author.equals(req.user._id)) {
    comment.text = req.body.text;  
    await post.save();
    res.json(post);} else {
      res.status(403);
      throw new Error('You are not allowed');
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to update comment' });
  }
}

async function remove(req, res) {
  try {
    const post = await Post.findById(req.params.postId);
    const comment = post.comments.id(req.params.commentId);
    if(!comment.author.equals(req.user._id)) {
      res.status(403);
      throw new Error('You are not allowed');
    } else {
      post.comments.remove({_id: req.params.commentId});
      res.json(post);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to delete comment' });
  }
}
