document.addEventListener('DOMContentLoaded', function() {
    const fechaInicio = new Date('2020-12-23T19:32:00+01:00'); // Fecha de inicio
    const diasJuntosElement = document.getElementById('dias-juntos');
    const cuentaAtrasElement = document.getElementById('cuenta-atras');
    const btnDias = document.getElementById('btn-dias');
    const btnMeses = document.getElementById('btn-meses');
    const btnAnos = document.getElementById('btn-anos');
    const btnDia = document.getElementById('btn-dia');
    const btnMes = document.getElementById('btn-mes');
    const btnAno = document.getElementById('btn-ano');

    // Variable para almacenar la opción de cuenta atrás seleccionada
    let opcionCuentaAtras = 'dia'; // Valor por defecto

    // Función para calcular días juntos
    function calcularDiasJuntos() {
        const ahora = new Date();
        const diferencia = Math.floor((ahora - fechaInicio) / (1000 * 60 * 60 * 24));
        return diferencia;
    }

    // Función para mostrar días juntos
    function mostrarDias() {
        const dias = calcularDiasJuntos();
        diasJuntosElement.textContent = `${dias} días`;
    }

    // Función para mostrar meses juntos
    function mostrarMeses() {
        const dias = calcularDiasJuntos();
        const meses = Math.floor(dias / 30);
        const diasRestantes = dias % 30;
        diasJuntosElement.textContent = `${meses} meses y ${diasRestantes} días`;
    }

    // Función para mostrar años juntos
    function mostrarAnos() {
        const dias = calcularDiasJuntos();
        const anos = Math.floor(dias / 365);
        const meses = Math.floor((dias % 365) / 30);
        const diasRestantes = (dias % 365) % 30;
        diasJuntosElement.textContent = `${anos} años, ${meses} meses y ${diasRestantes} días`;
    }

    // Función para la cuenta atrás
    function actualizarCuentaAtras() {
        const ahora = new Date();
        let siguienteFecha;

        // Determinar la fecha siguiente según la opción seleccionada
        if (opcionCuentaAtras === 'dia') {
            siguienteFecha = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1, 19, 32, 0);
        } else if (opcionCuentaAtras === 'mes') {
            siguienteFecha = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 1, 19, 32, 0);
        } else if (opcionCuentaAtras === 'ano') {
            siguienteFecha = new Date(ahora.getFullYear() + 1, 0, 1, 19, 32, 0);
        }

        const diferencia = siguienteFecha - ahora;

        // Calcular días, horas, minutos y segundos restantes
        const totalSegundos = Math.floor(diferencia / 1000);
        const horas = Math.floor((totalSegundos % (3600 * 24)) / 3600);
        const minutos = Math.floor((totalSegundos % 3600) / 60);
        const segundos = totalSegundos % 60;

        let resultado = '';
        if (opcionCuentaAtras === 'dia') {
            resultado = `${horas} horas, ${minutos} minutos, ${segundos} segundos`;
        } else if (opcionCuentaAtras === 'mes') {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            resultado = `${dias} días, ${horas} horas, ${minutos} minutos`;
        } else if (opcionCuentaAtras === 'ano') {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const meses = Math.floor(dias / 30);
            const diasRestantes = dias % 30;
            resultado = `${meses} meses, ${diasRestantes} días, ${horas} horas, ${minutos} minutos`;
        }

        cuentaAtrasElement.textContent = resultado.trim();
    }

    // Función para calcular cuenta atrás para el día
    function cuentaAtrasDia() {
        opcionCuentaAtras = 'dia'; // Establecer la opción seleccionada
        cuentaAtrasDiaActualizada();
    }

    // Función para calcular cuenta atrás para el mes
    function cuentaAtrasMes() {
        opcionCuentaAtras = 'mes'; // Establecer la opción seleccionada
        cuentaAtrasDiaActualizada();
    }

    // Función para calcular cuenta atrás para el año
    function cuentaAtrasAno() {
        opcionCuentaAtras = 'ano'; // Establecer la opción seleccionada
        cuentaAtrasDiaActualizada();
    }

    // Función para actualizar la cuenta atrás según la opción seleccionada
    function cuentaAtrasDiaActualizada() {
        const ahora = new Date();
        let siguienteFecha;

        if (opcionCuentaAtras === 'dia') {
            siguienteFecha = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1, 19, 32, 0);
        } else if (opcionCuentaAtras === 'mes') {
            siguienteFecha = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 1, 19, 32, 0);
        } else if (opcionCuentaAtras === 'ano') {
            siguienteFecha = new Date(ahora.getFullYear() + 1, 0, 1, 19, 32, 0);
        }

        const diferencia = siguienteFecha - ahora;

        // Calcular días, horas, minutos y segundos restantes
        const totalSegundos = Math.floor(diferencia / 1000);
        const horas = Math.floor((totalSegundos % (3600 * 24)) / 3600);
        const minutos = Math.floor((totalSegundos % 3600) / 60);
        const segundos = totalSegundos % 60;

        let resultado = '';
        if (opcionCuentaAtras === 'dia') {
            resultado = `${horas} horas, ${minutos} minutos, ${segundos} segundos`;
        } else if (opcionCuentaAtras === 'mes') {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            resultado = `${dias} días, ${horas} horas, ${minutos} minutos`;
        } else if (opcionCuentaAtras === 'ano') {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const meses = Math.floor(dias / 30);
            const diasRestantes = dias % 30;
            resultado = `${meses} meses, ${diasRestantes} días, ${horas} horas, ${minutos} minutos`;
        }

        cuentaAtrasElement.textContent = resultado.trim();
    }

    // Actualizar cada segundo solo para la cuenta atrás
    setInterval(() => {
        actualizarCuentaAtras();
    }, 1000);

    // Inicializar el contador de días
    mostrarDias(); // Mostrar días por defecto

    // Eventos de botones
    btnDias.addEventListener('click', mostrarDias);
    btnMeses.addEventListener('click', mostrarMeses);
    btnAnos.addEventListener('click', mostrarAnos);
    btnDia.addEventListener('click', cuentaAtrasDia);
    btnMes.addEventListener('click', cuentaAtrasMes);
    btnAno.addEventListener('click', cuentaAtrasAno);
});