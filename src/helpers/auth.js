import { ref, firebaseAuth } from '../config/constants'

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
    .set({
      email: user.email,
      uid: user.uid,
      name: user.name,
      customAvatar: user.customAvatar,
      points:40.001
    })
    .then(() => user)
}

export function updateUser (user) {
  var updates = {};
  updates['/users/' + user.uid + '/name'] = user.name;
  updates['/users/' + user.uid + '/customAvatar'] = user.avatar;

  return ref.update(updates)
}

export function getUserData (uid) {
    return ref.child('users/' + uid).once('value');
}