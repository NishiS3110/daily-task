import firebaseApp from 'firebase/app'
import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  // 下記はテストコードを自動実行するための暫定対応
  projectId: 'daily-task-test2019',
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
}
firebaseApp.initializeApp(config)

const db = firebase.firestore()

export {
  db
}
