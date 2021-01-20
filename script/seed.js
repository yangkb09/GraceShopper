'use strict'

const db = require('../server/db')
const {User, Property} = require('../server/db/models')

const properties = [
  {
    name: 'Apple Orchard Estate',
    imageUrl: 'https://robbreport.com/wp-content/uploads/2018/10/pumpkin-1.jpg',
    address: '1234 Gala Lane',
    price: 1000000,

    description: 'Come for the cider, stay for the apple bottom jeans!',
    status: 'available'
  },
  {
    name: 'Haunted Mansion',
    imageUrl:
      'https://bigseventravel.com/wp-content/uploads/2019/10/Franklin-Caste-Most-Haunted-House-in-Ohio.jpg',
    address: '567 Wayward Way',
    price: 100000,
    description: 'The kitchen backsplash is to-die-for!',
    status: 'available'
  },
  {
    name: 'Joneses Ski Chalet',
    imageUrl:
      'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg',
    address: '89 Black Diamond Boulevard',
    price: 5000000,
    description:
      "Ever get stuck under the ski lift? Here it's a major attraction!",
    status: 'available'
  },
  {
    name: 'Peach Tree Palace',
    imageUrl: 'https://visitwinchesterky.com/_uploads/the-peach-house-1.jpg',
    address: '800 Georgia Lane',
    price: 150000,

    description: 'The sweetest palace you ever did see.',
    status: 'available'
  },
  {
    name: 'Winston Estate',
    imageUrl:
      'https://static01.nyt.com/images/2011/08/24/greathomesanddestinations/24gh-ihh/24gh-ihh-jumbo.jpg',
    address: '46 Christine Rd',
    price: 2600000,
    description: 'Dignified and minimalistic.',
    status: 'available'
  },
  {
    name: 'Chateau des Anges',
    imageUrl:
      'https://www.inquirer.com/resizer/eEu_YossB7UxfUChebm4CtR4UIk=/1400x932/center/middle/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/CKJOZEXC7ZEBPKFIE4XLB5GELE.jpg',
    address: 'San Michel Boulevarde',
    price: 8700000,
    description: 'A perfect place to sip your Napolean brandy.',
    status: 'available'
  },
  {
    name: 'Palazzo del Pero',
    imageUrl:
      'https://www.luxury-architecture.net/wp-content/uploads/2017/12/1513894230-8958-italy-concetta-01.jpg',
    address: '52100 Province of Arezzo',
    price: 3250000,

    description: 'The best dogs in Italy live around here.',
    status: 'available'
  },
  {
    name: 'Frogmore Cottage',
    imageUrl:
      'https://bigseventravel.com/wp-content/uploads/2019/10/Franklin-Caste-Most-Haunted-House-in-Ohio.jpg',
    address: '12-62 Windsor Lane',
    price: 88000000,
    description: 'Even more frogs than you might think.',
    status: 'available'
  },
  {
    name: 'Wren House',
    imageUrl:
      'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg',
    address: '22 Kensington St',
    price: 450000,
    description: 'Take flight from the city to this charming escape.',
    status: 'available'
  },
  {
    name: 'Mary-Therese Hall',
    imageUrl: 'https://robbreport.com/wp-content/uploads/2018/10/pumpkin-1.jpg',
    address: '14 St. Bellain Ave.',
    price: 150000,

    description: 'A house like a beautiful woman.',
    status: 'available'
  },
  {
    name: 'Everton Estate',
    imageUrl:
      'https://bigseventravel.com/wp-content/uploads/2019/10/Franklin-Caste-Most-Haunted-House-in-Ohio.jpg',
    address: '692 Alonzo St',
    price: 9200000,
    description: 'Classical architecture meets LSD trip.',
    status: 'available'
  },
  {
    name: 'The Oculus',
    imageUrl:
      'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg',
    address: '34 Griffith Observatory Road',
    price: 470000,
    description: 'A place for stars.',
    status: 'available'
  },
  {
    name: 'Witch House',
    imageUrl: 'https://robbreport.com/wp-content/uploads/2018/10/pumpkin-1.jpg',
    address: '666 Black Cat Place',
    price: 140000,

    description:
      'Surrounded by herb gardens, you will never lack for potion ingredients.',
    status: 'available'
  },
  {
    name: 'Rotterdam Residence',
    imageUrl:
      'https://bigseventravel.com/wp-content/uploads/2019/10/Franklin-Caste-Most-Haunted-House-in-Ohio.jpg',
    address: '16A Jan Pieterszoon Coenlaan',
    price: 130000,
    description: 'Een prachtige plek om te wonen!',
    status: 'available'
  },
  {
    name: 'Casa del Rio Negro',
    imageUrl:
      'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg',
    address: '402 Estr. do Pensador',
    price: 3090000,
    description: 'Ven al río a jugar',
    status: 'available'
  },
  {
    name: 'Pizza Palace',
    imageUrl: 'https://robbreport.com/wp-content/uploads/2018/10/pumpkin-1.jpg',
    address: '43 Slice St',
    price: 390200,

    description: 'Best described as tasteful.',
    status: 'available'
  },
  {
    name: 'Alexander House',
    imageUrl:
      'https://bigseventravel.com/wp-content/uploads/2019/10/Franklin-Caste-Most-Haunted-House-in-Ohio.jpg',
    address: '322 Fort Tryon Road',
    price: 294000,
    description:
      'Well protected from the elements and surrounded by beautiful forest.',
    status: 'available'
  },
  {
    name: 'Violin Villa',
    imageUrl:
      'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg',
    address: '22C Bach Boulevard',
    price: 4150000,
    description: 'Find your music here.',
    status: 'available'
  },
  {
    name: 'Odyssey House',
    imageUrl: 'https://robbreport.com/wp-content/uploads/2018/10/pumpkin-1.jpg',
    address: '66 Circe Way',
    price: 450000,

    description: 'A darn near mythical property.',
    status: 'available'
  },
  {
    name: 'Ironwork Estate',
    imageUrl:
      'https://bigseventravel.com/wp-content/uploads/2019/10/Franklin-Caste-Most-Haunted-House-in-Ohio.jpg',
    address: '406 Forge Road',
    price: 9245000,
    description: 'Beautifully constructed and built to last.',
    status: 'available'
  },
  {
    name: 'Imaginary House',
    imageUrl:
      'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg',
    address: '45 Nonexistent Place',
    price: 100000,
    description: "Got to be good looking, cuz it's so hard to see.",
    status: 'available'
  },
  {
    name: 'The Lighthouse',
    imageUrl:
      'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg',
    address: '7800 Maryland Ave',
    price: 907000,
    description: 'Sail straight for this safe harbor.',
    status: 'available'
  },
  {
    name: 'New Bethlehem',
    imageUrl:
      'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg',
    address: '3 Everlasting St',
    price: 723000,
    description: "It's a little town, but the stars are incomparable.",
    status: 'available'
  },
  {
    name: 'Jacaranda House',
    imageUrl:
      'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg',
    address: '45 Nonexistent Place',
    price: 104400,
    description: 'A flower in springtime.',
    status: 'available'
  },
  {
    name: 'Woodhope Hall',
    imageUrl:
      'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg',
    address: '321 Jane Austen Road',
    price: 100000,
    description: 'A home for the rich, clever, and handsome.',
    status: 'available'
  },
  {
    name: 'Fourier House',
    imageUrl:
      'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg',
    address: '119 Phalanx Place',
    price: 100000,
    description: 'A veritable Utopia.',
    status: 'available'
  },
  {
    name: 'Rivier Huis',
    imageUrl:
      'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg',
    address: '22B Overstromende Straat',
    price: 107000,
    description: 'Gorgeous house, right on the water.',
    status: 'available'
  },
  {
    name: 'Susan',
    imageUrl:
      'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg',
    address: '56 Cravello Road',
    price: 770000,
    description: 'A lovely house with a human name.',
    status: 'available'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'admin', password: 'admin', isAdmin: true}),
    User.create({email: 'cody@email.com', password: '123', isAdmin: false}),
    User.create({email: 'murphy@email.com', password: '123', isAdmin: false})
  ])

  const newProperties = await Promise.all(
    properties.map(property => {
      return Property.create(property)
    })
  )

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
