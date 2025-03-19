/***********************************************************************
 *  Funciones para generar numeros pseudoaleatorios
 **********************************************************************/

function generarCongruencialesLineales() {
    let numeros=[];
    let tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpiar la tabla antes de generar una nueva
    
    let a = parseInt(document.getElementById("numeroA").value);
    let c = parseInt(document.getElementById("numeroC").value);
    let m = parseInt(document.getElementById("numeroM").value);
    let x0 = parseInt(document.getElementById("numeroX0").value);

    let cantidadDeFilas = parseInt(document.getElementById("cantidadDeFilas").value);
    
    for (let i = 1; i <= cantidadDeFilas; i++) {
        let fila = document.createElement("tr");

        let a_x0 = (a * x0).toString();
        let a_x0_c = (a * x0 + c).toString();
        let x0_1 = (a_x0_c % m).toString();
        let un = x0_1+"/"+m;
        
        
        let datos = [i, x0, a_x0, a_x0_c, x0_1, un];
        datos.forEach(dato => {
            let celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        tabla.appendChild(fila);
        //console.log(datos);
        
        numeros.push(x0_1/m);
        x0 = x0_1;
    }
    
    imprimirTablaEst(numeros);

}

function generarProductosMedios() {
    let numeros = [];
    let tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpiar la tabla antes de generar una nueva
    
    let x1 = parseInt(document.getElementById("numeroInicial1").value);
    let x2 = parseInt(document.getElementById("numeroInicial2").value);

    let cantidadDeFilas = parseInt(document.getElementById("cantidadDeFilas").value);

    /*
    if(document.getElementById("numeroInicial").value.length > 4){
        alert("Es necesario colocar un número menor o igual a 4 digitos!")
        return;
    }*/
    
    for (let i = 1; i <= cantidadDeFilas; i++) {
        let fila = document.createElement("tr");
        let x3 = (x1 * x2).toString();
        let x3Completo = x3.padStart(8, '0'); // Asegurar que tenga 8 dígitos
        let x3nMasUno = x3Completo.substr(2, 4); // Extraer 4 dígitos desde la posición 3
        let ri = parseFloat("0." + x3nMasUno); // Convertir a decimal
        
        let datos = [i, x1, x2, x3Completo,x3nMasUno, ri];
        datos.forEach(dato => {
            let celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        numeros.push(ri);
        tabla.appendChild(fila);
        x1 = parseInt(x2); // Asignar el nuevo valor de X
        x2 = parseInt(x3nMasUno);
    }

    imprimirTablaEst(numeros);


}

function generarCuadradosMedios() {
    let numeros = [];
    let tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpiar la tabla antes de generar una nueva
    
    let x = parseInt(document.getElementById("numeroInicial").value);
    let cantidadDeFilas = parseInt(document.getElementById("cantidadDeFilas").value);

    if(document.getElementById("numeroInicial").value.length > 4){
        alert("Es necesario colocar un número menor o igual a 4 digitos!")
        return;
    }
    
    for (let i = 1; i <= cantidadDeFilas; i++) {
        let fila = document.createElement("tr");
        let xCuadrado = (x * x).toString();
        xCuadrado = xCuadrado.padStart(8,"0");
        let xLength = xCuadrado.length;
        let xnMasUno = xCuadrado.substr(2, 4); // Extraer 4 dígitos desde la posición 3
        let ri = parseFloat("0." + xnMasUno); // Convertir a decimal
        
        let datos = [i, x, xCuadrado, xLength, xnMasUno, ri];
        datos.forEach(dato => {
            let celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        numeros.push(ri);
        tabla.appendChild(fila);
        x = parseInt(xnMasUno); // Asignar el nuevo valor de X
    }

    imprimirTablaEst(numeros);

}

function generarMultiplicadorConstante() {
    let numeros = [];
    let tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpiar la tabla antes de generar una nueva
    
    let x1 = parseInt(document.getElementById("numeroInicial1").value);
    let x2 = parseInt(document.getElementById("numeroInicial2").value);

    let cantidadDeFilas = parseInt(document.getElementById("cantidadDeFilas").value);

    /*
    if(document.getElementById("numeroInicial1").value.length < 3 || document.getElementById("numeroInicial2").value.length){
        alert("Es necesario colocar un número mayor o igual a 3 digitos!")
        return;
    }*/
    
    for (let i = 1; i <= cantidadDeFilas; i++) {
        let fila = document.createElement("tr");
        let x3 = (x1 * x2).toString();
        let x3Completo = x3.padStart(8, '0'); // Asegurar que tenga 8 dígitos
        let x3nMasUno = x3Completo.substr(2, 4); // Extraer 4 dígitos desde la posición 3
        let ri = parseFloat("0." + x3nMasUno); // Convertir a decimal
        
        let datos = [i, x1, x2, x3Completo,x3nMasUno, ri];
        datos.forEach(dato => {
            let celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        
        tabla.appendChild(fila);
        numeros.push(ri);
        x2 = parseInt(x3nMasUno);
    }

    imprimirTablaEst(numeros);


}

function generarCongruencialMult() {

    let numeros = [];
    let tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpiar la tabla antes de generar una nueva

    let k = parseInt(document.getElementById("numeroK").value);
    let g = parseInt(document.getElementById("numeroG").value);
    let x0 = parseInt(document.getElementById("numeroX0").value);

    let a = 5 + (8 * k);
    let m = Math.pow(2, g); // m = 2^g

    let cantidadDeFilas = parseInt(document.getElementById("cantidadDeFilas").value);

    for (let i = 1; i <= cantidadDeFilas; i++) {
        let fila = document.createElement("tr");

        let a_x0 = a * x0;
        let x0_1 = a_x0 % m;
        let un = x0_1 +"/"+m; 

        let datos = [i, x0, a_x0, x0_1, un];
        datos.forEach(dato => {
            let celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        tabla.appendChild(fila);
        numeros.push(x0_1/m);
        x0 = x0_1; // Actualizar el valor de Xn para la siguiente iteración
    }
    
    imprimirTablaEst(numeros);
    

}

function generarFibonacci() {
    let numeros = [];
    let tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = "";

    let x1 = parseInt(document.getElementById("x1").value);
    let x2 = parseInt(document.getElementById("x2").value);
    let m = parseInt(document.getElementById("m").value);
    let cantidadDeFilas = parseInt(document.getElementById("cantidadDeFilas").value);

    for (let i = 1; i <= cantidadDeFilas; i++) {
        let fila = document.createElement("tr");
        let x3 = (x1 + x2) % m;
        let un = x3 / m;
        let datos = [i, x3, un];
        datos.forEach(dato => {
            let celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });
        numeros.push(un);
        tabla.appendChild(fila);
        x1 = x2;
        x2 = x3;
    }
    
    imprimirTablaEst(numeros);
    

}