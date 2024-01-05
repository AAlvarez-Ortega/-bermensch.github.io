provider.setCustomParameters({ prompt: "select_account" });

auth.onAuthStateChanged(

  usuarioAuth => {
    if (usuarioAuth && usuarioAuth.email) {
      // Usuario aceptado.
      // @ts-ignore Muestra el email registrado en Google.
      email.value = usuarioAuth.email;
      // @ts-ignore Muestra el nombre registrado en Google.
      nombre.value = usuarioAuth.displayName;
      // @ts-ignore Muestra el avatar registrado en Google.
      avatar.src = usuarioAuth.photoURL;
    } else {
      // No ha iniciado sesión. Pide datos para iniciar sesión.
      auth.signInWithRedirect(provider);
    }
  },
  // Función que se invoca si hay un error al verificar el usuario.
  procesaError
);
/** Termina la sesión. */
async function terminaSesión() {
  try {
    await auth.signOut();
    window.location.href = 'index.html'; 
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
