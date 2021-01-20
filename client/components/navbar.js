import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'
import Nav from 'react-bootstrap/Nav'

const Navbar = ({handleClick, isLoggedIn, isAdmin, userId, cart}) => (
  <div>
    <h1>VIRTUAL REALTY</h1>
    <Nav activeKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav.Item>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Nav.Item>
            <Nav.Link eventKey="#" onClick={handleClick}>
              Logout
            </Nav.Link>
          </Nav.Item>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Nav.Item>
            <Nav.Link eventKey="/login" href="/login">
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/signup">Sign Up</Nav.Link>
          </Nav.Item>
        </div>
      )}

      {isAdmin ? (
        <div>
          {/* The navbar will show this link if you are logged in as an administrator*/}
          {
            <Nav.Item>
              <Nav.Link eventKey="/admin">Admin</Nav.Link>
            </Nav.Item>
          }
        </div>
      ) : (
        <></>
      )}
      <Nav.Item>
        <Nav.Link href="/properties">Properties</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey={`/cart/${userId}`}>
          Cart ({cart.filter(property => property.status !== 'sold').length})
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey={`/cart/${userId}/pastorders`}>
          Past Orders (
          {cart.filter(property => property.status === 'sold').length})
        </Nav.Link>
      </Nav.Item>
    </Nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!(state.user.email === 'admin'),
    userId: state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
