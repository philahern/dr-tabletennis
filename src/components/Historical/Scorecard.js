import React from 'react'
import { Card, CardTitle, CardText, CardActions, Spinner } from 'react-mdl'

const ScoreCard = ({ player, isLoading }) => (

		<Card shadow={0} style={{width: '300px', height: '190px', margin: 'auto'}}>
		    <CardTitle expand style={{color: '#fff', background: 'url(/img/' + player.customAvatar + '.png) bottom right 15% no-repeat rgb(255, 186, 210)'}}>{player.name}</CardTitle>
		    <CardText>
		        <h2 className="big-score">
		        	{isLoading &&
		    					<Spinner style={{'fontSize': '3em'}}/>
		  				}
		  				{!isLoading && player.count}</h2>
		    </CardText>
		    <CardActions border>
		    </CardActions>
		</Card>

)

export default ScoreCard