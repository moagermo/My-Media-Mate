const router = require("express").Router();
const sequelize = require("../config/connection");
const { Review, Comment, User, WishList } = require("../models");
const withAuth = require("../utils/auth");

// REVIEW ROUTES ON DASHBOARD

// Route to view user dashboard
router.get("/", withAuth, (req, res) => {
  Review.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "review_body", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_body",
          "review_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((reviewData) => {
      const reviews = reviewData.map((review) => review.get({ plain: true }));

      res.render("dashboard", { reviews, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Takes user to edit form for review specified by id
router.get("/edit/:id", withAuth, (req, res) => {
  Review.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "created_at", "review_body"],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_body",
          "review_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((reviewData) => {
      if (!reviewData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const review = reviewData.get({ plain: true });
      res.render("edit-review", {
        review,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// When user clicks Create new review on dashboard, takes them to the form to create a new review
router.get("/create/", withAuth, (req, res) => {
  Review.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "created_at", "review_body"],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_body",
          "review_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((reviewData) => {
      const reviews = reviewData.map((review) => review.get({ plain: true }));
      res.render("create-review", { reviews, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// This route takes the user to the "Add to Future Watch List" form to add a title
router.get("/createwishlist/", withAuth, (req, res) => {
  WishList.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "wishlist_title"],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((wishlistData) => {
      const wishlists = wishlistData.map((wishlist) =>
        wishlist.get({ plain: true })
      );
      res.render("create-wishlist", { wishlists, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Takes user to List of title they want to watch in the future
router.get("/list", withAuth, (req, res) => {
  WishList.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "wishlist_title"],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((wishlistData) => {
      const wishlists = wishlistData.map((wishlist) =>
        wishlist.get({ plain: true })
      );

      res.render("list", {
        wishlists,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// When user clicks Edit List Item, this routes them to the edit form to delete that particular item
router.get("/edit/list/:id", withAuth, (req, res) => {
  WishList.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "wishlist_title"],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((wishlistData) => {
      if (!wishlistData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const wishlist = wishlistData.get({ plain: true });
      res.render("edit-wishlist", {
        wishlist,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
