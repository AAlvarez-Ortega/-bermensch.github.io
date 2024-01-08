//@ts-check
/** Conexión al sistema de autenticación de Firebase. */
// @ts-ignore
const auth = firebase.auth();
/** Tipo de autenticación de usuarios. En este caso es con Facebook. */
// @ts-ignore
const provider = new firebase.auth.FacebookAuthProvider();
/* Configura el proveedor de Facebook para que permita seleccionar de una lista. */
provider.setCustomParameters({ display: 'popup' });

let sesionTerminada = false; // Variable para controlar si la sesión terminó

/* Recibe una función que se invoca cada que hay un cambio en la
 * autenticación y recibe el modelo con las características del usuario.*/
auth.onAuthStateChanged(
  /** Recibe las características del usuario o null si no ha iniciado sesión. */
  usuarioAuth => {
    if (usuarioAuth && usuarioAuth.email) {
      // Usuario aceptado.
      // @ts-ignore Muestra el email registrado en Facebook.
      email.value = usuarioAuth.email;
      // @ts-ignore Muestra el nombre registrado en Facebook.
      nombre.value = usuarioAuth.displayName;
      // @ts-ignore Muestra el avatar registrado en Facebook.
      avatar.src = usuarioAuth.photoURL;
    } else {
      // No ha iniciado sesión. Pide datos para iniciar sesión.
      if (!sesionTerminada) { // Verifica si la sesión no ha terminado antes
        auth.signInWithRedirect(provider);
      }
    }
  },
  // Función que se invoca si hay un error al verificar el usuario.
  procesaError
);

/** Termina la sesión. */
async function terminaSesión() {
  try {
    await auth.signOut();
    alert("sesion terminada");
    window.close();
    window.open('https://aalvarez-ortega.github.io/-bermensch.github.io/');
    window.close();
  } catch (e) {
    procesaError(e);
  }
}

/** Procesa un error. Muestra el objeto en la consola y un cuadro de
 * alerta con el mensaje.
 * @param {Error} e descripción del error. */
function procesaError(e) {
  console.log(e);
  alert(e.message);
}

