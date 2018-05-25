import React from 'react'
import ReactDOM from 'react-dom'
import TextField from './fieldElements/TextFields'
import Button from './fieldElements/Buttons'
import SubscriptionForm from './subscription/SubscriptionForm'
// find all of the react widgets
const TextFields = document.getElementsByClassName(['react-textfield'])
const SelectLists = document.getElementsByClassName(['react-select'])
const Textareas = document.getElementsByClassName(['react-textarea'])
const Buttons = document.getElementsByClassName(['react-button'])
const SubscriptionForms = document.getElementsByClassName(['react-subscribe'])
// @TODO: since we are adding all the errors to each form only needs to the first option [0].
const ErrorMsgs = document.getElementsByName('error_msgs').length ? JSON.parse(document.getElementsByName('error_msgs')[0].value) : false
// loop through all of the textfields
Array.prototype.map.call(SelectLists, element => {
  const options = []
  // find the default input field rendered by drupal
  let defaultInput = element.parentElement.getElementsByClassName('form-select')[0]
  let label
  // find the default input field rendered by drupal
  Array.prototype.map.call(defaultInput.options, (element, i) => {
    if (element.value.length) {
      // create the list of options for the select list
      options[i] = [element.value, element.label]
    } else {
      label = element.label
    }
  })
  // find all of the select list elements and replace them with react elements
  ReactDOM.render(
    <TextField
      id={defaultInput.getAttribute('id')}
      error={defaultInput.classList.contains('error')}
      label={label}
      defaultValue={defaultInput.value.length ? defaultInput.value : ''}
      setInputValue={(id, value) => { document.getElementById(id).value = value }}
      helperText={ErrorMsgs ? ErrorMsgs[defaultInput.getAttribute('name')] : ''}
      textColor='white'
      options={options}
      select
    />,
    element
  )
})
// loop through all of the textfields
Array.prototype.map.call(TextFields, element => {
  // find the default input field rendered by drupal
  let defaultInput = element.parentElement.getElementsByClassName('form-text')[0]
  // find the default input field rendered by drupal
  ReactDOM.render(
    <TextField
      id={defaultInput.getAttribute('id')}
      error={defaultInput.classList.contains('error')}
      label={defaultInput.getAttribute('placeholder')}
      defaultValue={defaultInput.getAttribute('value')}
      setInputValue={(id, value) => { document.getElementById(id).value = value }}
      helperText={ErrorMsgs ? ErrorMsgs[defaultInput.getAttribute('name')] : ''}
      textColor='white'
    />,
    element
  )
})
// loop through all of the textares
Array.prototype.map.call(Textareas, element => {
  // find the default input field rendered by drupal
  let defaultInput = element.parentElement.getElementsByClassName('form-textarea')[0]
  // find the default input field rendered by drupal
  ReactDOM.render(
    <TextField
      id={defaultInput.getAttribute('id')}
      error={defaultInput.classList.contains('error')}
      label={defaultInput.getAttribute('placeholder')}
      defaultValue={defaultInput.value}
      setInputValue={(id, value) => { document.getElementById(id).value = value }}
      rows={defaultInput.getAttribute('rows')}
      helperText={ErrorMsgs ? ErrorMsgs[defaultInput.getAttribute('name')] : ''}
      multiline
      textColor='white'
    />,
    element
  )
})
// loop through all of the buttons
Array.prototype.map.call(Buttons, element => {
  // find the default input field rendered by drupal
  let defaultInput = element.parentElement.getElementsByClassName('form-submit')[0]
  // find the default input field rendered by drupal
  ReactDOM.render(
    <Button
      id={defaultInput.getAttribute('react-form-key')}
      label={defaultInput.getAttribute('value')}
      onClick={id => { document.getElementById(id).submit() }}
      variant='raised'
    />,
    element
  )
})
// loop through all of the Subscription forms
Array.prototype.map.call(SubscriptionForms, element => {
  ReactDOM.render(
    <SubscriptionForm />,
    element
  )
})
