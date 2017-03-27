import React, { Component } from 'react'
import { Button, Icon, Tooltip } from 'react-mdl'

export default class WinnerRow extends Component {
	render () {
		const { winner, match, handleDisputeBtn} = this.props;
		var matchDate = new Date(match.date).toISOString().slice(0, 10);
	    return (
	      		<tr>
	      			<td className="mdl-data-table__cell--non-numeric">{matchDate}</td>
	      			<td style={{'textAlign':'left'}}><img src={"/img/" + winner.customAvatar + ".png"} alt={winner.name} style={{'marginLeft':'0'}} className="avatar" />{winner.name}</td>
	      			<td>{parseFloat(match.pointsExchanged).toFixed(2)}</td>
	      			<td>
	      				<Tooltip label="Dispute this match" position="right">
		      				<Button onClick={handleDisputeBtn} ripple>
							    <Icon name="feedback" style={{'color':'#ff4081'}} />
							</Button>
		    			</Tooltip>
	      			</td>
	      		</tr>
	    )
	}
}

