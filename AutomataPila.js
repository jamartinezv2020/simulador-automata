// AutomataPila.js
class AutomataPila {
    constructor() {
        this.m = 0;  // Contador de pares (b, c)
        this.n = 0;  // Contador de pares (a, d)
        this.simulaciones = []; // Guardar simulaciones para el proceso de apilamiento
    }

    contarSubcadenas(subcadena) {
        const mid = Math.floor(subcadena.length / 2);
        const primeraMitad = subcadena.slice(0, mid);
        const segundaMitad = subcadena.slice(mid);

        const countBPrimera = primeraMitad.split('b').length - 1;
        const countCPrimera = primeraMitad.split('c').length - 1;
        const countCSegunda = segundaMitad.split('c').length - 1;
        const countBSegunda = segundaMitad.split('b').length - 1;

        if (countBPrimera === countCPrimera && countCPrimera === countCSegunda && countBSegunda === countBPrimera) {
            this.m = countBPrimera;
        } else {
            this.m = 0;
        }
    }

    esAceptada(cadena) {
        const matchA = cadena.match(/^a+/);
        const matchD = cadena.match(/d+$/);

        if (!matchA || !matchD) {
            return false;
        }

        this.n = matchA[0].length;
        const countD = matchD[0].length;

        if (this.n !== countD) {
            return false;
        }

        const parteMedia = cadena.slice(this.n, -this.n);

        if (parteMedia.length % 2 !== 0) {
            return false;
        }

        this.contarSubcadenas(parteMedia);

        return this.m > 0;
    }

    agregarSimulacion(simbolo) {
        this.simulaciones.push(simbolo);
    }
}
