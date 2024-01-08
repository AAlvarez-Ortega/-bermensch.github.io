

// Obtención de datos y lógica para mostrar formulario y editar
const db = firebase.firestore();
const container = document.getElementById('container');

db.collection("citas").orderBy("hora_de_registro", "asc").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // ... (código para mostrar los datos y botón de editar)
  });

  const editFormContainer = document.getElementById('editFormContainer');
  const editForm = document.getElementById('editForm');
  const contactoInput = document.getElementById('contacto');
  const fechaInput = document.getElementById('fecha');
  const horaCitaInput = document.getElementById('horaCita');
  const nombreInput = document.getElementById('nombre');
  const usuarioInput = document.getElementById('usuario');

  document.addEventListener('DOMContentLoaded', () => {
    const modificarButtons = document.querySelectorAll('.modificar-btn');
    modificarButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const data = querySnapshot.docs[index].data();

        contactoInput.value = data.contacto;
        fechaInput.value = data.fecha;
        horaCitaInput.value = data.hora_de_cita;
        nombreInput.value = data.nombre;
        usuarioInput.value = data.usuario;

        editFormContainer.style.display = 'block';
        
        // Almacenar el ID del documento a editar en un atributo del formulario
        editForm.dataset.docId = querySnapshot.docs[index].id;
      });
    });

    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const docId = editForm.dataset.docId;
      const docRef = db.collection('citas').doc(docId);

      try {
        await docRef.update({
          contacto: contactoInput.value,
          fecha: fechaInput.value,
          hora_de_cita: horaCitaInput.value,
          nombre: nombreInput.value,
          usuario: usuarioInput.value
        });

        console.log('Datos actualizados en Firebase:');
        console.log('Contacto:', contactoInput.value);
        console.log('Fecha:', fechaInput.value);
        console.log('Hora de la cita:', horaCitaInput.value);
        console.log('Nombre:', nombreInput.value);
        console.log('Usuario:', usuarioInput.value);

        editFormContainer.style.display = 'none';
      } catch (error) {
        console.error('Error al actualizar los datos en Firebase:', error);
      }
    });
  });
}).catch((error) => {
  console.error("Error al obtener los datos: ", error);
});



