import React, {Component} from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  type: PropTypes.string.isRequired,
  element: PropTypes.string.isRequired,
  onValidate: PropTypes.func.isRequired,
  isRequired: PropTypes.bool
}

export default class Validator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: this.props.error,
      hasError: false
    }
    // bind this to the event handler
    // this.handleValidation = this.handleValidation.bind(this)
  }

  // componentDidMount () {
  //   this.handleValidation
  // }

  componentWillReceiveProps () {
    let hasError = this.state.hasError
    console.log(this.props.element)
    console.log(this.props.isRequired)
    if (this.props.element.length === 0 && this.props.isRequired) {
      hasError = true
    }
    this.props.onValidate(hasError)
    this.setState({hasError: hasError})
  }

  render () {
    // const errors = []
    return (
      <div>errors are here</div>
    )
  }
}

Validator.propTypes = propTypes

// function validate(name, email, password) {
//   // we are going to store errors for all fields
//   // in a signle array
//   const errors = [];
//
//   if (name.length === 0) {
//     errors.push("Name can't be empty");
//   }
//
//   if (email.length < 5) {
//     errors.push("Email should be at least 5 charcters long");
//   }
//   if (email.split('').filter(x => x === '@').length !== 1) {
//     errors.push("Email should contain a @");
//   }
//   if (email.indexOf('.') === -1) {
//     errors.push("Email should contain at least one dot");
//   }
//
//   if (password.length < 6) {
//     errors.push("Password should be at least 6 characters long");
//   }
//
//   return errors;
// }
//
// render() {
//   const { errors } = this.state;
//   return (
//       {errors.map(error => (
//         <p key={error}>Error: {error}</p>
//     ))}
// }
