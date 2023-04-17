const router = require("express").Router();
const { Review, Comment, User } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Review.findAll({
    include: [
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_body", "user_id"],
      },
    ],
  })
    .then((reviewData) => {
      res.json(reviewData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Review.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_body", "user_id"],
      },
    ],
  })
    .then((reviewData) => {
      res.json(reviewData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Review.create({
    title: req.body.title,
    review_body: req.body.review_body,
    user_id: req.session.user_id,
  })
    .then((reviewData) => {
      res.json(reviewData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Review.update(
    {
      title: req.body.title,
      review_body: req.body.review_body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((reviewData) => {
      res.json(reviewData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Review.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((reviewData) => {
      if (!reviewData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }
      res.status(200).json(reviewData);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json(err.message);
    });
});

module.exports = router;
