import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import properties from './properties'
import cart from './cart'
import users from './users'
import property from './single-property'

export const reducer = combineReducers({
  user: user,
  properties: properties,
  cart: cart,
  property: property,
  users: users
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
