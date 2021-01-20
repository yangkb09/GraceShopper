import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {_cartCheckout, _getUserCart, _removeFromCart} from '../store/cart'
import {me} from '../store/user'

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
    //SAFEWORD: FALAFEL
    const checkout = id => {
      if (id) {
        alert('Congratulations on your new getaway!')
        this.props.cartCheckout(id)
      } else {
        alert('You cannot checkout without logging in!')
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
        <div>
          {cartItems
            .filter(property => property.status !== 'sold')
            .map(property => {
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

        <form>
          <label htmlFor="coupon">Coupon:</label>
          <input type="text" id="coupon" />
          <input type="submit" value="Submit" />
        </form>

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
      dispatch(_removeFromCart(user, propertyId)),
    cartCheckout: userId => dispatch(_cartCheckout(userId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
