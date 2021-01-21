'use strict'

const db = require('../server/db')
const {User, Property} = require('../server/db/models')

const properties = [
  {
    name: 'Apple Orchard Estate',
    imageUrl: 'https://wallpaperaccess.com/full/3554306.jpg',
    address: '1234 Gala Lane',
    price: 1000000,
    description: 'Come for the cider, stay for the apple bottom jeans!',
    status: 'available'
  },
  {
    name: 'Haunted Mansion',
    imageUrl:
      'https://i.pinimg.com/originals/f1/74/27/f174273aca758be44a75f2f66158723d.jpg',
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
    imageUrl: 'https://wallpaperaccess.com/full/1403954.jpg',
    address: '800 Georgia Lane',
    price: 150000,
    description: 'The sweetest palace you ever did see.',
    status: 'available'
  },
  {
    name: 'Winston Estate',
    imageUrl:
      'https://static1.mansionglobal.com/production/media/article-images/5a29d48fe8c830b6bd8afee3e86d1ff7/large_large_10-2.jpeg',
    address: '46 Christine Rd',
    price: 2600000,
    description: 'Dignified and minimalistic.',
    status: 'available'
  },
  {
    name: 'Chateau des Anges',
    imageUrl:
      'https://i.pinimg.com/originals/40/92/d6/4092d67133aa813e23c2d441e7b75fe1.jpg',
    address: 'San Michel Boulevarde',
    price: 8700000,
    description: 'A perfect place to sip your Napolean brandy.',
    status: 'available'
  },
  {
    name: 'Palazzo del Pero',
    imageUrl: 'https://pbs.twimg.com/media/DgAYTadUcAAwrpU.jpg:large',
    address: '52100 Province of Arezzo',
    price: 3250000,
    description: 'The best dogs in Italy live around here.',
    status: 'available'
  },
  {
    name: 'Frogmore Cottage',
    imageUrl:
      'https://www.itl.cat/pngfile/big/244-2443283_fabulous-unique-home-hd-wallpapers-double-storey-house.jpg',
    address: '12-62 Windsor Lane',
    price: 88000000,
    description: 'Even more frogs than you might think.',
    status: 'available'
  },
  {
    name: 'Wren House',
    imageUrl:
      'https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2019/10/0/0/Compass-Bethany-1-Courtesy-Joe-Federico-Premier-Media-Productions-LLC.png?ve=1&tl=1',
    address: '22 Kensington St',
    price: 450000,
    description: 'Take flight from the city to this charming escape.',
    status: 'available'
  },
  {
    name: 'Mary-Therese Hall',
    imageUrl:
      'https://cdn.jfullerhomes.com/images/featured/11108-Honeycutt-Road-Raleigh-NC-J-Fuller-Homes.jpg',
    address: '14 St. Bellain Ave.',
    price: 150000,
    description: 'A house like a beautiful woman.',
    status: 'available'
  },
  {
    name: 'Everton Estate',
    imageUrl: 'https://wallpapercave.com/wp/wp2124316.jpg',
    address: '692 Alonzo St',
    price: 9200000,
    description: 'Classical architecture meets LSD trip.',
    status: 'available'
  },
  {
    name: 'The Oculus',
    imageUrl: 'https://s2.thingpic.com/images/cV/MUdgXAjtBHs9CmDHFWdVgSCF.jpeg',
    address: '34 Griffith Observatory Road',
    price: 470000,
    description: 'A place for stars.',
    status: 'available'
  },
  {
    name: 'Witch House',
    imageUrl:
      'https://www.click2houston.com/resizer/o_aa_00nijWr4kDDykLDmPGdIXc=/1024x682/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/BMUJV7BYRNHMHMKQRTT5OQUGDY.jpeg',
    address: '666 Black Cat Place',
    price: 140000,
    description:
      'Surrounded by herb gardens, you will never lack for potion ingredients.',
    status: 'available'
  },
  {
    name: 'Rotterdam Residence',
    imageUrl:
      'https://www.glazz.co.uk/wp-content/uploads/2018/09/Amazing-Modern-House-Designs-HD-Wallpaper.jpg',
    address: '16A Jan Pieterszoon Coenlaan',
    price: 130000,
    description: 'Een prachtige plek om te wonen!',
    status: 'available'
  },
  {
    name: 'Casa del Rio Negro',
    imageUrl:
      'https://res.cloudinary.com/dpcbzfiye/image/upload/w_1080,c_fill,dpr_auto,f_auto,q_auto,fl_progressive/v1565040162/og36hhauokyyiy02otnz.jpg',
    address: '402 Estr. do Pensador',
    price: 3090000,
    description: 'Ven al río a jugar',
    status: 'available'
  },
  {
    name: 'Pizza Palace',
    imageUrl:
      'https://c4.wallpaperflare.com/wallpaper/339/166/412/mansion-house-pool-interior-wallpaper-preview.jpg',
    address: '43 Slice St',
    price: 390200,
    description: 'Best described as tasteful.',
    status: 'available'
  },
  {
    name: 'Alexander House',
    imageUrl: 'https://wallpapercave.com/wp/wp3049325.jpg',
    address: '322 Fort Tryon Road',
    price: 294000,
    description:
      'Well protected from the elements and surrounded by beautiful forest.',
    status: 'available'
  },
  {
    name: 'Violin Villa',
    imageUrl: 'https://wallpapercave.com/wp/wp3049329.jpg',
    address: '22C Bach Boulevard',
    price: 4150000,
    description: 'Find your music here.',
    status: 'available'
  },
  {
    name: 'Odyssey House',
    imageUrl: 'https://wallpaperaccess.com/full/1219076.jpg',
    address: '66 Circe Way',
    price: 450000,
    description: 'A darn near mythical property.',
    status: 'available'
  },
  {
    name: 'Ironwork Estate',
    imageUrl: 'https://wallpapercave.com/wp/wp2124396.jpg',
    address: '406 Forge Road',
    price: 9245000,
    description: 'Beautifully constructed and built to last.',
    status: 'available'
  },
  {
    name: 'Imaginary House',
    imageUrl:
      'https://c4.wallpaperflare.com/wallpaper/820/158/492/house-architecture-luxury-homes-modern-car-hd-wallpaper-preview.jpg',
    address: '45 Nonexistent Place',
    price: 100000,
    description: "Got to be good looking, cuz it's so hard to see.",
    status: 'available'
  },
  {
    name: 'The Lighthouse',
    imageUrl:
      'https://i.pinimg.com/originals/90/5f/e1/905fe17ad2e02b6a825ea8f06ec34b64.jpg',
    address: '7800 Maryland Ave',
    price: 907000,
    description: 'Sail straight for this safe harbor.',
    status: 'available'
  },
  {
    name: 'New Bethlehem',
    imageUrl:
      'https://static1.mansionglobal.com/production/media/article-images/ae4995fa7b11767a70af58edb374c380/large_Toll-Brothers-19-Marbella-Cassis-SC_Rear-Elevation_CC.jpg',
    address: '3 Everlasting St',
    price: 723000,
    description: "It's a little town, but the stars are incomparable.",
    status: 'available'
  },
  {
    name: 'Jacaranda House',
    imageUrl:
      'https://i.pinimg.com/originals/9c/05/93/9c0593cc688e402eb80ccb4ea25ae195.jpg',
    address: '45 Nonexistent Place',
    price: 104400,
    description: 'A flower in springtime.',
    status: 'available'
  },
  {
    name: 'Woodhope Hall',
    imageUrl:
      'https://homesoftherich.net/wp-content/uploads/2018/04/Screen-Shot-2018-04-05-at-6.52.49-AM.png',
    address: '321 Jane Austen Road',
    price: 100000,
    description: 'A home for the rich, clever, and handsome.',
    status: 'available'
  },
  {
    name: 'Fourier House',
    imageUrl:
      'https://i.pinimg.com/originals/b9/9f/aa/b99faac5abc814b34de646b6f8d42b23.jpg',
    address: '119 Phalanx Place',
    price: 100000,
    description: 'A veritable Utopia.',
    status: 'available'
  },
  {
    name: 'Rivier Huis',
    imageUrl:
      'https://www.beautifullife.info/wp-content/uploads/2018/07/20/general.jpg',
    address: '22B Overstromende Straat',
    price: 107000,
    description: 'Gorgeous house, right on the water.',
    status: 'available'
  },
  {
    name: 'Susan',
    imageUrl:
      'https://cdn.onekindesign.com/wp-content/uploads/2019/11/Mountain-Modern-Lake-House-Pearson-Design-Group-25-1-Kindesign.jpg',
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
