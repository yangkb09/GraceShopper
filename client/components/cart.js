import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {_cartCheckout, _getUserCart, _removeFromCart} from '../store/cart'
import {me} from '../store/user'
import Toast from '../../public/toast/toast'

//The idea is to use the thunk that brings in the data from the auth form to the user-component, and have it come to this component as well.

//right now it works as you navigate (to Home,to Properties, to Cart), and only stops working if you hard reload.

//But it is on state now, and if you can map that state to the props we just might have it.

export class Cart extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userId && prevProps.userId !== this.props.userId) {
      this.props.getUserCart(this.props.userId)
    }
  }

  render() {
    const checkout = id => {
      if (id) {
        Toast.show('Congratulations on your new getaway!', 'success')
        this.props.cartCheckout(id)
      } else {
        Toast.show('You cannot checkout without logging in!', 'failure')
      }
    }

    const cartItems = this.props.cart || []

    if (!this.props.user) {
      return <div>Loading...</div>
    }

    if (cartItems.length === 0) {
      return <div>Your cart is currently empty!</div>
    }

    return (
      <div>
        <div className="text">
          <h1>Getaway Cart</h1>
          {cartItems
            .filter(property => property.status !== 'sold')
            .map(property => {
              return (
                <div key={property.id} className="cartItem">
                  <div>
                    <img src={property.imageUrl} className="cartImg" />
                  </div>
                  <Link
                    key={property.id}
                    to={`/properties/${property.id}`}
                    id="propertyNameLink"
                  >
                    {property.name}
                  </Link>
                  <div>${property.price}</div>
                  <button
                    type="button"
                    onClick={() =>
                      this.props.removeFromCart(this.props.user, property.id)
                    }
                    className="cartDeleteButton"
                  >
                    X
                  </button>
                </div>
              )
            })}
        </div>

        <h2 className="text">Total: ${this.props.total}</h2>

        <button
          type="submit"
          onClick={() => {
            checkout(this.props.userId)
          }}
        >
          Checkout
        </button>
      </div>
    )
  }
}
// }

const mapState = state => {
  let total = 0
  let cart = state.cart

  for (let i = 0; i < cart.length; i++) {
    let property = cart[i]
    if (property.status === 'inCart') total += property.price
  }

  return {
    user: state.user,
    cart: state.cart,
    total: total,
    userId: state.user.id,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getUserCart: id => dispatch(_getUserCart(id)),
    loadInitialData: () => dispatch(me()),
    removeFromCart: (user, propertyId) =>
      dispatch(_removeFromCart(user, propertyId)),
    cartCheckout: userId => dispatch(_cartCheckout(userId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
