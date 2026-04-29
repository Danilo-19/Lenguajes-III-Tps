// Obtener referencias a elementos del DOM
const form = document.getElementById('formulario');
const formResult = document.getElementById('formResult');
const passwordInput = document.getElementById('password');
const passwordDisplay = document.getElementById('passwordDisplay');
const passwordDisplayContainer = document.querySelector('.password-display');

// Lista de campos del formulario para validación
const fields = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'apellido', label: 'Apellido' },
    { id: 'email', label: 'Email' },
    { id: 'telefono', label: 'Teléfono'},
    { id: 'fechaNacimiento', label: 'Fecha de Nacimiento' },
    { id: 'password', label: 'Contraseña' },
    { id: 'confirmPassword', label: 'Confirmar Contraseña' }
];

// Expresión regular para validar que solo haya letras (incluyendo acentos y ñ)
const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
// Expresión regular para validar email institucional UCASAL
const regexEmail = /^[^\s@]+@ucasal\.(edu\.)?ar$/;
// Expresión regular para validar teléfono
const regexTeléfono = /^[0-9]+$/;

/**
 * Función para mostrar errores en un campo
 * @param {HTMLElement} input - El elemento input
 * @param {string} message - Mensaje de error
 */
function setError(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    const feedback = input.nextElementSibling;
    if (feedback) {
        feedback.textContent = message;
    }
}

/**
 * Función para limpiar errores y marcar como válido
 * @param {HTMLElement} input - El elemento input
 */
function clearError(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const feedback = input.nextElementSibling;
    if (feedback) {
        feedback.textContent = '';
    }
}

/**
 * Función para validar un campo específico
 * @param {string} id - ID del campo a validar
 * @returns {boolean} true si es válido, false si tiene error
 */
function validateField(id) {
    const input = document.getElementById(id);
    const value = input.value.trim();
    let valid = true;
    let message = '';

    // Validar que el campo no esté vacío
    if (value === '') {
        valid = false;
        message = 'Este campo es obligatorio.';
    } else {
        // Validaciones específicas según el tipo de campo
        switch (id) {
            case 'nombre':
            case 'apellido':
                // Solo letras y más de 3 caracteres
                if (value.length < 3) {
                    valid = false;
                    message = 'Debe tener más de 3 caracteres.';
                } else if (!regexTexto.test(value)) {
                    valid = false;
                    message = 'Solo se permiten letras.';
                }
                break;

            case 'email':
                // Email con formato válido e institucional UCASAL
                if (!regexEmail.test(value)) {
                    valid = false;
                    message = 'Solo se aceptan emails institucionales de UCASAL (usuario@ucasal.edu.ar).';
                }
                break;

            case 'telefono':
                // Solo números
                if (!regexTeléfono.test(value)) {
                    valid = false
                    message = 'Ingrese solo números'
                }
                break;

            case 'fechaNacimiento': {
                // Calcular la edad del usuario
                const fechaNacimiento = new Date(value);
                const hoy = new Date();
                let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
                const mesActual = hoy.getMonth();
                const mesNacimiento = fechaNacimiento.getMonth();
                
                // Ajustar la edad si aún no ha cumplido años este año
                if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < fechaNacimiento.getDate())) {
                    edad--;
                }

                // Validar que tenga entre 18 y 40 años
                if (edad < 18) {
                    valid = false;
                    message = 'Debe ser mayor de 18 años.';
                } else if (edad > 40) {
                    valid = false;
                    message = 'Debe ser menor de 40 años.';
                }
                break;
            }

            case 'password':
                // La contraseña no puede estar vacía
                if (value.length === 0) {
                    valid = false;
                    message = 'La contraseña es obligatoria.';
                }
                break;

            case 'confirmPassword': {
                // Las contraseñas deben coincidir
                const password = document.getElementById('password').value;
                if (value !== password) {
                    valid = false;
                    message = 'Las contraseñas no coinciden.';
                }
                break;
            }
        }
    }

    // Mostrar el error o limpiar si es válido
    if (!valid) {
        setError(input, message);
    } else {
        clearError(input);
    }

    return valid;
}

/**
 * Función para cifrar la contraseña (mostrar asteriscos)
 * @param {string} password - La contraseña a cifrar
 * @returns {string} La contraseña cifrada como asteriscos
 */
function encryptPassword(password) {
    return '*'.repeat(password.length);
}

/**
 * Validar todos los campos del formulario
 * @returns {boolean} true si todos son válidos
 */
function validateForm() {
    let allValid = true;
    
    for (let field of fields) {
        if (!validateField(field.id)) {
            allValid = false;
        }
    }

    return allValid;
}

/**
 * Limpiar el formulario y los mensajes de error
 */
function clearForm() {
    form.reset();
    formResult.classList.add('d-none');
    formResult.textContent = '';
    
    // Limpiar estilos de validación de todos los campos
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        input.classList.remove('is-invalid', 'is-valid');
        const feedback = input.nextElementSibling;
        if (feedback) {
            feedback.textContent = '';
        }
    });
    
    // Limpiar display de contraseña
    passwordDisplay.textContent = '';
    passwordDisplayContainer.classList.add('d-none');
}

/**
 * Mostrar mensaje de éxito
 */
function showSuccess() {
    formResult.classList.remove('d-none', 'alert-danger');
    formResult.classList.add('alert-success');
    formResult.textContent = '✓ Formulario enviado exitosamente. Los datos se procesaron correctamente.';
}

/**
 * Mostrar mensaje de error general
 */
function showError(message) {
    formResult.classList.remove('d-none', 'alert-success');
    formResult.classList.add('alert-danger');
    formResult.textContent = '✗ ' + message;
}

// Evento para cifrar la contraseña mientras se escribe
passwordInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        passwordDisplay.textContent = encryptPassword(this.value);
        passwordDisplayContainer.classList.remove('d-none');
    } else {
        passwordDisplayContainer.classList.add('d-none');
        passwordDisplay.textContent = '';
    }
});

// Evitar que se envíe el formulario normalmente y realizar validación
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Limpiar mensaje anterior
    formResult.classList.add('d-none');

    // Validar todos los campos
    if (validateForm()) {
        // Si todo es válido, mostrar éxito
        showSuccess();
        
        // Mostrar los datos en consola (para propósitos de debugging)
        console.log('Datos del formulario:');
        console.log('Nombre:', document.getElementById('nombre').value);
        console.log('Apellido:', document.getElementById('apellido').value);
        console.log('Email:', document.getElementById('email').value);
        console.log('Fecha de Nacimiento:', document.getElementById('fechaNacimiento').value);
        console.log('Contraseña: [cifrada]');

        // Limpiar el formulario después de 2 segundos
        setTimeout(clearForm, 2000);
    } else {
        // Si hay errores, mostrar mensaje
        showError('Por favor, corrija los errores en el formulario.');
    }
});

// Validación en tiempo real cuando el usuario sale de un campo (blur)
fields.forEach(field => {
    const input = document.getElementById(field.id);
    input.addEventListener('blur', function() {
        validateField(field.id);
    });
});

// Validación en tiempo real para email (más sensible)
document.getElementById('email').addEventListener('input', function() {
    if (this.value.length > 0) {
        validateField('email');
    }
});

// Validación en tiempo real para confirmar contraseña
document.getElementById('confirmPassword').addEventListener('input', function() {
    if (this.value.length > 0) {
        validateField('confirmPassword');
    }
});
