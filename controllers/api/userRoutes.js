const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const createUser = await User.create(req.body);
    
        req.session.save(() => {
          req.session.user_id = createUser.id;
          req.session.logged_in = true;
    
          res.status(200).json(createUser);
        });
      } catch (err) {
        res.status(400).json(err);
      }
});

router.post("/login", async (req, res) => {
    try {
        const userLogin = await User.findOne({ where: { username: req.body.username } });

        if (!userLogin) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await userLogin.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userLogin.id;
            req.session.logged_in = true;

            res.json({ user: userLogin, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/logout", async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      } else {
        res.status(404).end();
      }
});

module.exports = router;