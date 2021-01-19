import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {_cartCheckout, _getUserCart, _removeFromCart} from '../store/cart'
import {me} from '../store/user'

export class PastOrders extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userId && prevProps.userId !== this.props.userId) {
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
          {cartItems
            .filter(property => property.status === 'sold')
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
                </div>
              )
            })}
        </div>
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
    loadInitialData: () => dispatch(me()),
    removeFromCart: (user, propertyId) =>
      dispatch(_removeFromCart(user, propertyId)),
    cartCheckout: userId => dispatch(_cartCheckout(userId))
  }
}

export default connect(mapState, mapDispatch)(PastOrders)
