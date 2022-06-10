const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    try {
        const comments = await Comment.create(req.body);

        req.session.save(() => {
            req.session.user_id = comments.id;
            req.session.logged_in = true;

            res.status(200).json(comments);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;