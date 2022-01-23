'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Tweets", {
      fields: ["categoryId"],
      type: "foreign key",
      name: "category_tweet_association",
      references: {
        table: "Categories",
        field: "id",
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Tweets", {
      fields: ["categoryId"],
      type: "foreign key",
      name: "category_tweet_association",
      references: {
        table: "Categories",
        field: "id",
      }
    });
  }
};
