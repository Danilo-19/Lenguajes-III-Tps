$(document).ready(function() {
    
    // Escuchar el click del botón Buscar
    $('#btnBuscar').on('click', function() {
        
        let valor = $('#busqueda').val().trim();
        let $resultado = $('#resultado');
        
        // Validación 4.a: Campo vacío
        if (valor === "") {
            $resultado.html(`
                <div class="col-12 msg-box">
                    <span class="msg-icon">⚠️</span>
                    <p class="msg-texto">Por favor, ingresá un nombre o un ID</p>
                </div>
            `);
            return;
        }
        
        let urlAPI = "";
        
        // Determinar tipo de búsqueda (Número o Texto)
        if (!isNaN(valor)) {
            urlAPI = `https://rickandmortyapi.com/api/character/${valor}`;
        } else {
            urlAPI = `https://rickandmortyapi.com/api/character/?name=${valor}`;
        }
        
        // Petición asincrónica AJAX
        $.ajax({
            url: urlAPI,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                let personaje;
                
                // Si es por nombre viene dentro de un array 'results', tomamos el primero
                if (data.results) {
                    personaje = data.results[0];
                } else {
                    personaje = data;
                }
                
                // Normalizar estado para las clases CSS
                let estadoClase = personaje.status.toLowerCase();
                
                // Inyectar dinámicamente la Card estructurada con Bootstrap
                $resultado.html(`
                    <div class="col-auto">
                        <div class="personaje-card ${estadoClase}">
                            <img src="${personaje.image}" alt="${personaje.name}" class="card-img-personaje">
                            <div class="card-body-rm">
                                <h3 class="card-nombre">${personaje.name}</h3>
                                
                                <div class="mb-3">
                                    <span class="badge-estado badge-${estadoClase}">
                                        ${personaje.status}
                                    </span>
                                </div>
                                
                                <div class="info-row">
                                    <div class="info-label">Especie</div>
                                    <div class="info-value">${personaje.species}</div>
                                </div>
                                
                                <div class="info-row">
                                    <div class="info-label">Última ubicación conocida</div>
                                    <div class="info-value">${personaje.location.name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            },
            error: function() {
                // Validación 4.b: Si no encuentra coincidencias o da error
                $resultado.html(`
                    <div class="col-12 msg-box">
                        <span class="msg-icon">🛸</span>
                        <p class="msg-texto">Personaje no encontrado</p>
                    </div>
                `);
            }
        });
    });
});