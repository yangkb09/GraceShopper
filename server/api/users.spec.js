/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

// const adminCredentials = {
//   email: 'admin',
//   password: 'admin'
// }

// var authenticatedAdmin = request.agent(app)

// before(function(done){
//   authenticatedAdmin
//     .post('/login')
//     .send(adminCredentials)
//     .end()
// });

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users fails for users who are not administrators', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(500)
    })

    // it('GET /api/users returns 200 for administrator', async function(done){
    //   await authenticatedAdmin.get('/api/users')
    //   .expect(200)
    //   .done()
    // });
  }) // end describe('/api/users')
}) // end describe('User routes')
