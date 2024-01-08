const citaForm = document.getElementById('citaForm');
const nombreInput = document.getElementById('nombre');
const fechaInput = document.getElementById('fecha');
const horaInput = document.getElementById('hora');
const contactoInput = document.getElementById('contacto');
const modificarCitaBtn = document.getElementById('modificarCitaBtn');
const eliminarCitaBtn = document.getElementById('eliminarCitaBtn');

const urlParams = new URLSearchParams(window.location.search);
const citaId = urlParams.get('id'); // Obtiene el ID de la cita del parámetro URL

const db = firebase.firestore();
const citaRef = db.collection('citas').doc(citaId);

// Verificar si el usuario actual está autenticado y tiene el correo autorizado
firebase.auth().onAuthStateChanged((user) => {
  if (user && user.email === 'alvarez.ortega.aldourie@gmail.com') {
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
            alert('Cita actualizada');
            console.log('Datos actualizados correctamente');
            window.location.href = 'citas_existentes.html'; // Redirecciona a citas_existentes.html
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
            alert('Registro eliminado');
            console.log('Cita eliminada correctamente');
            window.location.href = 'citas_existentes.html'; // Redirecciona a citas_existentes.html
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
  } else {
    console.log('Usuario no autorizado para modificar o borrar documentos.');
    // Puedes realizar alguna acción si el usuario no está autorizado
  }
});
