/** Nombre de usuario atenticado por Firebase y datos de la cita */
let usuario = "";
let avatar = "";
let nombre = document.getElementById("nombre");
let feha = document.getElementById("fecha");
let contacto = document.getElementById("contacto");
/** Conexión al sistema de autenticación de Firebase. */
// @ts-ignore
const auth = firebase.auth();
/** Tipo de autenticación de usuarios. En este caso es con Google. */
// @ts-ignore
const provider = new firebase.auth.GoogleAuthProvider();
/* Configura el proveedor de Google para que permita seleccionar de una
 * lista. */
provider.setCustomParameters({ prompt: "select_account" });
/* Recibe una función que se invoca cada que hay un cambio en la
 * autenticación y recibe el modelo con las características del usuario.*/
auth.onAuthStateChanged(
  /** Recibe las características del usuario o null si no ha iniciado
   * sesión. */
  async usuarioAuth => {
    if (usuarioAuth && usuarioAuth.email) {
      // Usuario aceptado.
      usuario = usuarioAuth.email;
      // Foto del Avatar
      avatar = usuarioAuth.photoURL;
    } else {
      // No ha iniciado sesión. Pide datos para iniciar sesión.
      alert("no tiene la sesion iniciada");
      await auth.signInWithRedirect(provider);
    }
  },
  // Función que se invoca si hay un error al verificar el usuario.
  procesaError
);
/** Conexión a la base de datos. */
// @ts-ignore
const firestore = firebase.firestore();
var citaForm = document.getElementById('citaForm');


/** Agrega un usuario a la base de datos. */
function agendarCita() {
  /* "MENSAJE" es el nombre de la colección a la que se agregan los datos.
   * "USUARIO", "TEXTO" y "TIMESTAMP" son los nombres de los campos en el
   * documento.
   * El timestamp contiene la fecha y hora en que se agrega el registro.*/
  firestore.collection("CITA").add({
    NOMBRE: nombre,
    FECHA: fecha,
    CONTACTO: contacto,
    USUARIO: usuario,
    TIMESTAMP: firebase.firestore.FieldValue.serverTimestamp(),
    AVATAR: avatar,
  });
  alert("cita agregada");
}
/** Procesa un error. Muestra el objeto en la consola y un cuadro de
 * alerta con el mensaje.
 * @param {Error} e descripción del error. */
function procesaError(e) {
  console.log(e);
  alert(e.message);
}


