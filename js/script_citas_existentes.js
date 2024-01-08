const db = firebase.firestore();
const container = document.getElementById('container');

db.collection("citas").orderBy("hora_de_registro", "asc").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const citaInfo = document.createElement('div');
    const avatarImg = document.createElement('img');
    const listaDatos = document.createElement('ul');

    avatarImg.src = data.avatar;
    avatarImg.alt = 'Avatar';
    avatarImg.width = 50;
    avatarImg.classList.add('avatar-image');
      
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

    const editButton = document.createElement('button');
    editButton.textContent = 'Modificar';
    editButton.classList.add('modificar-btn');
    citaInfo.appendChild(editButton);
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
      });
    });

    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Lógica para actualizar los datos en Firebase
      // Aquí se debería implementar la lógica real para actualizar
      console.log('Datos actualizados en Firebase:');
      console.log('Contacto:', contactoInput.value);
      console.log('Fecha:', fechaInput.value);
      console.log('Hora de la cita:', horaCitaInput.value);
      console.log('Nombre:', nombreInput.value);
      console.log('Usuario:', usuarioInput.value);

      editFormContainer.style.display = 'none';
    });
  });
}).catch((error) => {
  console.error("Error al obtener los datos: ", error);
});

