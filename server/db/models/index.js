const User = require('./user')
const Order = require('./order')
const Property = require('./property')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//User-Order-Property Association
// User.belongsToMany(Property, {through: 'property-user'})
// Property.hasOne(User)

Order.belongsTo(User)
User.hasMany(Order)

Property.belongsTo(Order)
Order.hasMany(Property)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  Property
}
