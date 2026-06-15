
let juegoSeleccionado = "";


function seleccionarJuego(elementoClickeado, nombreJuego) {
  
    let tarjetas = document.querySelectorAll('.tarjeta');
    for (let i = 0; i < tarjetas.length; i++) {
        tarjetas[i].classList.remove('seleccionado');
    }

    
    elementoClickeado.classList.add('seleccionado');

   
    juegoSeleccionado = nombreJuego;
    
   
    document.getElementById('error-juego').innerHTML = "";
}


function registrarJugador() {
  
    let nickname = document.getElementById('nickname').value.trim();
    let edad = document.getElementById('edad').value.trim();
    let codigo = document.getElementById('codigo').value.trim();

   
    let errNick = document.getElementById('error-nickname');
    let errEdad = document.getElementById('error-edad');
    let errCodigo = document.getElementById('error-codigo');
    let errJuego = document.getElementById('error-juego');

   
    errNick.innerHTML = "";
    errEdad.innerHTML = "";
    errCodigo.innerHTML = "";
    errJuego.innerHTML = "";

    let todoValido = true;

  
    let regexAlfanumerico = /^[a-zA-Z0-9]+$/;
    if (nickname.length < 3 || !regexAlfanumerico.test(nickname)) {
        errNick.innerHTML = "El nickname debe tener mínimo 3 caracteres y no contener espacios ni símbolos.";
        todoValido = false;
    }

   
    if (edad === "" || isNaN(edad) || parseInt(edad) <= 16) {
        errEdad.innerHTML = "Debes ingresar una edad válida mayor a 16 años.";
        todoValido = false;
    }

   
    if (codigo.length !== 4 || isNaN(codigo)) {
        errCodigo.innerHTML = "El código debe ser numérico y de exactamente 4 dígitos.";
        todoValido = false;
    }

   
    if (juegoSeleccionado === "") {
        errJuego.innerHTML = "¡Debes seleccionar un juego de la grilla antes de registrarte!";
        todoValido = false;
    }

  
    if (todoValido === true) {
     
        document.querySelector('.card:nth-of-type(1)').classList.add('oculto');
        document.querySelector('.card:nth-of-type(2)').classList.add('oculto');
        document.getElementById('seccion-preparacion').classList.remove('oculto');
    }
}


function iniciarPreparacion() {
   
    let ansHoras = prompt("¿Cuántas horas por semana dedicás a jugar?");
   
    if (ansHoras === null || ansHoras.trim() === "") {
        ansHoras = "No respondió esta pregunta";
    }

  
    let ansModo = prompt("¿Preferís jugar solo o en equipo?");
    if (ansModo === null || ansModo.trim() === "") {
        ansModo = "No respondió esta pregunta";
    }

  
    let ansRol = prompt("¿Qué rol ocupás en tu equipo? (Atacante, Defensa, Soporte, etc.)");
    if (ansRol === null || ansRol.trim() === "") {
        ansRol = "No respondió esta pregunta";
    }

    
    let divResultados = document.getElementById('resultados-preparacion');
    divResultados.style.display = "block"; // Lo hacemos visible
    
   
    divResultados.innerHTML = `
        <h4 class="mb-4 border-bottom pb-2">Resumen de Preparación</h4>
        <p><strong>Juego a competir:</strong> <span class="text-primary">${juegoSeleccionado}</span></p>
        <p><strong>Horas de juego por semana:</strong> ${ansHoras}</p>
        <p><strong>Modalidad preferida:</strong> ${ansModo}</p>
        <p><strong>Rol en el equipo:</strong> ${ansRol}</p>
    `;
}