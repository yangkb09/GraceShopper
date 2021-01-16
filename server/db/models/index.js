const User = require('./user')
const Cart = require('./cart')
const Property = require('./property')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//User-Cart-Property Association
// User.belongsToMany(Property, {through: 'property-user'})
// Property.hasOne(User)

// Cart.belongsTo(User)
// User.hasMany(Cart)

User.belongsToMany(Property, {through: Cart})

// Property.belongsTo(User, {through: Cart}) // Cart.hasMany(Property)

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
