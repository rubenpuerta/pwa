let request = new XMLHttpRequest();

request.open("GET", "https://reqres.in/api/users", true);
request.send(null);

request.onreadystatechange = function(state) {
  if (request.readyState === 4) {
    let resp = JSON.parse(request.response);
    console.log(resp);
  }
};
