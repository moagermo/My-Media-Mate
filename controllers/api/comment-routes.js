const router = require("express").Router();
const { Review, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Comment.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
    ],
  })
    .then((CommentData) => {
      res.json(CommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
    ],
  })
    .then((CommentData) => {
      res.json(CommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Comment.create({
    comment_body: req.body.comment_body,
    user_id: req.session.user_id,
    review_id: req.body.review_id,
  })
    .then((CommentData) => {
      res.json(CommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((CommentData) => {
      res.json(CommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// This was me trying to delete all comments
// router.delete("/", withAuth, (req, res) => {
//   Comment.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((CommentData) => {
//       res.json(CommentData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
