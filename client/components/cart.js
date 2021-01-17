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
    console.log('component mounting! is user in the props???', this.props)

    this.props.getUserCart(this.props.userId)
    //getUserCart does not work yet because user.id is not yet on props, but IT WILL BE!!! I BELIEVE IN YOU
    // this.props.loadInitialData()
    //NOTE FROM KAT/JAMIE: loadInitialData() gives us a 500 err, leaving commented out
    //I stole loadInitialData from routes.js, because it was dispatching the "me" thunk, which was correctly getting the information through auth-form.js.
  }

  render() {
    console.log('!!!!!this.props from Cart component', this.props)
    const cartItems = this.props.user.properties || []
    console.log('cartItems', cartItems)

    if (!this.props.user) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>
          {cartItems.map(property => {
            return (
              <div key={property.id}>
                <Link key={property.id} to={`/properties/${property.id}`}>
                  {property.name}
                </Link>
                <button type="button">Delete</button>
              </div>
            )
          })}
        </h3>
      </div>
    )
  }
}

const mapState = state => {
  console.log('CART COMPONENT state', state)
  return {
    user: state.user,
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
