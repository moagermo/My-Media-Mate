const { Review } = require("../models");

const reviewData = [
  {
    title: "Titanic",
    review_body: "This is a classic that I return to often!",
    user_id: 1,
  },
  {
    title: "Schitt's Creek",
    review_body: "One of my all time favorite shows",
    user_id: 2,
  },
  {
    title: "The Shawshank Redemption",
    review_body: "Grab a tissue box!  But this is a great one.",
    user_id: 3,
  },
];
const seedReview = () => Review.bulkCreate(reviewData);

module.exports = seedReview;
