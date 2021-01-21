const User = require('./user')
const Cart = require('./cart')
const Property = require('./property')

//Our database schema accommodates each user owning several properties through the join table "Cart",
//but each property can only have one owner.
User.belongsToMany(Property, {through: Cart})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Cart,
  Property
}
