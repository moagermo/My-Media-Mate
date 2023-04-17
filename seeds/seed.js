const sequelize = require("../config/connection");
const seedComment = require("./commentSeed");
const seedReview = require("./reviewSeed");
const seedUser = require("./userSeed");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedReview();

  await seedComment();

  process.exit(0);
};

seedAll();
