const router = require("express").Router();

const userRoutes = require("./user-routes");
const reviewRoutes = require("./review-routes");
const commentRoutes = require("./comment-routes");
const wishlistRoutes = require("./wishlist-routes");

router.use("/users", userRoutes);
router.use("/reviews", reviewRoutes);
router.use("/comments", commentRoutes);
router.use("/wishlists", wishlistRoutes);

module.exports = router;
