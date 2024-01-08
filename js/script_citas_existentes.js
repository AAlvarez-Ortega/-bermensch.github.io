  const db = firebase.firestore();
const container = document.getElementById('container');

// Consulta los datos en la colección específica y ordena por el campo "hora_de_registro"
db.collection("citas").orderBy("hora_de_registro", "asc").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const citaInfo = document.createElement('div');
    const avatarImg = document.createElement('img');
    const listaDatos = document.createElement('ul');

    avatarImg.src = data.avatar;
    avatarImg.alt = 'Avatar';
    avatarImg.width = 50; // Establece el ancho de la imagen
    avatarImg.classList.add('avatar-image'); // Agrega la clase para el estilo circular

    citaInfo.appendChild(avatarImg);

    const contacto = document.createElement('li');
    contacto.textContent = `Contacto: ${data.contacto}`;
    const fecha = document.createElement('li');
    fecha.textContent = `Fecha: ${data.fecha}`;
    const horaCita = document.createElement('li');
    horaCita.textContent = `Hora de la cita: ${data.hora_de_cita}`;
    const nombre = document.createElement('li');
    nombre.textContent = `Nombre: ${data.nombre}`;
    const usuario = document.createElement('li');
    usuario.textContent = `Usuario: ${data.usuario}`;

    listaDatos.appendChild(contacto);
    listaDatos.appendChild(fecha);
    listaDatos.appendChild(horaCita);
    listaDatos.appendChild(nombre);
    listaDatos.appendChild(usuario);

    citaInfo.appendChild(listaDatos);
    container.appendChild(citaInfo);
  });
}).catch((error) => {
  console.error("Error al obtener los datos: ", error);
});


