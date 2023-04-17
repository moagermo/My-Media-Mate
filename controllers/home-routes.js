const router = require("express").Router();
const sequelize = require("../config/connection");
const { Review, Comment, User } = require("../models");

// Route to starter page / homepage
router.get("/", async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      attributes: ["id", "review_body", "title", "created_at"],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "user_id",
            "review_id",
            "comment_body",
            "created_at",
          ],
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));
    res.render("homepage", {
      reviews,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to view one review by its id
router.get("/review/:id", async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      attributes: ["id", "review_body", "title", "created_at"],

      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "user_id",
            "review_id",
            "comment_body",
            "created_at",
          ],
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    const review = reviewData.get({ plain: true });
    res.render("one-review", { review, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;

// Sign up route
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
