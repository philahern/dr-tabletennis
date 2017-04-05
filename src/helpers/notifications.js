import { db, messaging } from '../config/constants'

export function notifyRequestPermission () {
  return messaging.requestPermission()
                  .then(function() {
                    notifyGetToken()
                  })
}

export function notifyOnTokenRefresh () {
  messaging.onTokenRefresh(function() {
    notifyGetToken()
  });
}

export function notifyGetToken () {
  return messaging.getToken()
          .then(function(token) {
            //console.log('Token received.', token)
            if (token !== null) {
              sendTokenToServer(token)
            }
          })
          .catch(function(err) {
            console.log('Unable to retrieve token ', err)
          });
}

function sendTokenToServer(token) {
  const player = window.localStorage.getItem('loggedInAs')
  //console.log('Token sent to server.');
  return db.ref('/users/' + player + '/notificationTokens/' + token).set(true);
   
}

