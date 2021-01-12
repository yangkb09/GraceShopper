const {db, models} = require('./server/db')
const {green, red} = require('chalk')

const Property = require(./server/db/models/User) //for now, need property model to test

const properties = [{
    name: 'Apple Orchard Estate'
    imageURL: 'https://robbreport.com/wp-content/uploads/2018/10/pumpkin-1.jpg'
    address: "1234 Gala Lane"
    price: 1000000
},{
    name: 'Haunted Mansion'
    imageURL: 'https://bigseventravel.com/wp-content/uploads/2019/10/Franklin-Caste-Most-Haunted-House-in-Ohio.jpg'
    address: "567 Wayward Way"
    price: 100000
},{
    name: 'Joneses Ski Chalet'
    imageurl: 'https://www.skiinluxury.com/blog/wp-content/uploads/2018/10/chalets_exterieurs1_hd-e1539344596992.jpg'
    address: "89 Black Diamond Boulevard"
    price: 5000000
},
];

const seed = async () => {
    try {
        await db.sync({force: true})

        await Promise.all(properties.map(property => {
            return Property.create(property);
        }));

        console.log(green('Seeding success!'))
        db.close()
    }
    catch (err) {
        console.error(red('Something went wrong in the seeding process!'))
        console.error(err)
        db.close()
    }
}

seed;