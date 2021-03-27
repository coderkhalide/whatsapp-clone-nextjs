import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCMxMO_3aOuoAVJdttred7a8iCOhDBVon4",
    authDomain: "whatsapp-ks.firebaseapp.com",
    projectId: "whatsapp-ks",
    storageBucket: "whatsapp-ks.appspot.com",
    messagingSenderId: "844005526864",
    appId: "1:844005526864:web:a160c0e838ecaaf5dcb055"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }