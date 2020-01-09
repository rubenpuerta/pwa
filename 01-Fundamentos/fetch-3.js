// Petición GET
// https://reqres.in/api/users

let usuario = {
  nombre: "Ruben",
  edad: 41
};

fetch("https://reqres.in/api/users", {
  method: "POST", // PUT, DELETE, GET, POST
  body: JSON.stringify(usuario),
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(resp => resp.json())
  .then(console.log)
  .catch(error => console.log("Error en peticion", error));
