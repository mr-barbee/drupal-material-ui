import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles, createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import Radio, {RadioGroup } from 'material-ui/Radio'
import FormControlLabel from 'material-ui/form/FormControlLabel'
import FormControl from 'material-ui/form/FormControl'
import FormLabel from 'material-ui/form/FormLabel'

const geGold = 'rgb(207, 172, 68)'
const styles = theme => ({
  root: {
    display: 'flex'
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
})

const theme = createMuiTheme({
  overrides: {
    MuiRadio: {
      root: {
        color: 'white'
      },
      colorSecondary: {
        '&$checked': {
          color: geGold
        },
        '&$disabled': {
          color: 'rgba(225, 225, 225, 0.38)'
        }
      }
    },
    MuiFormControlLabel: {
      label: {
        '&$disabled': {
          color: 'rgba(225, 225, 225, 0.38)'
        }
      }
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: 'white'
        },
        color: 'white', // default this to white and change this color with Props.
        fontSize: '24px',
        fontFamily: 'Poorich'
      }
    },
    MuiTypography: {
      body1: {
        color: 'white', // default this to white and change this color with Props.
        fontSize: '24px',
        fontFamily: 'Poorich'
      }
    }
  }
})

const propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  setInputValue: PropTypes.func.isRequired,
  required: PropTypes.bool
}

class Radios extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.defaultValue
      // error: this.props.error,
    }
    // bind this to the event handler
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    // check if the input fucntion is set
    if (this.props.setInputValue) {
      // pass the input id and value to the parent Component
      this.props.setInputValue(this.props.id, event.target.value)
    }
    this.setState({ value: event.target.value })
  };

  render () {
    const { classes } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <FormControl component='fieldset' {...this.props.required} className={classes.formControl}>
            <FormLabel component='legend'>{this.props.label}</FormLabel>
            <RadioGroup
              aria-label={this.props.label}
              name={this.props.label}
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            >
              { this.props.options.map((options, i) => {
                // Return the element. Also pass key
                return (<FormControlLabel key={i} value={options[0]} control={<Radio />} label={options[1]} />)
              })}
            </RadioGroup>
          </FormControl>
        </div>
      </MuiThemeProvider>
    )
  }
}

Radios.propTypes = propTypes

export default withStyles(styles)(Radios)
