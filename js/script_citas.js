const database = firebase.firestore

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
  const Cita =  await database.collection('citas').doc().set({
    nombre,
    fecha,
    contacto
  })
    console.log(Cita)
    alert("cita agendada corretamente");

  
});
