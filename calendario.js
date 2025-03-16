document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const selectorMeses = document.querySelector('.selector-meses');
    const contenedorCalendario = document.querySelector('.contenedor-calendario');
    
    // Nombres de los meses
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    // Fecha actual (se obtiene solo una vez al cargar la página)
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    
    // Función para obtener días en un mes
    function obtenerDiasEnMes(mes, anio) {
        return new Date(anio, mes + 1, 0).getDate();
    }
    
    // Función para generar la ruta de la imagen según el mes y día
    function obtenerRutaImagen(mes, dia) {
        // Formato: src/img/calendario/mes-dia.jpeg
        return `src/img/calendario/${mes + 1}-${dia}.jpeg`;
    }
    
    // Función para generar el calendario de un mes
    function generarCalendario(mes) {
        // Limpiar el contenedor
        contenedorCalendario.innerHTML = '';
        
        // Año objetivo (2025)
        const anioObjetivo = 2025;
        
        // Obtener número de días en el mes
        const diasEnMes = obtenerDiasEnMes(mes, anioObjetivo);
        
        // Generar días del calendario
        for (let dia = 1; dia <= diasEnMes; dia++) {
            // Crear fecha para comparar
            const fechaDia = new Date(anioObjetivo, mes, dia);
            const estaDesbloqueado = fechaDia <= fechaActual;
            
            // Crear elemento del día
            const elementoDia = document.createElement('div');
            elementoDia.className = estaDesbloqueado ? 'dia-calendario dia-desbloqueado' : 'dia-calendario dia-bloqueado';
            
            if (estaDesbloqueado) {
                // Día desbloqueado con imagen
                const imagen = document.createElement('img');
                imagen.src = obtenerRutaImagen(mes, dia);
                imagen.alt = `Recuerdo del día ${dia} de ${meses[mes]}`;
                
                // Manejar errores de carga de imagen - simplemente dejar el espacio en blanco
                imagen.onerror = function() {
                    // No hacer nada, dejar el espacio en blanco
                    this.style.display = 'none';
                };
                
                elementoDia.appendChild(imagen);
                
                // Número del día
                const numeroDia = document.createElement('div');
                numeroDia.className = 'numero-dia';
                numeroDia.textContent = dia;
                elementoDia.appendChild(numeroDia);
                
                // Añadir evento click para ver la imagen en grande
                elementoDia.addEventListener('click', function() {
                    // Solo abrir la imagen si está cargada correctamente
                    if (imagen.complete && imagen.naturalHeight !== 0) {
                        abrirImagenGrande(obtenerRutaImagen(mes, dia), `${dia} de ${meses[mes]}`);
                    }
                });
            } else {
                // Día bloqueado solo con número
                elementoDia.textContent = dia;
            }
            
            // Añadir al contenedor
            contenedorCalendario.appendChild(elementoDia);
        }
    }
    
    // Función para abrir imagen en grande
    function abrirImagenGrande(rutaImagen, titulo) {
        // Crear elementos para mostrar la imagen en grande
        const overlay = document.createElement('div');
        overlay.className = 'overlay-imagen';
        
        const contenedorImagen = document.createElement('div');
        contenedorImagen.className = 'contenedor-imagen-grande';
        
        const imagen = document.createElement('img');
        imagen.src = rutaImagen;
        imagen.alt = titulo;
        
        // No mostrar imagen si hay error
        imagen.onerror = function() {
            document.body.removeChild(overlay);
        };
        
        const tituloElemento = document.createElement('h3');
        tituloElemento.textContent = titulo;
        
        const botonCerrar = document.createElement('button');
        botonCerrar.className = 'boton-cerrar';
        botonCerrar.textContent = '×';
        botonCerrar.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
        
        // Cerrar también al hacer clic fuera de la imagen
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
        
        // Añadir elementos al DOM
        contenedorImagen.appendChild(botonCerrar);
        contenedorImagen.appendChild(imagen);
        contenedorImagen.appendChild(tituloElemento);
        overlay.appendChild(contenedorImagen);
        document.body.appendChild(overlay);
    }
    
    // Manejar clics en los tabs de meses
    selectorMeses.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-mes')) {
            // Actualizar tab activo
            document.querySelectorAll('.tab-mes').forEach(tab => {
                tab.classList.remove('activo');
            });
            e.target.classList.add('activo');
            
            // Generar calendario del mes seleccionado
            const mesSeleccionado = parseInt(e.target.dataset.mes);
            generarCalendario(mesSeleccionado);
        }
    });
    
    // Inicializar: mostrar mes actual y activar su tab
    const tabMesActual = document.querySelector(`.tab-mes[data-mes="${mesActual}"]`);
    if (tabMesActual) {
        tabMesActual.classList.add('activo');
    }
    
    // Generar el calendario inicial
    generarCalendario(mesActual);
});