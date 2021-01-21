import React from 'react'
import {connect} from 'react-redux'
import {_addToCart} from '../store/cart'
import {_getProperties} from '../store/properties'
import {Link} from 'react-router-dom'
import Toast from '../../public/toast/toast'

// Notice that we're exporting the Allproperties component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.

export class AllProperties extends React.Component {
  componentDidMount() {
    this.props.getProperties()
  }

  render() {
    const checkForUserCart = (id, property) => {
      if (this.props.user.id) {
        Toast.show('Added to cart!', 'success')
        this.props.addToCart(this.props.user.id, property)
      } else {
        Toast.show('Please make an account first!', 'failure')
      }
    }

    if (this.props.properties.length > 0) {
      return (
        <div className="productContainer">
          {this.props.properties
            .filter(property => property.status !== 'sold')
            .map(property => {
              return (
                <div key={property.id} className="card">
                  <div>
                    <img
                      src={property.imageUrl}
                      alt="Property Image"
                      className="cardImg"
                    />
                    <div className="container">
                      <h1>
                        <b>
                          <Link
                            className="propertyName"
                            id="propertyNameLink"
                            to={`/properties/${property.id}`}
                          >
                            {property.name}
                          </Link>
                        </b>
                      </h1>
                      <p>{property.address}</p>
                      <p className="price">${property.price}</p>
                      <button
                        type="button"
                        onClick={() => {
                          checkForUserCart(this.props.user.id, property)
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      )
    } else {
      return (
        <div>
          <p>No properties for sale right now! Please come back soon.</p>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    properties: state.properties
  }
}

const mapDispatch = dispatch => {
  return {
    getProperties: () => dispatch(_getProperties()),
    addToCart: (userId, property) => dispatch(_addToCart(userId, property))
  }
}

export default connect(mapState, mapDispatch)(AllProperties)
