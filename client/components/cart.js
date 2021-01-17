import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import _getUser from '../store/user'
import {_getUserCart, _removeFromCart} from '../store/cart'

import {me} from '../store/user'

//The idea is to use the thunk that brings in the data from the auth form to the user-component, and have it come to this component as well.

//right now it works as you navigate (to Home,to Properties, to Cart), and only stops working if you hard reload.

//But it is on state now, and if you can map that state to the props we just might have it.

export class Cart extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
    //I stole loadInitialData from routes.js, because it was dispatching the "me" thunk, which was correctly getting the information through auth-form.js.
  }

  componentDidUpdate() {
    if (this.props.cart.length === 0 && this.props.userId) {
      this.props.getUserCart(this.props.userId)
    }
    const cartItems = this.props.cart || []
    if (cartItems.length === 0) {
      return <div>Your cart is currently empty!</div>
    }
  }

  render() {
    const cartItems = this.props.cart || []

    if (!this.props.user) {
      return <div>Loading...</div>
    }
    // if (cartItems.length === 0) {
    //   return (
    //     <div>
    //       Your cart is currently empty!
    //     </div>
    //   )
    // } else {
    return (
      <div>
        <div>
          {cartItems.map(property => {
            return (
              <div key={property.id}>
                <Link key={property.id} to={`/properties/${property.id}`}>
                  {property.name}
                </Link>

                <div>
                  <img width={200} src={property.imageUrl} />
                </div>

                <div>Price: {property.price}</div>
                <button
                  type="button"
                  onClick={() =>
                    this.props.removeFromCart(this.props.user, property.id)
                  }
                >
                  Delete
                </button>
              </div>
            )
          })}
        </div>
        <div>Total: </div>
        <button type="submit">Checkout</button>
      </div>
    )
  }
}
// }

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart,
    userId: state.user.id,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getUserCart: id => dispatch(_getUserCart(id)),
    loadInitialData: () => dispatch(me()),
    removeFromCart: (user, propertyId) =>
      dispatch(_removeFromCart(user, propertyId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
