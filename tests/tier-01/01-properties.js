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

import appReducer from '../../app/redux'
import {createStore} from 'redux'
import store from '../../app/store'

const app = require('../../server')
const agent = require('supertest')(app)

const {db} = require('../../server/db')
// const {Robot} = require('../../server/db')
const seed = require('../../seed')

/* NOTE: Make sure you pay attention to the paths below. This is where your React components should live! */
import AllRobots, {
  AllRobots as UnconnectedAllRobots,
} from '../../app/components/AllRobots'
import AllProjects from '../../app/components/AllProjects'
import Routes from '../../app/components/Routes'

describe('Tier One: Robots', () => {
  // We'll use this array of properties as dummy data for testing purposes
  const properties = [
    {id: 1, name: 'R2-D2', imageUrl: '/images/r2d2.png'},
    {id: 2, name: 'WALL-E', imageUrl: '/images/walle.jpeg'},
  ]
  beforeEach(() => {
    // mockAxios ensures that when our client-side code requests data from the
    // server, the request is always successful (even if we haven't implemented)
    // our server yet.
    mockAxios.onGet('/api/properties').replyOnce(200, properties)
  })

  describe('<AllRobots /> component', () => {
    const getRobotsSpy = sinon.spy()
    afterEach(() => {
      getRobotsSpy.resetHistory()
    })

    // This test is interested in the unconnected AllRobots component. It is
    // exported as a named export in app/components/AllRobots.js
    xit('renders the properties passed in as props', () => {
      const wrapper = mount(
        <UnconnectedAllRobots
          properties={properties}
          getRobots={getRobotsSpy}
        />
      )
      expect(wrapper.text()).to.include('R2-D2')
      expect(wrapper.text()).to.include('WALL-E')
      // The test is expecting an image for each robot, with src set to the
      // robot's imageUrl
      const images = wrapper.find('img').map((node) => node.get(0).props.src)
      expect(images).to.include.members([
        '/images/r2d2.png',
        '/images/walle.jpeg',
      ])
    })

    xit('renders DIFFERENT properties passed in as props', () => {
      const differentRobots = [
        {
          id: 3,
          name: 'HAL 9000',
          imageUrl: '/images/HAL-9000.jpeg',
        },
        {
          id: 4,
          name: 'Bender',
          imageUrl: '/images/bender.png',
        },
      ]
      const wrapper = mount(
        <UnconnectedAllRobots
          properties={differentRobots}
          getRobots={getRobotsSpy}
        />
      )
      expect(wrapper.text()).to.not.include('R2-D2')
      expect(wrapper.text()).to.not.include('WALL-E')
      expect(wrapper.text()).to.include('HAL 9000')
      expect(wrapper.text()).to.include('Bender')

      const images = wrapper.find('img').map((node) => node.get(0).props.src)
      expect(images).to.include.members([
        '/images/HAL-9000.jpeg',
        '/images/bender.png',
      ])
    })

    xit('*** renders "No Robots" if this.props.properties is empty or undefined', () => {
      throw new Error('replace this error with your own test')
    })

    // In a later step, we'll create a thunk, and map that thunk to AllRobots
    // as getRobots. For right now, we just need to be sure the component
    // calls it after it mounts.
    xit('calls this.props.getRobots after mount', async () => {
      mount(
        <UnconnectedAllRobots
          properties={properties}
          getRobots={getRobotsSpy}
        />
      )
      await waitForExpect(() => {
        expect(getRobotsSpy).to.have.been.called
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
          type: 'SET_ROBOTS',
          properties,
        })
      })

      xit('_getProperties thunk creator returns a thunk that GETs /api/properties', async () => {
        await fakeStore.dispatch(_getProperties())
        const [getRequest] = mockAxios.history.get
        expect(getRequest).to.not.equal(undefined)
        expect(getRequest.url).to.equal('/api/properties')
        const actions = fakeStore.getActions()
        expect(actions[0].type).to.equal('SET_ROBOTS')
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

      xit('reduces on SET_ROBOTS action', () => {
        const action = {type: 'SET_ROBOTS', properties}

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
    // Remember that getRobots prop from an earlier test? Now's a good time
    // for a mapDispatch.
    xit('initializes properties from the server when the application loads the /properties route', async () => {
      const reduxStateBeforeMount = store.getState()
      expect(reduxStateBeforeMount.properties).to.deep.equal([])
      mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/properties']}>
            <AllRobots />
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
    xit('<AllRobots /> renders properties from the Redux store', async () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/properties']}>
            <AllRobots />
          </MemoryRouter>
        </Provider>
      )
      await waitForExpect(() => {
        wrapper.update()

        const {properties: reduxRobots} = store.getState()
        reduxRobots.forEach((reduxRobot) => {
          expect(wrapper.text()).to.include(reduxRobot.name)
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

    // This test expects that you've set up a Route for AllRobots.
    // You should take a look at app/components/Routes.js
    xit('renders <AllRobots /> at /properties', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/properties']}>
            <Routes />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(AllRobots)).to.have.length(1)
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
    const {findAll: robotFindAll} = Robot
    beforeEach(() => {
      Robot.findAll = sinon.spy(() => Promise.resolve(properties))
    })
    afterEach(() => {
      Robot.findAll = robotFindAll
    })

    // Consider writing your GET route in server/api/properties.js. And don't
    // forget to apply the express router to your API in server/api/index.js!
    xit('GET /api/properties responds with all properties', async () => {
      const response = await agent.get('/api/properties').expect(200)
      expect(response.body).to.deep.equal(properties)
      expect(Robot.findAll.calledOnce).to.be.equal(true)
    })
  })

  describe('Sequelize Model', () => {
    let robot
    before(() => db.sync({force: true}))
    beforeEach(() => {
      robot = {
        name: 'R2-D2',
        imageUrl: '/images/r2d2.png',
        fuelType: 'electric',
        fuelLevel: 88.34,
      }
    })
    afterEach(() => db.sync({force: true}))

    it('has fields name, imageUrl, fuelType, fuelLevel', async () => {
      robot.notARealAttribute = 'does not compute'
      const savedRobot = await Robot.create(robot)
      expect(savedRobot.name).to.equal('R2-D2')
      expect(savedRobot.imageUrl).to.equal('/images/r2d2.png')
      expect(savedRobot.fuelType).to.equal('electric')
      expect(savedRobot.fuelLevel).to.equal(88.34)
      expect(savedRobot.notARealAttribute).to.equal(undefined)
    })

    it('*** name cannot be null or an empty string', async () => {
      const savedRobot = await Robot.create(robot)
      expect(savedRobot.name).to.not.equal('')
      expect(savedRobot.name).to.not.equal(null)
      // throw new Error("replace this error with your own test");
    })

    it('fuelType can only be gas, diesel, or electric (defaults to electric)', async () => {
      robot.fuelType = 'the power of love'
      try {
        const badFuelRobot = await Robot.create(robot)
        if (badFuelRobot) {
          throw Error('Validation should have failed with invalid fuelType')
        }
      } catch (err) {
        expect(err.message).to.not.have.string('Validation should have failed')
      }
      delete robot.fuelType
      const defaultFuelRobot = await Robot.create(robot)
      expect(defaultFuelRobot.fuelType).to.equal('electric')
    })

    it('fuelLevel must be between 0 and 100 (defaults to 100)', async () => {
      robot.fuelLevel = -10
      try {
        const negativeFuelRobot = await Robot.create(robot)
        if (negativeFuelRobot) {
          throw Error('Validation should have failed with fuelLevel < 0')
        }
      } catch (err) {
        expect(err.message).to.not.have.string('Validation should have failed')
      }
      robot.fuelLevel = 9001
      try {
        const tooMuchFuelRobot = await Robot.create(robot)
        if (tooMuchFuelRobot) {
          throw Error('Validation should have failed with fuelLevel > 100')
        }
      } catch (err) {
        expect(err.message).to.not.have.string('Validation should have failed')
      }
      delete robot.fuelLevel
      const defaultFuelLevelRobot = await Robot.create(robot)
      expect(defaultFuelLevelRobot.fuelLevel).to.equal(100)
    })
  })
  describe('Seed File', () => {
    // Once you've set up the Robot Sequelize model, it's a good time to seed
    // the database with some dummy data. Go edit seed.js. Note that the tests
    // run the seed file on the TEST database. When you're ready to interact
    // with the application in the browser, remember to "npm run seed" from the
    // command line.
    beforeEach(seed)

    xit('populates the database with at least three properties', async () => {
      const seedRobots = await Robot.findAll()
      expect(seedRobots).to.have.lengthOf.at.least(3)
    })
  })
})
