// Acceder a la base de datos de Firestore
const db = firebase.firestore();
const citasContainer = document.getElementById('CITAS');

// Obtener la colección 'citas' y sus documentos
db.collection('citas').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const cita = doc.data();
    const citaItem = document.createElement('li');
    
    // Crear un elemento para cada campo y agregarlos al elemento de la lista
    const avatar = document.createElement('span');
    avatar.textContent = 'Avatar: ' + cita.avatar;
    citaItem.appendChild(avatar);

    const contacto = document.createElement('span');
    contacto.textContent = 'Contacto: ' + cita.contacto;
    citaItem.appendChild(contacto);

    const fecha = document.createElement('span');
    fecha.textContent = 'Fecha: ' + cita.fecha;
    citaItem.appendChild(fecha);

    const hora_de_cita = document.createElement('span');
    hora_de_cita.textContent = 'Hora de cita: ' + cita.hora_de_cita;
    citaItem.appendChild(hora_de_cita);

    const nombre = document.createElement('span');
    nombre.textContent = 'Nombre: ' + cita.nombre;
    citaItem.appendChild(nombre);

    const usuario = document.createElement('span');
    usuario.textContent = 'Usuario: ' + cita.usuario;
    citaItem.appendChild(usuario);

    // Agregar el elemento de la lista al contenedor de citas
    citasContainer.appendChild(citaItem);
  });
}).catch((error) => {
  console.error('Error al obtener las citas: ', error);
});

