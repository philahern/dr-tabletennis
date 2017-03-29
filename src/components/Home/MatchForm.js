import React, { Component } from 'react'
import { RadioGroup, Radio, Button, Snackbar } from 'react-mdl'
import { calculatePointsExchange } from '../../helpers/scoring'

export default class MatchForm extends Component {
	state = {
	    winner: '',
	    margin: '',
	    pointsExchange: 0,
	    isSnackbarActive: false,
	    snackBarMsg:''
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}
	handleFormSubmit = (e) => {
  		e.preventDefault()

		const { winner, margin } = this.state;
		const { player1, player2 } = this.props;

  		if (this.state.winner && this.state.margin) {
			var pointsExchange = calculatePointsExchange (player1, player2, winner, margin)
			this.props.handleSubmit(this.state, pointsExchange)
	    } else {
	      this.setState({
	            isSnackbarActive: true,
	            snackBarMsg: "Fill in all the fields, ya lazy lump!"
	      });
	    }
  	}
	handleTimeoutSnackbar = () => {
	    this.setState({ isSnackbarActive: false });
	}
	render () {
		const { isSnackbarActive, snackBarMsg } = this.state;
		return (
			<form onSubmit={this.handleFormSubmit}>
				<table className="mdl-data-table mdl-shadow--2dp league-table" style={{'width': '100%'}}>
				<tbody>
				<tr>
				<td style={{'textAlign': 'center'}}>
					<h3>Who Won?</h3>
					<RadioGroup name="winner" value={this.state.winner} onChange={this.handleChange}>
					    <Radio value="player1" ripple>{this.props.player1.name} </Radio>
					    <Radio value="player2" ripple>{this.props.player2.name}</Radio>
					</RadioGroup>
					<h3>Losers score?</h3>
					<RadioGroup name="margin" value={this.state.margin} onChange={this.handleChange}>
						<Radio value="hammering" ripple>less than 11</Radio>
					    <Radio value="good-win" ripple>11-15</Radio>
					    <Radio value="close" ripple>16+</Radio>
					</RadioGroup>
					<Button style={{'margin':'25px'}} type="submit" raised accent ripple>Add Result</Button> 
					<div><Button onClick={this.props.handleCancel} type="button" ripple>Cancel</Button></div>
				</td>
				</tr>
				</tbody>
				</table>
				<Snackbar
				    active={isSnackbarActive}
				    onClick={this.handleClickActionSnackbar}
				    onTimeout={this.handleTimeoutSnackbar}>{snackBarMsg}</Snackbar> 
			</form>

    	)
  	} // Render
}



