import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import _getUser from '../store/user'
import {_getUserCart} from '../store/cart'

import {me} from '../store/user'

//The idea is to use the thunk that brings in the data from the auth form to the user-component, and have it come to this component as well.

//right now it works as you navigate (to Home,to Properties, to Cart), and only stops working if you hard reload.

//But it is on state now, and if you can map that state to the props we just might have it.

export class Cart extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
    //NOTE FROM KAT/JAMIE: loadInitialData() gives us a 500 err, leaving commented out
    //I stole loadInitialData from routes.js, because it was dispatching the "me" thunk, which was correctly getting the information through auth-form.js.
  }

  componentDidUpdate() {
    if (this.props.cart.length === 0 && this.props.userId) {
      this.props.getUserCart(this.props.userId)
    }
  }

  render() {
    const cartItems = this.props.cart || []

    if (!this.props.user) {
      return <div>Loading...</div>
    }

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
                <button type="button">Delete</button>
              </div>
            )
          })}
        </div>
        <div>Total:</div>
        <button type="submit">Checkout</button>
      </div>
    )
  }
}

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
    loadInitialData: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(Cart)
