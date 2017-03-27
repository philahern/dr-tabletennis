import { ref } from '../config/constants'
import { orderBy } from 'lodash'

export function calculatePointsExchange (player1, player2, winner, margin) {

    var pointsDiff = Math.abs(player1.points - player2.points); 
    var strength = 1
    var multiplier = 1

    /* Limit the points diff to 10 max  */
    if (pointsDiff > 10) {
      pointsDiff = 10
    }

    /* If the player that wins is the better player, set the strength to -1 */
    if (player1.points > player2.points) {
      if (winner === 'player1') {
        strength = -1
      }
    }
    if (player2.points > player1.points) {
      if (winner === 'player2') {
        strength = -1
      }
    }

    /* Determine the multiplier based on the margin of victory */
    if (margin === 'good-win') {
        multiplier = 1.25
    }
    if (margin === 'hammering') {
        multiplier = 1.75
    }

    /* Formulae for calculating the points exchange */
    const pointsExchange = Math.abs(((pointsDiff*0.1) + strength)*multiplier).toFixed(3)

/*    console.log('Player 1 points:', player1.points)
    console.log('Player 2 points:', player2.points)
    console.log('Winner:', winner)  
    console.log('The points exchange is ', pointsExchange) */

    return pointsExchange
}

export function updatePoints (player1, player2, result) {

    if (result.winner === 'player1') {
      player1.previous = player1.points
      player1.points += (result.pointsExchange*1)
      player2.previous = player2.points
      player2.points -= result.pointsExchange
    } else if (result.winner === 'player2') {
      player2.previous = player2.points
      player2.points += (result.pointsExchange*1)
      player1.previous = player1.points
      player1.points -= result.pointsExchange
    }

    const newMatchKey = ref.child('matches').push().key;
    const matchupKey = [player1.uid, player2.uid].sort().join('-')
    const match = {
        'date': (new Date()).toJSON(),
        'player1': player1.uid,
        'player2': player2.uid,
        'player1Name': player1.name,
        'player2Name': player2.name,
        'winner': result.winner,
        'margin': result.margin,
        'pointsExchanged': result.pointsExchange 
    }
    var updates = {};
      updates['/users/' + player1.uid + '/points'] = player1.points;
      updates['/users/' + player2.uid + '/points'] = player2.points;
      updates['/users/' + player1.uid + '/previous'] = player1.previous;
      updates['/users/' + player2.uid + '/previous'] = player2.previous;
      updates['/users/' + player1.uid + '/matches/' + newMatchKey] = match;
      updates['/users/' + player2.uid + '/matches/' + newMatchKey] = match;
      updates['/matches/' + newMatchKey] = match;
      updates['/matchups/' + matchupKey + '/' + newMatchKey] = match;

    return ref.update(updates)
}

export function getMatches (player1, player2) {
    const matchupKey = [player1, player2].sort().join('-')
    return ref.child('matchups/' + matchupKey).once('value');
}

export function getPlayerData (player) {
    return ref.child('users/' + player).once('value');
}

export function matchesArray (matches) {
    var matchesArray = [];
    if (matches !== null) {
      Object.keys(matches).forEach(function (key, index) {
          matchesArray.push(matches[key]);
      });
    }

    return orderBy(matchesArray, 'date', 'desc');
}
export function getWinner (player1, player2, match) {
    if (player1.uid === match[match.winner]) return player1
    if (player2.uid === match[match.winner]) return player2     
}

