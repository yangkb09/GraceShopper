import React from 'react'
import {connect} from 'react-redux'
import {_getProperties} from '../store/properties'
import {Link} from 'react-router-dom'

// Notice that we're exporting the Allproperties component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.

// const properties = [
//   {
//     id: 1,
//     name: 'Century Chalet',
//     imageUrl: 'https://tinyurl.com/y6636nbd',
//     address: '1741 Remarkable Rd',
//     price: 3000000,
//   },
//   {
//     id: 2,
//     name: 'Holiday House',
//     imageUrl: 'https://tinyurl.com/y6jeheeg',
//     address: '2011 Vacation Ct',
//     price: 6000000,
//   },
//   {
//     id: 3,
//     name: 'Deer Lodge',
//     imageUrl: 'https://tinyurl.com/y6jeheeg',
//     address: '14 Big Bear Rd',
//     price: 8000000,
//   },
// ]

export class AllProperties extends React.Component {
  componentDidMount() {
    this.props.getProperties()
  }

  render() {
    if (this.props.properties.length > 0) {
      return (
        <div>
          {this.props.properties.map(property => {
            return (
              <div key={property.id}>
                <div>
                  Name: {property.name}
                  <img src={property.imageUrl} alt="Property Image" />
                  Address: {property.address}
                  Price: {property.price}
                  <Link to={`/properties/${property.id}`}>View Details</Link>
                  <button
                    type="button"
                    onClick={() => this.props.addToCart(property)}
                  >
                    Add to Cart
                  </button>
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
    properties: state.properties
  }
}

const mapDispatch = dispatch => {
  return {
    getProperties: () => dispatch(_getProperties())
    // addToCart: (property) => dispatch(property))
  }
}

export default connect(mapState, mapDispatch)(AllProperties)
