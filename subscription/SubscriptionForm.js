import React, {Component} from 'react'
import Axios from 'axios'
import _ from 'lodash'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import Button from '../fieldElements/Buttons'
import TextField from '../fieldElements/TextFields'

export default class SubscriptionForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      name: '',
      email: '',
      errors: {},
      isSubscribed: false
    }
    // bind this to the event handler
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setInputValue = this.setInputValue.bind(this)
  }
  handleClickOpen () {
    this.setState({ open: true })
  }
  handleClose () {
    this.setState({ open: false })
  }
  handleSubmit () {
    const errors = {}
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (this.state.name.length === 0) {
      errors['name'] = 'Name is needed'
    }
    if (this.state.email.length === 0 || !emailRegex.test(this.state.email.toLowerCase())) {
      errors['email'] = 'This is an incorrect email format'
    }

    if (_.isEmpty(errors)) {
      // creat a validating functon to check to make sure the name field is set and email is validated
      const preparedData = {
        fullName: this.state.name,
        emailAddress: this.state.email.toLowerCase()
      }
      const esc = encodeURIComponent
      const query = Object.keys(preparedData)
        .map(k => esc(k) + '=' + esc(preparedData[k]))
        .join('&')

      Axios.get(`/grandera/email-subscripton/subscribe?${query}`)
        .then(response => {
          console.log(response.data.error)
          if (typeof response.data.error === 'undefined') {
            this.setState({isSubscribed: true})
            console.log('saved')
          } else {
            errors['technical'] = response.data.error
            this.setState({errors: errors})
          }
        }) // end fetch
        .catch(error => {
          console.log(error)
          errors['technical'] = 'We are experiencing technical difficulties'
          this.setState({errors: errors})
        }) // end catch
    }
    this.setState({errors: errors})
  }
  transition (props) {
    return <Slide direction='up' {...props} />
  }
  setInputValue (element, value) {
    let state = this.state
    // remove the element from the errors object if set
    if (element in state.errors) {
      delete state.errors[element]
    }
    // set the input value and save it to the state
    state[element] = value
    // set the updated state
    this.setState(state)
  }
  render () {
    return (
      <div>
        <a onClick={this.handleClickOpen}>Subscribe</a>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
          transition={this.transition}
        >
          <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
          { this.state.isSubscribed
              ? <div>
                <DialogContent>
                  <DialogContentText>
                    You are subscribed
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    id='close'
                    label='Close'
                    onClick={this.handleClose}
                  />
                </DialogActions>
              </div>
            : <div>
              <DialogContent>
                { 'technical' in this.state.errors
                  ? <DialogContentText className='error'>
                    {this.state.errors['technical']}
                  </DialogContentText>
                  : ''
                }
                <DialogContentText>
                  To subscribe to this website, please enter your email address here. We will send
                  updates occationally.
                </DialogContentText>
                <TextField
                  id='name'
                  error={'name' in this.state.errors}
                  label='Name'
                  defaultValue=''
                  setInputValue={this.setInputValue}
                  textColor='black'
                  required
                />
                <TextField
                  id='email'
                  error={'email' in this.state.errors}
                  label='Email Address'
                  defaultValue=''
                  setInputValue={this.setInputValue}
                  textColor='black'
                  required
                />
              </DialogContent>
              <DialogActions>
                <Button
                  id='cancel'
                  label='Cancel'
                  onClick={this.handleClose}
                />
                <Button
                  id='subscribe'
                  label='Subscribe'
                  onClick={this.handleSubmit}
                  variant='raised'
                />
              </DialogActions>
            </div>
            }
        </Dialog>
      </div>
    )
  }
}
