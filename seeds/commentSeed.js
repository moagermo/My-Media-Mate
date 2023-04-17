const { Comment } = require("../models");

const commentData = [
  {
    user_id: 1,
    review_id: 1,
    comment_body: "I also LOVE titanic!",
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
