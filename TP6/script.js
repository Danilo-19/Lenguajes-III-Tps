$(document).ready(function() {

    let tabla = $('#tablaTareas').DataTable();

    $('#btn-agregar').click(function() {

        let nombre  = $('#nombreTarea').val();
        let prioridad = $('#prioridad').val();
        
        if (nombre.trim() === ""){
            alert("El nombre de la tarea no puede estar vacío");
            return;
        }

        let nuevaFila = tabla.row.add([
            nombre,
            prioridad,
            '<button class="btnEliminar">Eliminar</button>'
        ]).draw().node();

        $(nuevaFila).hide().fadeIn(1000);
    })

$('h1').hover(
    function() { $(this).css('color', 'blue'); }, 
    function() { $(this).css('color', 'black'); } 
);

$('#tablaTareas').on('click', '.btnEliminar', function() {
    let fila = $(this).closest('tr');
    
    fila.fadeOut(1000, function() { 
        tabla.row(fila).remove().draw(); 
    });

});

});