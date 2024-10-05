let simulacionDetenida = false;

document.getElementById('simular-btn').addEventListener('click', simularCadena);
document.getElementById('detener-btn').addEventListener('click', detenerSimulacion);

async function simularCadena() {
    simulacionDetenida = false;
    const cadena = document.getElementById('cadena').value;
    const automata = new AutomataPila();
    const resultadoDiv = document.getElementById('resultado');
    const pilaSVG = document.getElementById('pila');
    pilaSVG.innerHTML = ""; // Limpiar el SVG anterior
    document.getElementById('detener-btn').classList.remove('d-none'); // Mostrar botón de detener

    // Ajustar la altura del SVG
    const alturaPorSimbolo = 50; // Altura de cada símbolo
    const alturaSVG = alturaPorSimbolo * cadena.length + 20; // Ajustar altura según la longitud de la cadena
    pilaSVG.setAttribute("height", alturaSVG); // Ajustar altura del SVG

    if (automata.esAceptada(cadena)) {
        resultadoDiv.innerHTML = `La cadena '${cadena}' es aceptada con (m = ${automata.m}, n = ${automata.n}).`;
        resultadoDiv.style.color = 'green';
    } else {
        resultadoDiv.innerHTML = `La cadena '${cadena}' no es aceptada. Verifique que la cantidad de 'a' sea igual a la de 'd' y que las subcadenas (bc) y (cb) sean correctas.`;
        resultadoDiv.style.color = 'red';
    }

    await simularApilamiento(cadena, automata);
    document.getElementById('detener-btn').classList.add('d-none'); // Ocultar botón de detener
}

async function simularApilamiento(cadena, automata) {
    let delay = 0;
    for (let i = 0; i < cadena.length; i++) {
        if (simulacionDetenida) {
            return;
        }

        const simbolo = cadena[i];
        automata.agregarSimulacion(simbolo);
        mostrarSimbolosEnPila(automata.simulaciones, i, cadena.length);
        await new Promise(resolve => setTimeout(resolve, delay)); // Esperar un tiempo antes de procesar el siguiente símbolo
        delay += 1000; // Tiempo entre cada símbolo
    }
}

function mostrarSimbolosEnPila(simulaciones, currentIndex, totalLength) {
    const pilaSVG = document.getElementById('pila');
    pilaSVG.innerHTML = ""; // Limpiar el SVG

    const alturaPorSimbolo = 50; // Altura de cada símbolo
    simulaciones.forEach((simbolo, index) => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", 10);
        rect.setAttribute("y", pilaSVG.getAttribute("height") - (index + 1) * alturaPorSimbolo); // Ajustar la posición Y
        rect.setAttribute("width", 80);
        rect.setAttribute("height", alturaPorSimbolo - 10);
        rect.setAttribute("fill", index === totalLength - 1 ? "#ff5733" : "#28a745"); // Cambiar color para el último símbolo

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", 50);
        text.setAttribute("y", pilaSVG.getAttribute("height") - (index + 1) * alturaPorSimbolo + (alturaPorSimbolo / 2));
        text.setAttribute("fill", "white");
        text.setAttribute("font-size", "20");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.textContent = simbolo;

        pilaSVG.appendChild(rect);
        pilaSVG.appendChild(text);
    });
}

function detenerSimulacion() {
    const continuar = confirm("¿Deseas detener la simulación?");
    if (continuar) {
        simulacionDetenida = true;
        document.getElementById('detener-btn').classList.add('d-none'); // Ocultar botón de detener
    }
}
