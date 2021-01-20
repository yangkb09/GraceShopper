import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'

const Navbar = ({handleClick, isLoggedIn, isAdmin, userId, cart}) => (
  <div>
    <h1>VIRTUAL REALTY</h1>
    <nav>
      <Link to="/home">Home</Link>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="#" onClick={handleClick}>
            Logout
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}

          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}

      {isAdmin ? (
        <div>
          {/* The navbar will show this link if you are logged in as an administrator*/}
          {<Link to="/admin">Admin</Link>}
        </div>
      ) : (
        <></>
      )}
      <Link to="/properties">Properties</Link>
      <Link to={`/cart/${userId}`}>
        Cart ({cart.filter(property => property.status !== 'sold').length})
      </Link>
      <Link to={`/cart/${userId}/pastorders`}>
        Portfolio ({cart.filter(property => property.status === 'sold').length})
      </Link>
    </nav>
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
