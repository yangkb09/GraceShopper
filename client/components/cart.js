import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class Cart extends React.Component {
  // componentDidMount() {
  //   try {
  //     this.props.loadSingleProperty(this.props.match.params.id)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  render() {
    return (
      <div>
        <h3>
          {this.props.user.properties &&
            this.props.user.properties.map(property => {
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
  return {
    property: state.property
  }
}

const mapDispatch = dispatch => ({
  getUser: id => dispatch(_getUser(id))
})

export default connect(mapState, mapDispatch)(Cart)
