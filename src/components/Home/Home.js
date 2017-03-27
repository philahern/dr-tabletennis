import React, { Component } from 'react'
import { Grid, Cell, Icon, Button } from 'react-mdl'
import { Link } from 'react-router-dom'
import LeagueTable from './LeagueTable'
import MatchForm from './MatchForm'
import Welcome from '../Welcome'
import { players } from '../../config/constants'
import { orderBy } from 'lodash';
import { updatePoints } from '../../helpers/scoring'
import { isDialogAvailable } from '../../helpers/polyfill'
 
export default class Home extends Component {
	state = {
	    player1: '',
	    player2: '',
	    numSelected: 0,
	    matchMode: false,
	    isLoading: true,
	    showWelcome: false,
	    players: []
	}
	componentDidMount () {
		var showWelcome = false

		if (localStorage.getItem('showWelcome') === null) {
			showWelcome = true
		}

		players.on('value', snapshot => {  
			var playersListArray = [];
		  	const playersList = snapshot.val();
		  	Object.keys(playersList).forEach(function (key, index) {
			  	playersListArray.push(playersList[key]);
			});
			playersListArray = orderBy(playersListArray, 'points', 'desc');
		  	this.setState({players:playersListArray, isLoading: false, matchMode: false, player1:'', player2:'',numSelected:0, showWelcome:showWelcome})
		});
	}
	selectPlayers = (player) => {

		var newPlayers = this.state.players.slice()
		const playerIndex = newPlayers.indexOf(player)

		newPlayers[playerIndex].selected = true;
		

		if (this.state.numSelected === 0 ) {
			this.setState({player1: player, numSelected: 1, players:newPlayers})
		}
		if (this.state.numSelected === 1) {
			this.setState({player2: player, numSelected: 2, players:newPlayers})
		}
		if (this.state.numSelected === 2) {
			this.clearSelected();
			newPlayers[playerIndex].selected = true;
			this.setState({player1: player, numSelected: 1, players:newPlayers})
		}
  	}
  	clearSelected = () => {
		var newPlayers = this.state.players.slice()
		//
		const player1Index = newPlayers.indexOf(this.state.player1)	
		const player2Index = newPlayers.indexOf(this.state.player2)
		newPlayers[player1Index].selected = false;
		newPlayers[player2Index].selected = false;
		this.setState({players: newPlayers})
  	}
  	addMatch = () => {
  		var newPlayers = this.state.players.slice()
  		newPlayers.map((player) => {
  			if (player.uid !== this.state.player1.uid && player.uid !== this.state.player2.uid) {
				player.hide = true
  			}
  			return player
		});
		this.setState({players: newPlayers, matchMode: true})
  	}
  	matchResult = (result, points) => {
  		this.setState({isLoading: true})

  		result.pointsExchange = points
  		updatePoints(this.state.player1, this.state.player2, result)
	        .then((res) => {
	        	//this.setState({isLoading: false, matchMode: false, player1:'', player2:'',numSelected:0})
	        })
	        .catch((error) => {
	        	console.log(error)
	        })
  	}
  	handleCloseWelcome = () => {
  		localStorage.setItem('showWelcome', 'false');
	    this.setState({
	      showWelcome: false
	    });
  	}
	render () {
	    return (
	      <div className="page">
	        <Grid className="demo-grid-1">
	          <Cell col={9}>
	          	<LeagueTable matchMode={this.state.matchMode} isLoading={this.state.isLoading} players={this.state.players} clickHandler={this.selectPlayers} style={{'width':'100%'}} />
	            {this.state.matchMode &&
	            	<MatchForm player1={this.state.player1} player2={this.state.player2} handleSubmit={this.matchResult}/>
      			}	          	
	          </Cell>
	          <Cell col={3}>
	            {this.state.numSelected === 2 &&
	            	<div>
					<Button style={{'marginBottom':'2em'}} raised accent ripple onClick={this.addMatch}><Icon name="add" /> New Match</Button>
					<Link to={'/historical/' + this.state.player1.uid + '/' + this.state.player2.uid} className="navbar-brand">
						<Button raised accent ripple>Head 2 Head</Button>
					</Link>
					</div>
      			}
	          </Cell>
	        </Grid>
	        {isDialogAvailable() &&
	       		<Welcome openDialog={this.state.showWelcome} handleCloseDialog={this.handleCloseWelcome} />
	       	}
	      </div>
	    )
	}
}

