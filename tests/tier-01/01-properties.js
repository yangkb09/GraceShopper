/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import {mount} from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import waitForExpect from 'wait-for-expect'
import {Provider} from 'react-redux'
import * as rrd from 'react-router-dom'

const {MemoryRouter} = rrd

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  properties: [],
}

import mockAxios from '../mock-axios'
import {setProperties, _getProperties} from '../../client/store/properties'

import reducer from '../../store/index'
import {createStore} from 'redux'
import store from '../../client/store'

const app = require('../../server')
const agent = require('supertest')(app)

const {db} = require('../../server/db')
//BLOCK: need model from Jamie
// const {Property} = require('../../server/db')

//BLOCK: need seed file path from Frankie/Jamie
// const seed = require('../../seed')

/* NOTE: Make sure you pay attention to the paths below. This is where your React components should live! */
import AllProperties, {
  AllProperties as UnconnectedAllProperties,
} from '../../client/components/all-properties'
//BLOCK: need User component
// import AllProjects from '../../client/components/AllProjects'
// import Routes from '../../client/components/Routes'

describe('Tier One: Properties', () => {
  // We'll use this array of properties as dummy data for testing purposes
  const properties = [
    {id: 1, name: 'Century Chalet', imageUrl: '/images/r2d2.png', address: '1741 Remarkable Rd', price: 3000000},
    {id: 2, name: 'Holiday House', imageUrl: '/images/walle.jpeg', address: '2011 Vacation Ct', price: 6000000},
  ]
  beforeEach(() => {
    // mockAxios ensures that when our client-side code requests data from the
    // server, the request is always successful (even if we haven't implemented)
    // our server yet.
    mockAxios.onGet('/api/properties').replyOnce(200, properties)
  })

  describe('<AllProperties /> component', () => {
    const getPropertiesSpy = sinon.spy()
    afterEach(() => {
      getPropertiesSpy.resetHistory()
    })

    // This test is interested in the unconnected AllProperties component. It is
    // exported as a named export in client/components/all-properties.js
    xit('renders the properties passed in as props', () => {
      const wrapper = mount(
        <UnconnectedAllProperties
          properties={properties}
          getProperties={getPropertiesSpy}
        />
      )
      expect(wrapper.text()).to.include('Century Chalet')
      expect(wrapper.text()).to.include('Holiday House')
      // The test is expecting an image for each Property, with src set to the
      // Property's imageUrl
      const images = wrapper.find('img').map((node) => node.get(0).props.src)
      expect(images).to.include.members([
        '/images/r2d2.png',
        '/images/walle.jpeg',
      ])
    })

    xit('renders DIFFERENT properties passed in as props', () => {
      const differentProperties = [
        {
          id: 3,
          name: 'Humble House',
          imageUrl: '/images/r2d2.png',
          address: '111 Simple St',
          price: 10000
        },
        {
          id: 4,
          name: 'The Observatory',
          imageUrl: '/images/r2d2.png',
          address: '22 Carnegie Rd #B',
          price: 500000
        },
      ]
      const wrapper = mount(
        <UnconnectedAllProperties
          properties={differentProperties}
          getProperties={getPropertiesSpy}
        />
      )
      expect(wrapper.text()).to.not.include('Century Chalet')
      expect(wrapper.text()).to.not.include('Holiday House')
      expect(wrapper.text()).to.include('HAL 9000')
      expect(wrapper.text()).to.include('Bender')

      const images = wrapper.find('img').map((node) => node.get(0).props.src)
      expect(images).to.include.members([
        '/images/HAL-9000.jpeg',
        '/images/bender.png',
      ])
    })

    xit('*** renders "No Properties" if this.props.properties is empty or undefined', () => {
      throw new Error('replace this error with your own test')
    })

    // In a later step, we'll create a thunk, and map that thunk to AllProperties
    // as getProperties. For right now, we just need to be sure the component
    // calls it after it mounts.
    xit('calls this.props.getProperties after mount', async () => {
      mount(
        <UnconnectedAllProperties
          properties={properties}
          getProperties={getPropertiesSpy}
        />
      )
      await waitForExpect(() => {
        expect(getPropertiesSpy).to.have.been.called
      })
    })
  })

  describe('Redux', () => {
    let fakeStore
    beforeEach(() => {
      fakeStore = mockStore(initialState)
    })
    describe('set/fetch properties', () => {
      xit('setProperties action creator', () => {
        expect(setProperties(properties)).to.deep.equal({
          type: 'SET_Properties',
          properties,
        })
      })

      xit('_getProperties thunk creator returns a thunk that GETs /api/properties', async () => {
        await fakeStore.dispatch(_getProperties())
        const [getRequest] = mockAxios.history.get
        expect(getRequest).to.not.equal(undefined)
        expect(getRequest.url).to.equal('/api/properties')
        const actions = fakeStore.getActions()
        expect(actions[0].type).to.equal('SET_Properties')
        expect(actions[0].properties).to.deep.equal(properties)
      })
    })

    describe('properties reducer', () => {
      // Pay attention to where the store is being created, namely
      // app/redux/index.js. Once you've created your reducer, ensure that
      // it's actually being used by the redux store.
      let testStore
      beforeEach(() => {
        testStore = createStore(appReducer)
      })

      xit('*** returns the initial state by default', () => {
        throw new Error('replace this error with your own test')
      })

      xit('reduces on SET_Properties action', () => {
        const action = {type: 'SET_Properties', properties}

        const prevState = testStore.getState()
        testStore.dispatch(action)
        const newState = testStore.getState()

        expect(newState.properties).to.be.deep.equal(properties)
        expect(newState.properties).to.not.be.equal(prevState.properties)
      })
    })
  })

  describe('Connect: react-redux', () => {
    // This test is expecting your component to dispatch a thunk after it mounts
    // Remember that getProperties prop from an earlier test? Now's a good time
    // for a mapDispatch.
    xit('initializes properties from the server when the application loads the /properties route', async () => {
      const reduxStateBeforeMount = store.getState()
      expect(reduxStateBeforeMount.properties).to.deep.equal([])
      mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/properties']}>
            <AllProperties />
          </MemoryRouter>
        </Provider>
      )
      await waitForExpect(() => {
        const reduxStateAfterMount = store.getState()
        expect(reduxStateAfterMount.properties).to.deep.equal(properties)
      })
    })

    // This test is expecting your component to render the properties from the
    // Redux store. Now's a good time for a mapState.
    xit('<AllProperties /> renders properties from the Redux store', async () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/properties']}>
            <AllProperties />
          </MemoryRouter>
        </Provider>
      )
      await waitForExpect(() => {
        wrapper.update()

        const {properties: reduxProperties} = store.getState()
        reduxProperties.forEach((reduxProperty) => {
          expect(wrapper.text()).to.include(reduxProperty.name)
        })
      })
    })
  })

  describe('Navigation', () => {
    beforeEach(() => {
      sinon.stub(rrd, 'BrowserRouter').callsFake(({children}) => {
        return <div>{children}</div>
      })
    })
    afterEach(() => {
      rrd.BrowserRouter.restore()
    })

    // This test expects that you've set up a Route for AllProperties.
    // You should take a look at app/components/Routes.js
    xit('renders <AllProperties /> at /properties', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/properties']}>
            <Routes />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(AllProperties)).to.have.length(1)
      expect(wrapper.find(AllProjects)).to.have.length(0)
    })

    xit('*** navbar has links to "/properties" and "/" (homepage)', () => {
      throw new Error('replace this error with your own test')
    })
  })

  describe('Express API', () => {
    // Let's test our Express routes WITHOUT actually using the database.
    // By replacing the findAll methods on our Sequelize models with a spy,
    // we can ensure that our API tests won't fail just because
    // our Sequelize models haven't been implemented yet.
    const {findAll: PropertyFindAll} = Property
    beforeEach(() => {
      Property.findAll = sinon.spy(() => Promise.resolve(properties))
    })
    afterEach(() => {
      Property.findAll = PropertyFindAll
    })

    // Consider writing your GET route in server/api/properties.js. And don't
    // forget to apply the express router to your API in server/api/index.js!
    xit('GET /api/properties responds with all properties', async () => {
      const response = await agent.get('/api/properties').expect(200)
      expect(response.body).to.deep.equal(properties)
      expect(Property.findAll.calledOnce).to.be.equal(true)
    })
  })

  describe('Sequelize Model', () => {
    let Property
    before(() => db.sync({force: true}))
    beforeEach(() => {
      Property = {
        name: 'R2-D2',
        imageUrl: '/images/r2d2.png',
        fuelType: 'electric',
        fuelLevel: 88.34,
      }
    })
    afterEach(() => db.sync({force: true}))

    it('has fields name, imageUrl, fuelType, fuelLevel', async () => {
      Property.notARealAttribute = 'does not compute'
      const savedProperty = await Property.create(Property)
      expect(savedProperty.name).to.equal('R2-D2')
      expect(savedProperty.imageUrl).to.equal('/images/r2d2.png')
      expect(savedProperty.fuelType).to.equal('electric')
      expect(savedProperty.fuelLevel).to.equal(88.34)
      expect(savedProperty.notARealAttribute).to.equal(undefined)
    })

    it('*** name cannot be null or an empty string', async () => {
      const savedProperty = await Property.create(Property)
      expect(savedProperty.name).to.not.equal('')
      expect(savedProperty.name).to.not.equal(null)
      // throw new Error("replace this error with your own test");
    })

    it('fuelType can only be gas, diesel, or electric (defaults to electric)', async () => {
      Property.fuelType = 'the power of love'
      try {
        const badFuelProperty = await Property.create(Property)
        if (badFuelProperty) {
          throw Error('Validation should have failed with invalid fuelType')
        }
      } catch (err) {
        expect(err.message).to.not.have.string('Validation should have failed')
      }
      delete Property.fuelType
      const defaultFuelProperty = await Property.create(Property)
      expect(defaultFuelProperty.fuelType).to.equal('electric')
    })

    it('fuelLevel must be between 0 and 100 (defaults to 100)', async () => {
      Property.fuelLevel = -10
      try {
        const negativeFuelProperty = await Property.create(Property)
        if (negativeFuelProperty) {
          throw Error('Validation should have failed with fuelLevel < 0')
        }
      } catch (err) {
        expect(err.message).to.not.have.string('Validation should have failed')
      }
      Property.fuelLevel = 9001
      try {
        const tooMuchFuelProperty = await Property.create(Property)
        if (tooMuchFuelProperty) {
          throw Error('Validation should have failed with fuelLevel > 100')
        }
      } catch (err) {
        expect(err.message).to.not.have.string('Validation should have failed')
      }
      delete Property.fuelLevel
      const defaultFuelLevelProperty = await Property.create(Property)
      expect(defaultFuelLevelProperty.fuelLevel).to.equal(100)
    })
  })
  describe('Seed File', () => {
    // Once you've set up the Property Sequelize model, it's a good time to seed
    // the database with some dummy data. Go edit seed.js. Note that the tests
    // run the seed file on the TEST database. When you're ready to interact
    // with the application in the browser, remember to "npm run seed" from the
    // command line.
    beforeEach(seed)

    xit('populates the database with at least three properties', async () => {
      const seedProperties = await Property.findAll()
      expect(seedProperties).to.have.lengthOf.at.least(3)
    })
  })
})
