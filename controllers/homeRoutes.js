const router = require("express").Router();
const { Post, Comment, User } = require("../models");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('posts', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['date_created', 'content'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ],
        });

        const post = postData.get({ plain: true });
        res.render('single-posts', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
})

module.exports = router;