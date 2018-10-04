import React from 'react'
import ReactDOM from 'react-dom'
import TextField from './fieldElements/TextFields'
import Radio from './fieldElements/Radios'
import Button from './fieldElements/Buttons'
import SubscriptionForm from './subscription/SubscriptionForm'
// find all of the react widgets
const TextFields = document.getElementsByClassName(['react-textfield'])
const Radios = document.getElementsByClassName(['react-radios'])
const SelectLists = document.getElementsByClassName(['react-select'])
const Textareas = document.getElementsByClassName(['react-textarea'])
const Buttons = document.getElementsByClassName(['react-button'])
const SubscriptionForms = document.getElementsByClassName(['react-subscribe'])
// @TODO: since we are adding all the errors to each form only needs to the first option [0].
const ErrorMsgs = document.getElementsByName('error_msgs').length ? JSON.parse(document.getElementsByName('error_msgs')[0].value) : false
// loop through all of the radios
Array.prototype.map.call(Radios, element => {
  const options = []
  let defaultValue
  let defaultInput = element.parentElement.getElementsByClassName('form-radios')[0]
  // find the default input field rendered by drupal
  Array.prototype.map.call(defaultInput.getElementsByClassName('form-type-radio'), (element, i) => {
    const rawOptions = element.getElementsByClassName('form-radio')[0]
    if (rawOptions.checked) {
      defaultValue = rawOptions.value
    }
    // create the list of options for the select list
    options[i] = [rawOptions.value, rawOptions.labels[0].innerText]
  })
  // check to see if we want to set a label
  let label = (element.parentElement.getElementsByClassName('control-label')[0].getElementsByClassName('form-radio').length) ? '' : element.parentElement.getElementsByClassName('control-label')[0].innerHTML
  // find all of the select list elements and replace them with react elements
  ReactDOM.render(
    <Radio
      id={defaultInput.getAttribute('id')}
      label={label}
      required={false}
      options={options}
      defaultValue={defaultValue}
      setInputValue={(id, value) => {
        Array.prototype.map.call(document.getElementById(id).getElementsByClassName('form-radio'), (element, i) => {
          if (element.value === value) {
            element.click()
          }
        })
      }}
    />,
    element
  )
})
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
  // get the variant for the button.
  let variant = defaultInput.getAttribute('id') === 'edit-back' || defaultInput.getAttribute('id') === 'edit-cancel' ? 'flat' : 'raised'
  // find the default input field rendered by drupal
  ReactDOM.render(
    <Button
      id={defaultInput.getAttribute('id')}
      label={defaultInput.getAttribute('value')}
      onClick={id => { document.getElementById(id).click() }}
      variant={variant}
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
