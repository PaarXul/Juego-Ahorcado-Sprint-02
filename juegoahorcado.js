var palabras = Array("Barcelona", "Santiago", "Brasilia");
let palabraAdi = "";
let palabraOculta = "";
let contadorVida = 6;
let letras_erradas = "";
let agregarpalabra = "";
let palabrasretenidas = "";

function iniciar() {
  //RESET DE VARIABLES DEL JUEGO.
  contadorVida = 6;
  letras_erradas = "";
  agregarpalabra = "";
  palabrasretenidas = "";
  palabraOculta = "";
  palabraAdi = "";
  limpiarDibujo();
  //Inicia el random de palabras. y muestra el tamaño de la palabra a adivinar.
  palabraOculta = palabras[Math.floor(Math.random() * palabras.length)];
  for (let i = 0; i < palabraOculta.length; i++) {
    palabraAdi = palabraAdi + "_ ";
  }
  document.getElementById("frase").innerHTML = palabraAdi;
}

let letra = "";
let code = "";
window.addEventListener(
  "keydown",
  function (event) {
    letra = event.key;
    code = event.keyCode;
    resultado();
    LetraM(letra);
  },
  false
);
function comprobar() {
  letra = letra.toUpperCase();

  palabraOculta = palabraOculta.toUpperCase();
  let nuevo = "";

  for (let i = 0; i < palabraOculta.length; i++) {
    //itera la palabra y busca por medio de la letra ingresada.
    if (letra == palabraOculta[i]) {
      nuevo = nuevo + letra + " ";
    } else {
      nuevo = nuevo + palabraAdi[i * 2] + " ";
    }
  }

  if (nuevo == palabraAdi) {
    //compara el resultado, si el resultado es igual se resta la vida. y añade la letra ingresada.
    contadorVida--;
    letras_erradas = letras_erradas + letra + " ";

    document.getElementById("letrasErroneas").innerHTML = letras_erradas;
    document.getElementById("vida").innerHTML =
      "Vidas Actuales: " + contadorVida;
  }

  palabraAdi = nuevo;
  //Inserta la palabra adivinada en el div de frase adivinada.
  document.getElementById("frase").innerHTML = palabraAdi;

  if (contadorVida < 1) {
    //si el contador de vida es menor a uno pierde
    document.getElementById("vida").innerHTML = "perdiste";
    document.getElementById("vida").classList = "perdiste";
    document.getElementById("vida").style.fontSize = "20px";
  }

  if (palabraAdi.search("_") == -1) {
    //busca en la palabra adivinada el guion bajo si este es menor a menos 1 se refleja el resultado ganador.
    document.getElementById("vida").innerHTML = "Ganaste";
    document.getElementById("vida").style.fontSize = "20px";
  }
  dibujar();
  letra = "";
}

function limpiarDibujo() {
  var canvas = document.getElementById("lienzo");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  document.getElementById("letrasErroneas").innerHTML = letras_erradas;
  document.getElementById("vida").innerHTML = "Vidas Actuales: " + contadorVida;
  document.getElementById("palabrasingresadas").innerHTML = palabrasretenidas;
}

function dibujar() {
  var canvas = document.getElementById("lienzo");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    //Dibuja la base del ahorcado
    if (contadorVida <= 5) {
      ctx.beginPath();
      ctx.moveTo(0, 150);
      ctx.lineTo(150, 150);
      ctx.stroke();
    }

    if (contadorVida <= 4) {
      //dibuja el poste
      ctx.beginPath();
      ctx.moveTo(30, 200);
      ctx.lineTo(30, 10);
      ctx.lineTo(150, 10);
      ctx.lineTo(150, 20);
      ctx.stroke();
    }

    if (contadorVida <= 3) {
      //Dibujo Cabeza
      ctx.beginPath();
      ctx.arc(150, 40, 20, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (contadorVida <= 2) {
      //dibujar cuerpo
      ctx.beginPath();
      ctx.moveTo(150, 60);
      ctx.lineTo(150, 100);
      ctx.stroke();
    }

    if (contadorVida <= 1) {
      //Dibujar Brazos
      ctx.beginPath();
      ctx.moveTo(150, 60);
      ctx.lineTo(130, 100);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(150, 60);
      ctx.lineTo(170, 100);
      ctx.stroke();
    }
    if (contadorVida == 0) {
      ctx.beginPath();
      ctx.moveTo(150, 100);
      ctx.lineTo(170, 130);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(150, 100);
      ctx.lineTo(130, 130);
      ctx.stroke();
    }
  }
}

function checkName(evento) {
  var charCode = evento;
  if (charCode != 0) {
    if (charCode < 65 || charCode > 90 == 192) {
      //HACK DEFINITIVO PARA ADMITIR SOLO LETRAS
    } else {
      LetraRepetida(letra);
    }
  }
}

function LetraM(string) {
  //solo letras MAYUSCULAS
  var out = "";
  //Se añaden las letras validas
  var filtro = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"; //Caracteres validos
  for (var i = 0; i < string.length; i++)
    if (filtro.indexOf(string.charAt(i)) != -1) checkName(code);
}

function LetraRepetida(LetraIngresada) {
  if (
    palabraAdi.includes(LetraIngresada) ||
    letras_erradas.includes(LetraIngresada)
  ) {
    //RETORNA SIN MOSTRAR UNA NUEVA LETRA INGRESADA
    return false;
  }
  comprobar();
}

function resultado() {
  //COMPRUEBA EL RESULTADO ACTUAL
  if (contadorVida < 1) {
    //si el contador de vida es menor a uno pierde
    letra = "";
    document.removeEventListener("keydown", Window, false);
  }
  if (palabraAdi.search("_") == -1) {
    //busca en la palabra adivinada el guion bajo si este es menor a menos 1 se refleja el resultado ganador.
    letra = "";
    document.removeEventListener("keydown", Window, false);
  }
}
function nuevaPalabra() {
  agregarpalabra = document
    .querySelector(".nuevapalabrajuego")
    .value.toUpperCase();

  palabras.push(agregarpalabra);

  document.getElementById("nuevapalabrajuego").value = "";

  mostrarpalabrasingresadas();

  return;
}

function mostrarpalabrasingresadas() {
  palabrasretenidas = "";
  for (let i = 0; i < palabras.length; i++) {
    //itera la palabra y busca por medio de la letra ingresada.
    palabrasretenidas = palabrasretenidas + palabras[i] + " ";
  }

  document.getElementById("palabrasingresadas").innerHTML = palabrasretenidas;
}

function mostrarmenuagregar() {
  document.getElementById("caja").style.display = "none";
  document.getElementById("caja-2").style.display = "none";
  document.getElementById("caja-3").style.display = "initial";
  mostrarpalabrasingresadas();
}

function mostrarmenujuego() {
  document.getElementById("caja").style.display = "none";
  document.getElementById("caja-2").style.display = "initial";
  document.getElementById("caja-3").style.display = "none";
  palabraAdi = "";
  iniciar();
}

function mostrarmenuinicio() {
  document.getElementById("caja").style.display = "initial";
  document.getElementById("caja-2").style.display = "none";
  document.getElementById("caja-3").style.display = "none";
}
