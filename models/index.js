const Comment = require("./comment");
const Review = require("./review");
const User = require("./user");
const WishList = require("./wishlist");

User.hasMany(Comment, {
  foreignKey: "user_id",
});
User.hasMany(Review, {
  foreignKey: "user_id",
});
User.hasMany(WishList, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});
// THIS IS WHAT ALLOWS US TO DELETE A POST WITH COMMENTS ON IT
Comment.belongsTo(Review, {
  foreignKey: "review_id",
  onDelete: "CASCADE",
});

Review.belongsTo(User, {
  foreignKey: "user_id",
});
Review.hasMany(Comment, {
  foreignKey: "review_id",
});

WishList.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Comment, Review, WishList };
