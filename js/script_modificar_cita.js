const citaForm = document.getElementById('citaForm');
const nombreInput = document.getElementById('nombre');
const fechaInput = document.getElementById('fecha');
const horaInput = document.getElementById('hora');
const contactoInput = document.getElementById('contacto');
const modificarCitaBtn = document.getElementById('modificarCitaBtn');
const eliminarCitaBtn = document.getElementById('eliminarCitaBtn');

const urlParams = new URLSearchParams(window.location.search);
const citaId = urlParams.get('id'); // Obtiene el ID de la cita del parámetro URL

// Inicializa Firebase (asegúrate de tener la configuración de Firebase)

// Obtén la referencia al documento específico en Firebase
const citaRef = db.collection('citas').doc(citaId);

citaRef.get().then((doc) => {
  if (doc.exists) {
    const data = doc.data();
    // Rellena el formulario con los datos obtenidos del documento
    nombreInput.value = data.nombre;
    fechaInput.value = data.fecha;
    horaInput.value = data.hora_de_cita;
    contactoInput.value = data.contacto;

    modificarCitaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Actualiza los datos en Firebase con los valores del formulario
      return citaRef.update({
        nombre: nombreInput.value,
        fecha: fechaInput.value,
        hora_de_cita: horaInput.value,
        contacto: contactoInput.value
      })
      .then(() => {
        console.log('Datos actualizados correctamente');
      })
      .catch((error) => {
        console.error('Error al actualizar los datos: ', error);
      });
    });

    eliminarCitaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Elimina el documento de Firebase
      return citaRef.delete()
      .then(() => {
        console.log('Cita eliminada correctamente');
      })
      .catch((error) => {
        console.error('Error al eliminar la cita: ', error);
      });
    });
  } else {
    console.log('No se encontró el documento');
  }
}).catch((error) => {
  console.error('Error al obtener el documento: ', error);
});
