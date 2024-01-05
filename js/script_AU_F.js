//@ts-check

class FirebaseAuthHandler {
  constructor(auth, provider) {
    this.auth = auth;
    this.provider = provider;
    this.sesionCerrada = false;
    this.iniciarEscuchaAutenticacion();
  }

  iniciarEscuchaAutenticacion() {
    this.auth.onAuthStateChanged(usuarioAuth => {
      if (!this.sesionCerrada) {
        if (usuarioAuth && usuarioAuth.email) {
          this.mostrarInfoUsuario(usuarioAuth);
        } else {
          if (!this.sesionCerrada) {
            this.iniciarSesion();
          }
        }
      }
    });
  }

  mostrarInfoUsuario(usuarioAuth) {
    // Mostrar la información del usuario
    email.value = usuarioAuth.email;
    nombre.value = usuarioAuth.displayName;
    avatar.src = usuarioAuth.photoURL;
  }

  iniciarSesion() {
    // Iniciar sesión con el proveedor de autenticación de Facebook
    firebase.auth().signInWithRedirect(this.provider);
  }

  async cerrarSesion() {
    try {
      await this.auth.signOut();
      this.sesionCerrada = true;
    } catch (e) {
      this.procesarError(e);
    }
  }

  procesarError(e) {
    console.log(e);
    alert(e.message);
  }
}

// Configurar el proveedor de autenticación de Facebook
const providerFacebook = new firebase.auth.FacebookAuthProvider();
providerFacebook.addScope('user_birthday');
providerFacebook.setCustomParameters({ display: 'popup' });

// Crear una instancia de la clase FirebaseAuthHandler con el proveedor de Facebook
const firebaseAuthHandler = new FirebaseAuthHandler(firebase.auth(), providerFacebook);
