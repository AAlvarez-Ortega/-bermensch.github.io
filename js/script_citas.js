/** Nombre de usuario atenticado por Firebase y datos de la cita */
let usuario = "";
let avatar = "";
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

// Obtener el botón "Agendar Cita" por su ID
var agendarCitaBtn = document.getElementById('agendarCitaBtn');

// Manejar el evento click en el botón "Agendar Cita"
agendarCitaBtn.addEventListener('click', function(event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

  // Capturar los valores del formulario
  var nombre = document.getElementById('nombre').value;
  var fecha = document.getElementById('fecha').value;
  var contacto = document.getElementById('contacto').value;

  // Acceder a la base de datos de Firestore
  var db = firebase.firestore();

  // Agregar los datos a la colección "citas"
  db.collection('citas').add({
    nombre: nombre,
    fecha: fecha,
    contacto: contacto
  })
  // Limpiar el formulario después de agregar la cita
  document.getElementById('citaForm').reset();
});

function procesaError(e) {
  console.log(e);
  alert(e.message);
}

