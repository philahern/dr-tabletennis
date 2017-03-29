'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/**
 * Triggers when a new match is added and sends a notification to other player.
 *
 * Matches added to `/matches/{match}`.
 * Users save their device notification tokens to `/users/{Uid}/notificationTokens/{notificationToken}`.
 */
exports.sendMatchNotification = functions.database.ref('/matches/{matchID}').onWrite(event => {

	const matchID = event.params.matchID;
	const match = event.data.val()

	console.log('The MatchUID is ', match)
	if (!match) {
	  return console.log('No data')
	}

	var notifyUser = (match.addedBy === match.player1)  ? match.player2 : match.player1
	var opponent = (match.addedBy === match.player1)  ? match.player1Name : match.player2Name
	console.log('Going to notify user: ', notifyUser)

	// Get the list of device notification tokens.
	admin.database().ref(`/users/${notifyUser}`).once('value').then((snap) => {

		const player = snap.val()
		var body = '';

		if (notifyUser === match[match.winner]) {
			switch(match.margin) {
			    case 'good-win':
			        body = 'You got a good win over ' + opponent
			        break;
			    case 'close':
			        body = 'A close win over ' + opponent
			        break;
			    case 'hammering':
			        body = 'You hammered ' + opponent
			        break;
			}
		} else {
			switch(match.margin) {
			    case 'good-win':
			        body = opponent + ' got a good win over you'
			        break;
			    case 'close':
			        body = opponent + ' edged a close win over you'
			        break;
			    case 'hammering':
			        body = 'Ouch, ' + opponent + ' hammered you!'
			        break;
			}	
		}

		if (typeof(player.notificationTokens) === 'object') {

			const tokens = Object.keys(player.notificationTokens)
			const payload = {
				notification: {
					title: 'Match Alert!',
					body: body,
					icon: 'logo.png'
				}
			}
			admin.messaging().sendToDevice(tokens, payload).then(response => {
				response.results.forEach((result, index) => {
					const error = result.error;
			        if (error) {
			          console.error('Failure sending notification to', tokens[index], error);
			        }
			    });
			})

		}
	})  

});
