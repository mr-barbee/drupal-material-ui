import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Button from 'material-ui/Button'

const geGold = 'rgb(207, 172, 68)'
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: geGold,
    '&:hover': {
      backgroundColor: geGold
    }
  }
})

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 3,
        border: 0,
        height: 48,
        padding: '0 30px',
        fontSize: '18px',
        fontFamily: 'Poorich'
      }
    }
  }
})

const propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string
}

class Buttons extends Component {
  constructor (props) {
    super(props)
    this.state = {
      label: this.props.label,
      id: this.props.id,
      variant: this.props.variant
    }
  }
  render () {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <Button
          color='inherit'
          variant={this.state.variant}
          className={classes.button}
          onClick={() => { this.props.onClick(this.state.id) }} >
          {this.state.label}
        </Button>
      </MuiThemeProvider>
    )
  }
}

Buttons.propTypes = propTypes

export default withStyles(styles)(Buttons)
