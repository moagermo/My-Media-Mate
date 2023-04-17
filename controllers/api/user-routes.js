const router = require("express").Router();
const { User, Review, Comment } = require("../../models");
const session = require("express-session");

// GET /api/users
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((UserData) => res.json(UserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Review,
        attributes: ["id", "title", "review_body", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_body", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((UserData) => {
      if (!UserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(UserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const UserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = UserData.id;
      req.session.name = UserData.name;
      req.session.loggedIn = true;

      res.status(200).json(UserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const UserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!UserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = UserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = UserData.id;
      req.session.name = UserData.name;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: UserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
