let img = document.querySelector("img");

fetch("gokusayain.png")
  .then(resp => resp.blob())
  .then(imagen => {
    // console.log(imagen)
    let imgPath = URL.createObjectURL(imagen);
    img.src = imgPath;
  });
