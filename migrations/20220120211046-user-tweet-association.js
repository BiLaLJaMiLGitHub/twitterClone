'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Tweets", {
      fields: ["userId"],
      type: "foreign key",
      name: "user_tweet_association",
      references: {
        table: "Users",
        field: "id",
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeConstraint("Tweets", {
      fields: ['userId'],
      type: "foreign key",
      name: "user_tweet_association",
      references: {
        table: "Users",
        field: "id",
      }
    });
  }
};
