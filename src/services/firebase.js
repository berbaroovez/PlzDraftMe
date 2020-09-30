import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAkg7JzObJCe01cmhp5HYd6EeL8XrYo-nE",
    authDomain: "chatty-19de0.firebaseapp.com",
    databaseURL: "https://chatty-19de0.firebaseio.com",
}

firebase.initializeApp(config)
export const auth = firebase.auth
export const db = firebase.database()