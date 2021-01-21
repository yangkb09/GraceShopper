import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  AllProperties,
  Login,
  Signup,
  SingleProperty,
  AllUsers,
  Cart,
  PastOrders,
  LandingPage
} from './components/Index'
import {me} from './store/user'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/properties" component={AllProperties} />
        <Route exact path="/properties/:id" component={SingleProperty} />
        <Route exact path="/cart/:id" component={Cart} />
        <Route path="/admin" component={AllUsers} />
        {isLoggedIn && (
          <Switch>
            <Route exact path="/cart/:id" component={Cart} />
            <Route exact path="/cart/:id/pastorders" component={PastOrders} />
          </Switch>
        )}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,

    isAdmin: !!(state.user.id === 1)
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => dispatch(me())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
