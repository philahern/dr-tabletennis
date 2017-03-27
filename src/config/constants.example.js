import firebase from 'firebase'

const config = {
/* Put your firebase config here */
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const players = firebase.database().ref().child('users')
export const firebaseAuth = firebase.auth