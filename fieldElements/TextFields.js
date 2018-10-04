import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles, createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

const geGold = 'rgb(207, 172, 68)'
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
})

const theme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
      root: {
        fontSize: '16px',
        fontFamily: 'Poorich',
        background: 'transparent',
        '&$selected': {
          backgroundColor: 'transparent',
          color: geGold
        }
      }
    },
    MuiInput: {
      underline: {
        color: 'white', // default this to white and change this color with Props.
        fontSize: '24px',
        fontFamily: 'Poorich',
        '&:focus:not($disabled):after': {
          backgroundColor: geGold
        },
        '&:hover:not($disabled):after': {
          backgroundColor: geGold
        },
        '&:hover:not($disabled):before': {
          backgroundColor: geGold
        }
      }
    }
  }
})

const propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  setInputValue: PropTypes.func.isRequired,
  required: PropTypes.bool,
  options: PropTypes.array,
  select: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.string,
  helperText: PropTypes.string,
  textColor: PropTypes.string
}

class TextFields extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: this.props.error,
      value: this.props.defaultValue,
      helperText: this.props.helperText
    }
    // bind this to the event handler
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      error: nextProps.error
    })
  }
  // handler for when the textfield is changed
  handleChange (event) {
    // check if the input fucntion is set
    if (this.props.setInputValue) {
      // pass the input id and value to the parent Component
      this.props.setInputValue(this.props.id, event.target.value)
    }
    // @TODO: error and helperText should be decided based on the validator js file.
    this.setState({value: event.target.value, error: false, helperText: ''})
  }
  render () {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.container}>
          <TextField
            type='text'
            id={this.state.id}
            label={this.props.label}
            error={this.state.error}
            className={classes.textField}
            value={this.state.value}
            onChange={this.handleChange}
            select={this.props.select}
            multiline={this.props.multiline}
            rows={this.props.rows}
            helperText={this.state.helperText}
            FormHelperTextProps={{style: {fontFamily: 'Poorich', fontSize: '14px'}}}
            InputLabelProps={{style: {fontFamily: 'Poorich', color: geGold, fontSize: '16px'}}}
            inputProps={{style: {color: this.props.textColor}}}
            margin='dense'
            fullWidth
          >
            { this.props.select
              ? this.props.options.map((options, i) => {
                // Return the element. Also pass key
                return (<MenuItem key={i} value={options[0]}>{options[1]}</MenuItem>)
              })
              : ''
            }
          </TextField>
        </div>
      </MuiThemeProvider>
    )
  }
}

TextFields.propTypes = propTypes

export default withStyles(styles)(TextFields)
