   const db = firebase.firestore();
const container = document.getElementById('container');

// Consulta los datos en la colección específica
db.collection("citas").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const citaInfo = document.createElement('div');
    citaInfo.innerHTML = `
      <p><img>Avatar: ${data.avatar}</img></p>
      <p>Contacto: ${data.contacto}</p>
      <p>Fecha: ${data.fecha}</p>
      <p>Hora de la cita: ${data.hora_de_cita}</p>
      <p>Nombre: ${data.nombre}</p>
      <p>Usuario: ${data.usuario}</p>
      <hr>
    `;
    container.appendChild(citaInfo);
  });
}).catch((error) => {
  console.error("Error al obtener los datos: ", error);
});
