import React, { Component } from 'react'
import classNames from 'classnames'
import { Icon, Tooltip, Badge } from 'react-mdl'

export default class LeagueTableRow extends Component {
	render () {
		const { player, position, clickHandler, winStreaker } = this.props;
	    const diff = parseFloat(player.points - player.previous).toFixed(2)
	    
	    const rowClass = classNames({
	      'selected': player.selected,
	      'hidden': player.hide
	    });

	    const diffClass = classNames({
	      'previous': true,
	      'positive': diff > 0,
	      'negative': diff < 0
	    });

	    var diffContent, streakBadge = null

	    if (diff !== 'NaN') 
	    	diffContent =  <span className={diffClass}>({diff})</span>

	    if (winStreaker.player === player.uid)
	    	streakBadge = <Tooltip label={"Win streak of " + winStreaker.streak} position="right">
	    					<Badge text={winStreaker.streak} overlap>
    							<Icon name="directions_run" />
						  	</Badge>
						  </Tooltip>


	    return (
      		<tr className={rowClass} id={player.uid} onClick={() => clickHandler(player)}>
      			<td className="mdl-data-table__cell--non-numeric">{position}</td>
      			<td style={{'textAlign':'left'}}><img src={"/img/" + player.customAvatar + ".png"} alt={player.name} style={{'marginLeft':'0'}} className="avatar" />{player.name} {streakBadge}</td>
      			<td>{parseFloat(player.points).toFixed(2)} 
            		{diffContent}
            </td>
      		</tr>
	    )
	}
}

