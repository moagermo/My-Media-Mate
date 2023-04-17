const router = require("express").Router();
const { Review, Comment, User, WishList } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

// Post to create a new Want to Watch list item
router.post("/", withAuth, (req, res) => {
  WishList.create({
    wishlist_title: req.body.wishlist_title,
    user_id: req.session.user_id,
  })
    .then((wishlistData) => {
      res.json(wishlistData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Used to delete want to watch list items
router.delete("/:id", withAuth, (req, res) => {
  WishList.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((wishlistData) => {
      if (!wishlistData) {
        res.status(404).json({ message: "No item found with this id!" });
        return;
      }
      res.status(200).json(wishlistData);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json(err.message);
    });
});

module.exports = router;
