'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'fancyhouse.url',
        preview: true
      },
      {
        spotId: 2,
        url: 'studiolux.url',
        preview: true
      },
      {
        spotId: 3,
        url: 'scenicviews.url',
        preview: true
      },
      {
        spotId: 4,
        url: 'primelocation.url',
        preview: true
      },
      {
        spotId: 5,
        url: 'spacioushome.url',
        preview: true
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
