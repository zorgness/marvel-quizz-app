import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_MARVEL_API_KEY_FIREBASE,
  authDomain:  process.env.REACT_APP_MARVEL_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_MARVEL_PROJECT_ID,
  storageBucket: process.env.REACT_APP_MARVEL_STRORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MARVEL_MESSENGING_SENDER_ID,
  appId: process.env.REACT_APP_MARVEL_APP_ID
};

class Firebase {
  constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.firestore()
  }

  // inscription
  signupUser = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  // Connexion
  loginUser = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

  // Déconnexion
  signoutUser = () => this.auth.signOut();

  // Récupérer le mot de passe
  passwordReset = email => this.auth.sendPasswordResetEmail(email);

  // firestore
  user = uid => this.db.doc(`users/${uid}`);
}

export default Firebase;
