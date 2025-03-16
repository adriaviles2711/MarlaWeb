document.addEventListener('DOMContentLoaded', function() {
    // Fecha de inicio: 23 de diciembre de 2020 a las 19:32 hora española (CET/CEST)
    const fechaInicio = new Date('2020-12-23T19:32:00+01:00'); // Zona horaria de España (CET/CEST)
    const diasJuntosElement = document.getElementById('dias-juntos');
    const cuentaAtrasElement = document.getElementById('cuenta-atras');
    const btnDias = document.getElementById('btn-dias');
    const btnMeses = document.getElementById('btn-meses');
    const btnAnos = document.getElementById('btn-anos');
    const btnDia = document.getElementById('btn-dia');
    const btnMes = document.getElementById('btn-mes');
    const btnAno = document.getElementById('btn-ano');

    let opcionCuentaAtras = 'dia'; // Valor por defecto

    // Función para calcular días juntos
    function calcularDiasJuntos() {
        const ahora = new Date();
        const diferencia = ahora - fechaInicio; // Diferencia en milisegundos
        const dias = diferencia / (1000 * 60 * 60 * 24); // Convertir a días
        return Math.ceil(dias); // Usar Math.ceil para asegurar que se cuente el día actual
    }

    // Función para calcular meses juntos (contando solo meses y días)
    function calcularMesesJuntos() {
        const ahora = new Date();
        let totalMeses = (ahora.getFullYear() - fechaInicio.getFullYear()) * 12;
        totalMeses += ahora.getMonth() - fechaInicio.getMonth();
        
        // Si el día actual es menor que el día de inicio del mes, no sumamos el mes
        let diasRestantes = ahora.getDate() - fechaInicio.getDate();
        if (diasRestantes < 0) {
            totalMeses--;
            const prevMonth = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
            diasRestantes += prevMonth.getDate(); // Añadir los días restantes del mes anterior
        }

        return {
            meses: totalMeses,
            dias: diasRestantes
        };
    }

    // Función para calcular años, meses y días juntos
    function calcularAnosJuntos() {
        const ahora = new Date();
        let anos = ahora.getFullYear() - fechaInicio.getFullYear();
        if (ahora.getMonth() < fechaInicio.getMonth() || (ahora.getMonth() === fechaInicio.getMonth() && ahora.getDate() < fechaInicio.getDate())) {
            anos--;
        }
        let meses = ahora.getMonth() - fechaInicio.getMonth();
        if (meses < 0) {
            meses += 12;
        }
        let dias = ahora.getDate() - fechaInicio.getDate();
        if (dias < 0) {
            const prevMonth = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
            dias += prevMonth.getDate();
        }
        return { anos, meses, dias };
    }

    // Función para mostrar días juntos
    function mostrarDias() {
        const dias = calcularDiasJuntos();
        diasJuntosElement.textContent = `${dias} días`;
    }

    // Función para mostrar meses juntos con días
    function mostrarMeses() {
        const { meses, dias } = calcularMesesJuntos();
        diasJuntosElement.textContent = `${meses} meses, ${dias} días`;
    }

    // Función para mostrar años juntos
    function mostrarAnos() {
        const { anos, meses, dias } = calcularAnosJuntos();
        diasJuntosElement.textContent = `${anos} años, ${meses} meses y ${dias} días`;
    }

    // Función para la cuenta atrás
    function actualizarCuentaAtras() {
        const ahora = new Date();
        let siguienteFecha;

        // Ajuste para cuenta atrás al 23 de cada mes
        if (opcionCuentaAtras === 'dia') {
            siguienteFecha = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1, 19, 32, 0);
        } else if (opcionCuentaAtras === 'mes') {
            let siguienteMes = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 23, 19, 32, 0);
            if (ahora.getDate() > 23) {
                siguienteMes = new Date(ahora.getFullYear(), ahora.getMonth() + 2, 23, 19, 32, 0);
            }
            siguienteFecha = siguienteMes;
        } else if (opcionCuentaAtras === 'ano') {
            let siguienteAno = new Date(ahora.getFullYear(), 11, 23, 19, 32, 0);
            if (ahora > siguienteAno) {
                siguienteAno = new Date(ahora.getFullYear() + 1, 11, 23, 19, 32, 0);
            }
            siguienteFecha = siguienteAno;
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

    // Eventos de botones para el contador de días, meses y años
    btnDias.addEventListener('click', mostrarDias);
    btnMeses.addEventListener('click', mostrarMeses);
    btnAnos.addEventListener('click', mostrarAnos);

    // Eventos de botones para cambiar la cuenta atrás
    btnDia.addEventListener('click', function() {
        opcionCuentaAtras = 'dia';
        actualizarCuentaAtras();
    });
    btnMes.addEventListener('click', function() {
        opcionCuentaAtras = 'mes';
        actualizarCuentaAtras();
    });
    btnAno.addEventListener('click', function() {
        opcionCuentaAtras = 'ano';
        actualizarCuentaAtras();
    });
});
