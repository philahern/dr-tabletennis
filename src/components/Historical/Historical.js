import React, { Component } from 'react'
import { Grid, Cell, Spinner, Snackbar } from 'react-mdl'
import { getMatches, getPlayerData, matchesArray, getWinner } from '../../helpers/scoring'
import Scorecard from './Scorecard'
import WinnerRow from './WinnerRow'

export default class Historical extends Component {
	state = {
		player1:{},
		player2:{},
		matches:{},
		isSnackbarActive:false,
    	snackBarMsg:'',
		isLoading:true
	}
	componentDidMount () {

		const {player1, player2} = this.props.match.params;

		getPlayerData (player1).then((snap) => {
			const player1Data = snap.val();
			getPlayerData (player2).then((snap) => {
				const player2Data = snap.val();
				getMatches (player1, player2).then((snap) => {
					this.setState({
						player1: player1Data, 
						player2: player2Data,
						matches: snap.val(), 
						isLoading: false 
					})
		        });
		    }); 
		});
	}
	handleDisputeBtn = (e) => {
	    e.preventDefault()
	    this.setState({
	            isSnackbarActive: true,
	            snackBarMsg: "Thanks, this has been reported."
	    })
	}
	handleTimeoutSnackbar = () => {
    	this.setState({ isSnackbarActive: false });
  	}
	render () {
		var {player1, player2, matches} = this.state;
		var matchesList = matchesArray (matches)
		player1.count = 0
		player2.count = 0

		const matchups = matchesList.map((match, idx) => {
			var winner = getWinner(player1, player2, match);
			winner.count += 1;
	      	return (
	      		<WinnerRow winner={winner} match={match} handleDisputeBtn={this.handleDisputeBtn} key={idx} />
	      	)
	    });
	    return (
	    	<div style={{'textAlign': 'center'}}>
		    	<Grid>
		    	  <Cell col={1}>
				  </Cell>
		          <Cell col={5}>
					<Scorecard player={player1} isLoading={this.state.loading} />
				  </Cell>
				  <Cell col={5}>
				  	<Scorecard player={player2} isLoading={this.state.loading} />
				  </Cell>
				  <Cell col={1}>
				  </Cell>
				</Grid>

				<table className="mdl-data-table mdl-shadow--2dp" style={{'width': '80%', 'margin': 'auto', 'fontSize':'2em'}}>
				<thead>
				<tr>
					<th className="mdl-data-table__cell--non-numeric">Date</th>
					<th style={{'textAlign':'left'}}>Winner</th>
					<th>Points Exchanged</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
			    {this.state.isLoading &&
			      <tr><td colSpan="3" style={{'textAlign': 'center'}}><Spinner style={{'fontSize': '3em'}}/></td></tr>
			    }
			    {matchups}
				</tbody>
				</table>
				<Snackbar
		          active={this.state.isSnackbarActive}
		          onTimeout={this.handleTimeoutSnackbar}>{this.state.snackBarMsg}</Snackbar> 
			</div>
	    )
	}
}

