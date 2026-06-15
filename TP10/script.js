let actual = 1;
const totalPreguntas = 10;

function validar(numero) {
    let valor = document.getElementById("in" + numero).value.trim();
    let errorDiv = document.getElementById("err" + numero);
    let inputEl = document.getElementById("in" + numero);
    

    inputEl.classList.remove("borde-gris", "borde-rojo", "borde-verde");
    errorDiv.innerHTML = "";

    if (valor === "") {
        inputEl.classList.add("borde-gris");
        errorDiv.innerHTML = "El campo no puede estar vacío.";
        return false;
    }

    let valido = true;
    let msj = "";

    let regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;

    switch(numero) {
        case 1:
        case 4:
        case 5:
            if (!regexLetras.test(valor)) { valido = false; msj = "Solo letras, mínimo 3 caracteres."; }
            break;
        case 2:
        case 3:
            if (valor === "") { valido = false; msj = "Seleccione una opción."; }
            break;
        case 6:
            if (isNaN(valor) || valor.length !== 6) { valido = false; msj = "Deben ser exactamente 6 números."; }
            break;
        case 7:
            if (isNaN(valor) || parseInt(valor) < 1 || parseInt(valor) > 999) { valido = false; msj = "Número entre 1 y 999."; }
            break;
        case 8:
            if (isNaN(valor) || parseInt(valor) < 0) { valido = false; msj = "Mínimo 0 batallas."; }
            break;
        case 9:
            let fechaNac = new Date(valor);
            let hoy = new Date();
            let edad = hoy.getFullYear() - fechaNac.getFullYear();
            let mes = hoy.getMonth() - fechaNac.getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) { edad--; }
            if (edad < 18) { valido = false; msj = "Debe ser mayor de 18 años."; }
            break;
        case 10:
            let fechaInicio = new Date(valor);
            if (fechaInicio > new Date()) { valido = false; msj = "La fecha no puede ser futura."; }
            break;
    }

    if (!valido) {
        inputEl.classList.add("borde-rojo");
        errorDiv.innerHTML = msj;
        return false;
    } else {
        inputEl.classList.add("borde-verde");
        return true;
    }
}

function siguiente() {
    if (validar(actual)) {
        document.getElementById("in" + actual).disabled = true; // Bloquea el actual
        
        if (actual < totalPreguntas) {
            actual++;
            document.getElementById("q" + actual).classList.remove("hidden");
            document.getElementById("btnRetroceder").disabled = false;
        } else {
            // Finalizó
            document.getElementById("controles").classList.add("hidden");
            
            let nombre = document.getElementById("in1").value;
            let raza = document.getElementById("in2").value;
            let clase = document.getElementById("in3").value;
            
            let exitoDiv = document.getElementById("mensaje-exito");
            exitoDiv.innerHTML = `¡Registro exitoso, ${nombre}! Tu leyenda comienza hoy. ¡Que la Gran Alianza guíe tus pasos, ${clase} de los ${raza}!`;
            exitoDiv.classList.remove("hidden");
        }
    }
}

function retroceder() {
    if (actual > 1) {
        document.getElementById("q" + actual).classList.add("hidden");
        actual--;
        let inputAnt = document.getElementById("in" + actual);
        inputAnt.disabled = false;
        inputAnt.classList.remove("borde-verde"); // Le quita el verde para que se vea normal a editar
        if (actual === 1) document.getElementById("btnRetroceder").disabled = true;
    }
}

function reiniciar() {
    for (let i = 1; i <= totalPreguntas; i++) {
        let inputEl = document.getElementById("in" + i);
        inputEl.value = "";
        inputEl.disabled = false;
        inputEl.classList.remove("borde-gris", "borde-rojo", "borde-verde");
        document.getElementById("err" + i).innerHTML = "";
        
        if (i > 1) {
            document.getElementById("q" + i).classList.add("hidden");
        }
    }
    document.getElementById("controles").classList.remove("hidden");
    document.getElementById("mensaje-exito").classList.add("hidden");
    actual = 1;
    document.getElementById("btnRetroceder").disabled = true;
}