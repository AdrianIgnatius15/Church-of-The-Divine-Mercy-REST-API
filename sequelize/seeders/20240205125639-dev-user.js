'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@mamlakha.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Kevin",
        lastName: "Johnson",
        email: "kevin.johnson@mamlakha.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Amanda",
        lastName: "Jones",
        email: "amanda.johnson@mamlakha.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
