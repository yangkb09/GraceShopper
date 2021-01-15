const router = require('express').Router()
const {Order} = require('../db/models/order')
const {Property} = require('../db/models/property')

module.exports = router

const isAdmin = (req, res, next) =>
  req.user.isAdmin ? next() : res.send('Access Denied.')

router.get('/', async (req, res, next) => {
  console.log(req.body)
  try {
    const orders = await Property.findAll({
      where: {
        orderId: {
          where: {
            userId: user.id
          }
        }
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
