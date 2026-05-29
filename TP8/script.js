
// ARRAYS GLOBALES (Variables de estado)

let materias = [];     
let historial = [];     
let numeros = [];       


// DESAFÍO 1: CALCULADORA ACADÉMICA


// 1. Validación de entrada 
function obtenerDatos() {
    let inputMateria = document.getElementById("materia").value.trim();
    let inputNota = document.getElementById("nota").value;
    let errorDiv = document.getElementById("error-d1");
    
    errorDiv.innerText = "";
    
  
    if (inputMateria === "") {
        errorDiv.innerText = "Error: El nombre de la materia no puede estar vacío.";
        return null; // 
    }
    
    let notaNum = parseFloat(inputNota);
    if (isNaN(notaNum) || notaNum < 0 || notaNum > 10) { 
        errorDiv.innerText = "Error: Ingrese una nota válida entre 0 y 10.";
        return null; // 
    
    return { materia: inputMateria, nota: notaNum }; 
}

// 2. Clasificación por rangos 
function clasificarNota(nota) {
    if (nota >= 9) return "Sobresaliente"; 
    else if (nota >= 7) return "Bueno";
    else if (nota >= 6) return "Regular"; 
    else if (nota >= 4) return "Aprobado mínimo"; 
    else return "Insuficiente"; 
}

// 3. Función del botón "Agregar" 
function agregarMateria() {
    let datos = obtenerDatos(); 
    if (datos === null) return; 
    
    materias.push(datos); 
    
    mostrarLista(); 
    calcularResumen(); 
    
  
    document.getElementById("materia").value = "";
    document.getElementById("nota").value = "";
}

// 4. Mostrar lista en tabla con bucle for 
function mostrarLista() {
    let html = `<table class="table table-striped table-sm">
                    <thead><tr><th>Materia</th><th>Nota</th><th>Condición</th></tr></thead>
                    <tbody>`;
                    
    for (let i = 0; i < materias.length; i++) { 
        let cat = clasificarNota(materias[i].nota); 
        html += `<tr>
                    <td>${materias[i].materia}</td>
                    <td>${materias[i].nota}</td>
                    <td><span class="badge ${materias[i].nota >= 6 ? 'bg-success' : 'bg-danger'}">${cat}</span></td>
                 </tr>`; 
    }
    
    html += `</tbody></table>`;
    document.getElementById("lista").innerHTML = html; 
}

// 5. Cálculos estadísticos con bucle while 
function calcularResumen() {
    if (materias.length === 0) return;

    let suma = 0; 
    let aprobadas = 0; 
    let reprobadas = 0; 
    
    let maxNota = materias[0].nota; 
    let maxMateria = materias[0].materia;
    let minNota = materias[0].nota; 
    let minMateria = materias[0].materia;
    
    let i = 0;
    while (i < materias.length) { 
        let n = materias[i].nota;
        suma += n; 
        
       
        if (n >= 6) aprobadas++;
        else reprobadas++;
        
      
        if (n > maxNota) {
            maxNota = n;
            maxMateria = materias[i].materia;
        }
        if (n < minNota) {
            minNota = n;
            minMateria = materias[i].materia;
        }
        i++;
    }
    
    let promedio = suma / materias.length; 
    
    document.getElementById("resumen").innerHTML = `
        <p class="mb-1"><strong>Promedio general:</strong> ${promedio.toFixed(2)}</p>
        <p class="mb-1"><strong>Aprobadas:</strong> ${aprobadas} | <strong>Reprobadas:</strong> ${reprobadas}</p>
        <p class="mb-1 text-success"><strong>Mejor nota:</strong> ${maxNota} (${maxMateria})</p>
        <p class="mb-0 text-danger"><strong>Peor nota:</strong> ${minNota} (${minMateria})</p>
    `; 
}

}


// DESAFÍO 2: CONVERSOR DE UNIDADES

// 1. Obtener número y validar 
function obtenerNumero() {
    let valInput = document.getElementById("valor").value;
    let errorDiv = document.getElementById("error-d2");
    errorDiv.innerText = "";
    
    if (valInput.trim() === "" || isNaN(parseFloat(valInput))) { 
        errorDiv.innerText = "Error: Ingrese un valor numérico válido.";
        return null;  
    }
    return parseFloat(valInput); 
}

// 2. Función principal con Switch 
function convertir() {
    let num = obtenerNumero(); 
    if (num === null) return; 
    
    let tipo = document.getElementById("tipoConversion").value; 
    let resultado = 0; 
    let msg = "";
    
    // Switch de 7 casos 
    switch (tipo) {
        case "1":
            resultado = num * 0.621371; 
            msg = `${num} Km equivalen a ${resultado.toFixed(2)} Millas`; 
            break;
        case "2":
            resultado = num * 1.60934; 
            msg = `${num} Millas equivalen a ${resultado.toFixed(2)} Km`; 
            break;
        case "3":
            resultado = num * 2.20462; 
            msg = `${num} Kg equivalen a ${resultado.toFixed(2)} Libras`; 
            break;
        case "4":
            resultado = num * 0.453592; 
            msg = `${num} Libras equivalen a ${resultado.toFixed(2)} Kg`; 
            break;
        case "5":
            resultado = (num * 9/5) + 32; 
            msg = `${num}°C equivalen a ${resultado.toFixed(2)}°F`;
            break;
        case "6":
            resultado = (num - 32) * 5/9; 
            msg = `${num}°F equivalen a ${resultado.toFixed(2)}°C`; 
            break;
        case "7":
            resultado = num * 3.28084; 
            msg = `${num} Metros equivalen a ${resultado.toFixed(2)} Pies`; 
            break;
        default:
            msg = "Opción no válida"; 
    }
    
    document.getElementById("resultado").innerText = msg; 
    

}

function actualizarHistorial() {
    let html = "";
    for (let i = 0; i < historial.length; i++) { // [cite: 142]
        html += `<li class="list-group-item">${historial[i]}</li>`; // [cite: 141]
    }
    document.getElementById("historialLista").innerHTML = html;
}


// DESAFÍO 3: REGISTRADOR DE NÚMEROS

// 1. Agregar Número 
function agregarNumero() {
    let inputNum = document.getElementById("numero").value;
    let errorDiv = document.getElementById("error-d3");
    errorDiv.innerText = "";
    
    if (inputNum.trim() === "" || isNaN(Number(inputNum))) { 
        errorDiv.innerText = "Error: Ingrese un número válido."; 
        return;
    }
    
    numeros.push(Number(inputNum)); 
    
    mostrarNumeros(); 
    calcularEstadisticas();
    
    document.getElementById("numero").value = "";
    document.getElementById("numero").focus(); 
}

// 2. Mostrar con Bucle For 
function mostrarNumeros() {
    let listaDiv = document.getElementById("listaNumeros");
    if (numeros.length === 0) {
        listaDiv.innerText = "-";
        return;
    }
    
    let str = "";
    for (let i = 0; i < numeros.length; i++) { 
        str += numeros[i] + (i === numeros.length - 1 ? "" : ", "); 
    }
    
    listaDiv.innerHTML = `<p class="mb-1">${str}</p><small class="text-muted">Total items: ${numeros.length}</small>`; // [cite: 169]
}

// 3. Calcular estadísticas con Bucle While 
function calcularEstadisticas() {
    let estDiv = document.getElementById("estadisticas");
    if (numeros.length === 0) {
        estDiv.innerText = "No hay números ingresados.";
        return;
    }
    
    let suma = 0; 
    let positivos = 0; 
    let negativos = 0; 
    let mayor = numeros[0]; 
    let menor = numeros[0]; 
    
    let i = 0;
    while (i < numeros.length) { 
        let current = numeros[i];
        suma += current; 
     
        if (current > 0) positivos++;
        else if (current < 0) negativos++;
        
        if (current > mayor) mayor = current;
        if (current < menor) menor = current;
        
        i++;
    }
    
    let promedio = suma / numeros.length;
    
    estDiv.innerHTML = `
        <p class="mb-1"><strong>Suma:</strong> ${suma}</p>
        <p class="mb-1"><strong>Promedio:</strong> ${promedio.toFixed(2)}</p>
        <p class="mb-1"><strong>Positivos:</strong> ${positivos} | <strong>Negativos:</strong> ${negativos}</p>
        <p class="mb-1 text-primary"><strong>Mayor:</strong> ${mayor}</p>
        <p class="mb-0 text-secondary"><strong>Menor:</strong> ${menor}</p>
    `; 
}

// 4. Tabla de multiplicar con Bucle For 
function tablaMultiplicar() {
    let tablaDiv = document.getElementById("tabla");
    if (numeros.length === 0) {
        tablaDiv.innerText = "Primero agregue un número.";
        return;
    }
    
    let base = numeros[numeros.length - 1]; 
    let html = `<strong>Tabla del ${base}:</strong>\n`;
    
    for (let i = 1; i <= 10; i++) { 
        html += `${base} x ${i} = ${base * i}\n`; 
    }
    
    tablaDiv.innerText = html; 
}

// 5. Reiniciar Estado 
function reiniciar() {
    numeros = []; 
    document.getElementById("listaNumeros").innerText = "-"; 
    document.getElementById("estadisticas").innerText = "No hay números ingresados."; 
    document.getElementById("tabla").innerText = "Seleccione 'Ver Tabla'"; 
    document.getElementById("numero").value = ""; // 
    document.getElementById("error-d3").innerText = "";
}