// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos
const database = firebase.database();

// Accede al formulario
const citaForm = document.getElementById('citaForm');

// Agrega un evento al formulario para enviar datos a Firebase al hacer submit
citaForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita el envío por defecto del formulario

  // Obtén los valores del formulario
  const nombre = document.getElementById('nombre').value;
  const fecha = document.getElementById('fecha').value;
  const contacto = document.getElementById('contacto').value;

  // Crea un objeto con los datos
  const nuevaCita = {
    nombre,
    fecha,
    contacto
  };

  // Guarda los datos en la base de datos de Firebase
  database.ref('citas').push(nuevaCita)
    .then(() => {
      alert('Cita agendada exitosamente');
      // Puedes redirigir a otra página aquí si lo deseas
    })
    .catch((error) => {
      console.error('Error al agendar cita:', error);
      alert('Ocurrió un error al agendar la cita');
    });
});
