
const database = firebase.firestore();
const citaForm = document.getElementById('citaForm');

function agendaCita() {
    firestore.collection("Citas").add({
      citaForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita el envío por defecto del formulario
  
      // Obtén los valores del formulario
      const nombre = document.getElementById('nombre').value;
      const fecha = document.getElementById('fecha').value;
      const contacto = document.getElementById('contacto').value;
      })
    })
  alert('Cita agendada con éxito');
}


