    const db = firebase.firestore();
    const container = document.getElementById('container');

    // Consulta los datos en la colección específica
    db.collection("NOMBRE_DE_LA_COLECCION").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Crea un elemento div para mostrar los datos
        // Rellena el div con los datos que deseas mostrar
        container.innerHTML = `
          <p>Avatar: ${data.avatar}</p>
          <p>Contacto: ${data.contacto}</p>
          <p>Fecha: ${data.fecha}</p>
          <p>Hora de la cita: ${data.hora_de_cita}</p>
          <p>Nombre: ${data.nombre}</p>
          <p>Usuario: ${data.usuario}</p>
          <hr>
        `;
        // Agrega el div al contenedor
        container.appendChild(div);
      });
    }).catch((error) => {
      console.error("Error al obtener los datos: ", error);
    });
