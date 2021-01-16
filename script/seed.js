'use strict'

const db = require('../server/db')
const {User, Property, Cart} = require('../server/db/models')

const properties = [
  {
    name: 'Apple Orchard Estate',
    imageUrl: 'https://robbreport.com/wp-content/uploads/2018/10/pumpkin-1.jpg',
    address: '1234 Gala Lane',
    price: 1000000,

    description: 'Come for the cider, stay for the apple bottom jeans!'
  },
  {
    name: 'Haunted Mansion',
    imageUrl:
      'https://bigseventravel.com/wp-content/uploads/2019/10/Franklin-Caste-Most-Haunted-House-in-Ohio.jpg',
    address: '567 Wayward Way',
    price: 100000,
    description: 'The kitchen backsplash is to-die-for!'
  },
  {
    name: 'Joneses Ski Chalet',
    imageUrl:
      'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg',
    address: '89 Black Diamond Boulevard',
    price: 5000000,
    description:
      "Ever get stuck under the ski lift? Here it's a major attraction!"
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const newProperties = await Promise.all(
    properties.map(property => {
      return Property.create(property)
    })
  )

  await users[0].addProperties(newProperties[0])
  await users[0].addProperties(newProperties[1])
  await users[1].addProperties(newProperties[2])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${properties.length} properties`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
