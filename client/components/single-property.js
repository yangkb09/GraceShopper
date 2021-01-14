import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProperty} from '../store/single-property'
import {Link} from 'react-router-dom'

class SingleProperty extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    try {
      this.props.loadSingleProperty(this.props.match.params.id)
    } catch (error) {
      console.log(error.message)
    }
  }

  render() {
    console.log(this.props.property)
    if (!this.props.property) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h2>{this.props.property.name}</h2>
        <img width={500} src={this.props.property.imageUrl} />

        <div>Price: {this.props.property.price}</div>

        <div>Description:</div>
        <div text-align="center">{this.props.property.description}</div>
        <button type="submit">Add to Cart</button>
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
  loadSingleProperty: id => dispatch(fetchSingleProperty(id))
})

export default connect(mapState, mapDispatch)(SingleProperty)
