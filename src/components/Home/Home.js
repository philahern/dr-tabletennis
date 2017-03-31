import React, { Component } from 'react'
import { Grid, Cell, Icon, Button } from 'react-mdl'
import { Link } from 'react-router-dom'
import LeagueTable from './LeagueTable'
import MatchForm from './MatchForm'
import Welcome from '../Welcome'
import { players } from '../../config/constants'
import { updatePoints, getWinStreaker, sortedArray } from '../../helpers/scoring'
import { isDialogAvailable } from '../../helpers/polyfill'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
 
export default class Home extends Component {
	state = {
	    player1: '',
	    player2: '',
	    numSelected: 0,
	    matchMode: false,
	    isLoading: true,
	    showWelcome: false,
	    loggedInAs:'',
	    players: []
	}
	componentWillMount () {
		var showWelcome = false

		if (localStorage.getItem('showWelcome') === null) {
			showWelcome = true
		}

		var loggedInAs = localStorage.getItem('loggedInAs')

		players.on('value', snapshot => {  
			var playersListArray = sortedArray(snapshot.val(), 'points')
			const winStreaker = getWinStreaker(playersListArray)
		  	this.setState({players:playersListArray, isLoading: false, matchMode: false, player1:'', player2:'',numSelected:0, showWelcome:showWelcome, loggedInAs:loggedInAs, winStreaker: winStreaker})
		});
	}
	selectPlayers = (player) => {

		var newPlayers = this.state.players.slice()
		const playerIndex = newPlayers.indexOf(player)

		newPlayers[playerIndex].selected = true;
		

		if (this.state.numSelected === 0 ) {
			this.setState({player1: player, numSelected: 1, players:newPlayers})
		}
		if (this.state.numSelected === 1 && player.uid !== this.state.player1.uid) {
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
  	cancelMatchAdd = () => {
  		var newPlayers = this.state.players.slice()
  		newPlayers.map((player) => {
			player.hide = null
			player.selected = false
  			return player
		});
  		this.setState({isLoading: false, matchMode: false, player1:'', player2:'',numSelected:0, players: newPlayers})
  	}
  	handleCloseWelcome = () => {
  		localStorage.setItem('showWelcome', 'false');
	    this.setState({
	      showWelcome: false
	    });
  	}
	render () {
		const {player1, player2, numSelected, loggedInAs} = this.state;
		var buttons = ''
		if (numSelected === 2 && (player1.uid === loggedInAs || player2.uid === loggedInAs)) {
			buttons = <div className="buttons">
						<Button style={{'marginBottom':'2em'}} raised accent ripple onClick={this.addMatch}><Icon name="add" /> New Match</Button>
						<Link to={'/historical/' + player1.uid + '/' + player2.uid} className="navbar-brand">
							<Button raised accent ripple>Head 2 Head</Button>
						</Link>
					</div>
		}
	    return (
	      <div className="page">
	        <Grid className="demo-grid-1">
	          <Cell col={9}>
	          	<LeagueTable matchMode={this.state.matchMode} isLoading={this.state.isLoading} players={this.state.players} winStreaker={this.state.winStreaker} clickHandler={this.selectPlayers} style={{'width':'100%'}} />
	            {this.state.matchMode &&
	            	<MatchForm player1={player1} player2={player2} handleSubmit={this.matchResult} handleCancel={this.cancelMatchAdd}/>
      			}	          	
	          </Cell>
	          <Cell col={3}>
	              <ReactCSSTransitionGroup
			          transitionName="example"
			          transitionEnterTimeout={500}
			          transitionLeaveTimeout={300}>
	            	{buttons}
			      </ReactCSSTransitionGroup>

	          </Cell>
	        </Grid>
	        {isDialogAvailable() &&
	       		<Welcome openDialog={this.state.showWelcome} handleCloseDialog={this.handleCloseWelcome} />
	       	}
	      </div>
	    )
	}
}

