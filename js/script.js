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
            if (segundos >= 0) {
                cuentaAtras.textContent = `Cuenta atrás: ${segundos} segundos`; 
                segundos--;
                setTimeout(contandoAtras, 1000); // aparece cada segundo en el contador
            } else {
                resolve(); // cuando segundos no sea mayor que cero, se resuelve la promesa
            }
        }
        contandoAtras();       
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
        numUsuarioInput.addEventListener('keypress', listener);
    });
}

/* ********************************************
    Comparación de números y mostrar resultado
******************************************** */
function compararNumeros(numIntroducido) {
    if (numIntroducido === undefined) {
        resultadoComparacion.textContent = "No introdujiste un número. La bomba ha estallado.";
    } else if (numIntroducido === numAleatorio) {
        resultadoComparacion.textContent = `¡Has salvado el mundo! Tu número ${numIntroducido} coincide con el número ${numAleatorio}.`;
    } else {
        resultadoComparacion.textContent = `La bomba ha estallado. Tu número ${numIntroducido} no es el de desactivación (${numAleatorio}).`;
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
    resultadoComparacion.textContent = "Aquí aparecerá el resultado";

    inicioCuentaAtras()
        .then(() => {
            return obtenerNumeroIntroducido();
        })
        .then((numIntroducido) => {
            compararNumeros(numIntroducido);
        })
        .catch((error) => {
            alert(error); 
        });
}

iniciarJuego();
reiniciarJuego();
