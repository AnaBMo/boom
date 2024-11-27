/* *********************************************************************************
------------------------------       BOMBA GAME      ------------------------------
********************************************************************************** */

const numUsuarioInput = document.getElementById('userInput');
const cuentaAtras = document.getElementById('countdown');
const resultadoComparacion = document.getElementById('result');
const botonReinicio = document.getElementById('restart');


/* ********************************************
        Número aleatorio
******************************************** */
const numAleatorio = Math.floor(Math.random() * 3) + 1;

/* ********************************************
        Inicio cuenta atrás
******************************************** */
function inicioCuentaAtras() {
    return new Promise((resolve) => {
        let segundos = 5;
        
        function contandoAtras() {
            if (segundos > 0) {
                cuentaAtras.textContent = `Cuenta atrás: ${segundos} segundos`; 
                segundos--;
                setTimeout(contandoAtras, 1000); // aparece cada segundo en el contador
            } else {
                resolve(); // cuando segundos no sea mayor que cero, se resuelve la promesa
            }
        }
        contandoAtras();  // comienza la cuenta atrás   
        obtenerNumeroIntroducido();  // se llama a esta función para poder introducir número durante la cuenta atrás
    }, 5000);
}

/* ********************************************
        Número introducido
******************************************** */
function obtenerNumeroIntroducido() {
    return new Promise((resolve, reject) => {
        const listener = (e) => {
            if (e.key === 'Enter') {
                const numIntroducido = parseInt(numUsuarioInput.value);
                if (isNaN(numIntroducido) || numIntroducido < 1 || numIntroducido > 3) {
                    reject("Por favor, escribe un número válido entre 1 y 3.");
                } else {
                    resolve(numIntroducido);
                }
            }
        };
        numUsuarioInput.addEventListener('keydown', listener);
    });
}


/* ********************************************
    Comparación de números y mostrar resultado
******************************************** */
function compararNumeros(numIntroducido) {
    if (numIntroducido === undefined) {
        resultadoComparacion.innerHTML = "No introdujiste un número. <br> La bomba ha estallado.";
        resultadoComparacion.style.color = "yellow"; 
    } else if (numIntroducido === numAleatorio) {
        resultadoComparacion.innerHTML = `¡Has salvado el mundo!<br>Tu número ${numIntroducido} coincide con el número ${numAleatorio}.`;
        resultadoComparacion.style.color = "green"; 
    } else {
        resultadoComparacion.innerHTML = `La bomba ha estallado.<br>Tu número ${numIntroducido} no es el de desactivación ${numAleatorio}.`;
        resultadoComparacion.style.color = "red"; 
    }
}

/* ********************************************
        Reiniciar
******************************************** */
function reiniciarJuego() {
    botonReinicio.addEventListener("click", () => {
        location.reload(); 
    });
}

/* ********************************************
        Secuencia
******************************************** */
function iniciarJuego() {
    resultadoComparacion.textContent = "Aquí aparecerá el resultado"; // mensaje inicial antes de resolución

    // Para arrancar dos tareas al mismo tiempo, hay que poner promesa de array
    /* Si el jugador introduce un número antes de que termine la cuenta atrás, se resuelve con ese número.
    Si la cuenta atrás llega a 0 antes de introducir un número, la promesa se resuelve sin esperar al jugador. */
    Promise.race([inicioCuentaAtras(), obtenerNumeroIntroducido()])
        .then((numIntroducido) => {
            compararNumeros(numIntroducido);
        })
        .catch((error) => {
            alert(error);
        });
}

iniciarJuego();
reiniciarJuego();
