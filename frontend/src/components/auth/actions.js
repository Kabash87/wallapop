import React, { useState } from "react";


export const updateProfile = async(data) => {
  const result = { statusResponse : true, error: null }
  try {    // no entiendo el firebase ??
    await firebase.auth().currentUser.updateProfile(data) 
  } catch (error) {
    result.statusResponse = false
    result.error = error
  }
  return result

}



// Para borrar usuario ------------------------
/* 1- Creamos la funcion // () el identificador que usamos para borrar
  2- con el filter hacemos que nos devuelva todos los nombre distintos (!=) al que queremos borrar 


const deleteUsuario = (nombre del usuario) => {
  const changeUsuario = usuarioArray.filter(usuario => usuario.nombre != nombre)
  setUsuarioArray(changeUsuario)

}

** Tenemos que crear un boton dentro del return

<Button className="btn btn-danger"> Eliminar usuario </button>

** En la parte del .map , hay que ponerle el onClick

<button className="btn btn-danger mx-1"> onClick={deleteUsuario(usuario.nombre)} </button>

** Para que no ejecute la funcion del onClick directamente hay que ponerle una arrow function () =>
<button className="btn btn-danger mx-1"> onClick={() => deleteUsuario(usuario.nombre)} </button>

*/

// Para editar usuario------------------------

/* 1- Creamos la funcion

  2- Creamos la funcion del nuevo estado (useState) 

  const [usuarioEditId, setUsusarioEditId] = useState(null);

  3- Creamos el Boton de Editar en la parte .map
<button className="btn btn-danger mx-1"> onClick={setUsuarioEdit(usuario.nombre)} </button>

  4- Creamos la funcion setUsuarioEdit

  const setUsuarioId = (nombre) => {
    const usuario = usuarioArray.find((usuario) => usuario.nombre === nombre)
    setFormData ({ nombre: email: usuario.email, password: usuario.password  })
    setUsuarioEditId(nombre)

  }






*/