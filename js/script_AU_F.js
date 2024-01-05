import { getAuth, signInWithRedirect, signOut, GoogleAuthProvider } from "firebase/auth";

class FirebaseAuthHandler {
  constructor() {
    this.auth = getAuth();
    this.provider = new GoogleAuthProvider();
    this.signedIn = false;
    this.initAuth();
  }

  initAuth() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.signedIn = true;
        this.displayUserInfo(user);
      } else {
        this.signedIn = false;
      }
    });
  }

  displayUserInfo(user) {
    // Mostrar la información del usuario en la interfaz
    const emailOutput = document.getElementById('email');
    const displayNameOutput = document.getElementById('displayName');
    const photoOutput = document.getElementById('photo');

    emailOutput.textContent = user.email;
    displayNameOutput.textContent = user.displayName;
    photoOutput.src = user.photoURL;
  }

  async signIn() {
    try {
      await signInWithRedirect(this.auth, this.provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
}

const authHandler = new FirebaseAuthHandler();

