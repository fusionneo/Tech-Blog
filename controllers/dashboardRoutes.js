const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('posts', { posts, layout: 'dashboard.handlebars', logged_in: req.session.logged_in, });
  } catch (err) {
    res.status(400).json(err);
  }

});

router.get("/new", withAuth, (req, res) => {
  res.render('new-posts');
})

router.get("/edit/:id", withAuth, async (res, req) => {
  try {
    const editPost = await Post.findByPk(req.params.id, {});

    const post = editPost.get({ plain: true });
    console.log(post);
    res.render('edit-posts', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(400).json(err);
  }
})

module.exports = router;