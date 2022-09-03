import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyB2Sijb17A2TEjcBlBZ1U9oqTVmJvzk6_s",
  authDomain: "my-marvel-quiz-b63e3.firebaseapp.com",
  projectId: "my-marvel-quiz-b63e3",
  storageBucket: "my-marvel-quiz-b63e3.appspot.com",
  messagingSenderId: "479201509212",
  appId: "1:479201509212:web:a02743d86c1b216e328b99"
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
