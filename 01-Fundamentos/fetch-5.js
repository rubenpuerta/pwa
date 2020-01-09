fetch("https://reqres.in/api/users/10000")
  .then(resp => {
    // resp
    //   .clone()
    //   .json()
    //   .then(usuario => {
    //     console.log(usuario);
    //   });

    // resp
    //   .clone()
    //   .json()
    //   .then(usuario => {
    //     console.log(usuario);
    //   });

    if (resp.ok) {
      return resp.json();
    } else {
      throw Error("No existe el usuario 10000");
      //   console.log("No existe el usuario 10000");
    }
  })
  .then(console.log)
  .catch(error => {
    console.log("Error en la petición");
    console.log(error);
  });
