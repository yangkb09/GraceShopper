const Sequelize = require('sequelize')
const db = require('../db')

const Property = db.define('property', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue:
      'https://cdn.vox-cdn.com/thumbor/5dsOP0u6aVw8SdEFWmo7CAP0CRk=/0x0:1024x682/1200x900/filters:focal(431x260:593x422):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/66353264/3150709_36_0.0.jpg'
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.ENUM('available', 'inCart', 'sold'),
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: 'available'
  }
})

module.exports = Property
