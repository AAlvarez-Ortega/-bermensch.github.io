firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
var db = firebase.firestore();

// Obtener el formulario
var citaForm = document.getElementById('citaForm');

// Manejar el evento submit del formulario
citaForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

  // Capturar los valores del formulario
  var nombre = document.getElementById('nombre').value;
  var fecha = document.getElementById('fecha').value;
  var contacto = document.getElementById('contacto').value;

  // Agregar los datos a la base de datos
  db.collection('citas').add({
    nombre: nombre,
    fecha: fecha,
    contacto: contacto
  })

  // Limpiar el formulario después de agregar la cita
  citaForm.reset();
});
