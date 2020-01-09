class Camara {
  constructor(videoNode) {
    this.videoNode = videoNode;
    console.log("Camara Class Int");
  }

  encender() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            width: 300,
            height: 300
          }
        })
        .then(stream => {
          this.videoNode.srcObject = stream;
          this.videoStream = stream;
        })
        .catch(err => console.log(err));
    }
  }

  apagar() {
    this.videoNode.pause();

    if (this.videoStream) {
      this.videoStream.getTracks()[0].stop();
    }
  }

  tomarFoto() {
    // Crear un elemento canvas para renderizar ahí la foto
    let canvas = document.createElement("canvas");

    // Colocar las dimensiones igual al elemento del video
    canvas.setAttribute("width", 300);
    canvas.setAttribute("height", 300);

    // Obetern el contesto del canvas
    let context = canvas.getContext("2d"); // Una simple imagen

    // Dibujar la imagen dentro del canvas
    context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);

    this.foto = context.canvas.toDataURL();

    // Limpieza
    canvas = null;
    context = null;

    return this.foto;
  }
}
