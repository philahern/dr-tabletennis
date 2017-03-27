import React, { Component } from 'react'
import { Spinner } from 'react-mdl'
import LeagueTableRow from './LeagueTableRow'

export default class LeagueTableTable extends Component {

  render () {

  	const players = this.props.players.map((player, idx) => {
      	return (
          <LeagueTableRow player={player} clickHandler={this.props.clickHandler} key={player.uid} position={idx+1} />
      	)
    });

    return (

		<table className="mdl-data-table mdl-shadow--2dp league-table" style={this.props.style}>
		{!this.props.matchMode &&
			<thead>
			<tr>
				<th className="mdl-data-table__cell--non-numeric">Pos</th>
				<th style={{'textAlign':'left'}}>Name</th>
				<th>Points</th>
			</tr>
			</thead>
		}
		<tbody>
    {this.props.isLoading &&
      <tr><td colSpan="3" style={{'textAlign': 'center'}}><Spinner style={{'fontSize': '3em'}}/></td></tr>
    }
		{players}
		</tbody>
		</table>
    )
  } // Render
}



