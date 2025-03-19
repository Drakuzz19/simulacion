function cambiarMetodo() {
    const metodo = document.getElementById("metodo").value;
    const inputs = document.getElementById("inputs");
    const header = document.getElementById("tabla-header");

    if (metodo === "congruencial") {
        inputs.innerHTML = `
            <div class="inputContainer">
                <label>A</label>
                <input type="number" id="numeroA" value="5">
            </div>
            <div class="inputContainer">
                <label>C</label>
                <input type="number" id="numeroC" value="7">
            </div>
            <div class="inputContainer">
                <label>M</label>
                <input type="number" id="numeroM" value="8">
            </div>
            <div class="inputContainer">
                <label>X0</label>
                <input type="number" id="numeroX0" value="2">
            </div>
            <div class="inputContainer">
                <label>Cantidad de filas</label>
                <input type="number" id="cantidadDeFilas" value="5">
            </div>
        `;
        header.innerHTML = `<th>n</th><th>x0</th><th>a*X0</th><th>a*X0+c</th><th>Xn+1</th><th>un</th>`;
    
    } else if (metodo === "productos") {
        inputs.innerHTML = `
            <div class="inputContainer">
                <label>Número Semilla 1</label>
                <input type="number" id="numeroInicial1" value="5735">
            </div>
            <div class="inputContainer">
                <label>Número Semilla 2</label>
                <input type="number" id="numeroInicial2" value="5735">
            </div>
            <div class="inputContainer">
                <label>Cantidad de filas</label>
                <input type="number" id="cantidadDeFilas" value="5">
            </div>
        `;
        header.innerHTML = `<th>n</th><th>X0</th><th>X1</th><th>X0*X1</th><th>Xn+1</th><th>ri</th>`;
    
    } else if (metodo === "cuadrados") {
        inputs.innerHTML = `
            <div class="inputContainer">
                <label>Número Semilla</label>
                <input type="number" id="numeroInicial" value="5735">
            </div>
            <div class="inputContainer">
                <label>Cantidad de filas</label>
                <input type="number" id="cantidadDeFilas" value="5">
            </div>
        `;
        header.innerHTML = `<th>n</th><th>X</th><th>X²</th><th>Ceros a la izquierda</th><th>Xn+1</th><th>ri</th>`;
    
    } else if (metodo === "multiplicador") {
        inputs.innerHTML = `
            <div class="inputContainer">
                <label for="numeroInicial1">Número Semilla 1</label>
                <input type="number" id="numeroInicial1" value="6965">
            </div>
            <div class="inputContainer">
                <label for="numeroInicial2">Número Semilla 2</label>
                <input type="number" id="numeroInicial2" value="9803">
            </div>
            <div class="inputContainer">
                <label>Cantidad de filas</label>
                <input type="number" id="cantidadDeFilas" value="5">
            </div>
        `;
        header.innerHTML = `
            <th>n</th>
            <th>a</th>
            <th>X</th>
            <th>a*X</th>
            <th>Xn+1</th>
            <th>ri</th>
        `;
    
    } else if (metodo === "congruencialMult") {
        inputs.innerHTML = `
            <div class="inputContainer">
                <label>K</label>
                <input type="number" id="numeroK" value="2">
            </div>
            <div class="inputContainer">
                <label>X0</label>
                <input type="number" id="numeroX0" value="17">
            </div>
            <div class="inputContainer">
                <label>G</label>
                <input type="number" id="numeroG" value="5">
            </div>
            <div class="inputContainer">
                <label>Cantidad de filas</label>
                <input type="number" id="cantidadDeFilas" value="5">
            </div>
        `;
        header.innerHTML = `<th>n</th><th>x0</th><th>a*X0</th><th>X0+1</th><th>un</th>`;
    
    } else if (metodo === "fibonacci") {
        inputs.innerHTML = `
            <div class="inputContainer">
                <label>X1</label>
                <input type="number" id="x1" value="4">
            </div>
            <div class="inputContainer">
                <label>X2</label>
                <input type="number" id="x2" value="9">
            </div>
            <div class="inputContainer">
                <label>M</label>
                <input type="number" id="m" value="8">
            </div>
            <div class="inputContainer">
                <label>Cantidad de filas</label>
                <input type="number" id="cantidadDeFilas" value="5">
            </div>
        `;
        header.innerHTML = `<th>n</th><th>Xn</th><th>Un</th>`;
    }

    // Finalmente, genera la tabla
    generarTabla();
}

function generarTabla() {
    const metodo = document.getElementById("metodo").value;
    let tablaContainer = document.querySelector('.tableContainer');

    // Quitar animación antes de generar la tabla (para evitar solapamiento)
    tablaContainer.classList.remove('show');

    if (metodo === "congruencial") {
        generarCongruencialesLineales();
    } else if (metodo === "productos") {
        generarProductosMedios();
    } else if (metodo === "cuadrados") {
        generarCuadradosMedios();
    } else if (metodo === "multiplicador") {
        generarMultiplicadorConstante();
    } else if (metodo === "congruencialMult") {
        generarCongruencialMult();
    } else if (metodo === "fibonacci") {
        generarFibonacci();
    }

    // Pequeño delay para que la animación se aplique después de la generación
    setTimeout(() => {
        tablaContainer.classList.add('show');
    }, 300);
}

function potencia(base, exponente) {

    let resultado = 1;
    for (let i = 0; i < exponente; i++) {
        resultado *= base;
    }
    return resultado;
}

function imprimirTablaEst(numeros) {

    imprimirTablaPruebaPromedio(numeros);
    imprimirTablaPruebaVarianza(numeros);
    imprimirTablaPruebaForma(numeros);
    imprimirTablaPruebaPoker(numeros);
    imprimirTablaPruebaCorridas(numeros);
    imprimirTablaPruebaCorridasMedia(numeros);
    imprimirTablaPruebaSeries(numeros);
    imprimirTablaPruebaHuecos(numeros);
    imprimirTablaUniformidadKS(numeros);
}


function imprimirTablaPruebaPromedio(numeros){
    let tablePruebaPromedio = document.getElementsByClassName("tablePruebaPromedio")[0];

    let media = calcularMedia(numeros);
    let alpha = 0.05;
    let nivelConfianza = 1-(alpha);
    let z = calcularZ(nivelConfianza);
    let li = calcularLI(media, numeros, z);
    let ls = calcularLS(media, numeros, z);

    let data = [media, alpha, nivelConfianza, z, li, ls];

    imprimirTablaPrueba(tablePruebaPromedio, data);

    graficarNumeros(numeros, media, li, ls);

}

function imprimirTablaPruebaVarianza(numeros){
    let tablePruebaVarianza = document.getElementsByClassName("tablePruebaVarianza")[0];

    let n = numeros.length;

    let media = calcularMedia(numeros);
    let varianza = varianzaMuestral(media, numeros);
    let alpha = 0.05;
    let nivelConfianza = 1-(alpha/2);
    let { chiSuperior, chiInferior } = calcularChiInfSup(n, alpha);
    let {li, ls} = calcularLimitesVarianza(numeros, chiInferior, chiSuperior);

    let data = [varianza, alpha, nivelConfianza, chiInferior, chiSuperior, li, ls];

    imprimirTablaPrueba(tablePruebaVarianza, data);

}

function imprimirTablaPruebaForma(numeros) {
    let tablePruebaFormaChi = document.getElementsByClassName("tablePruebaFormaChi")[0];
    let data = Object.values(pruebaForma(numeros));
    imprimirTablaPrueba(tablePruebaFormaChi, data);
}

function imprimirTablaPruebaPoker(numeros) {
    let tablePruebaPokerResultados = document.getElementsByClassName("tablePruebaPokerResultados")[0];
    let data = Object.values(pruebaPoker(numeros));
    imprimirTablaPrueba(tablePruebaPokerResultados, data);
}



function imprimirTablaPruebaCorridas(numeros) {

    let tablePruebaCorridas = document.getElementsByClassName("tablePruebaCorridas")[0];
    let data = Object.values(pruebaCorridas(numeros));
    imprimirTablaPrueba(tablePruebaCorridas, data);

}


function imprimirTablaPruebaCorridasMedia(numeros) {
    // 1) Obtenemos la referencia a la tabla (primera coincidencia con esa clase)
    let tablePruebaCorridasMedia = document.getElementsByClassName("tablePruebaCorridasMedia")[0];
    
    // 2) Ejecutamos la prueba de corridas y extraemos sus valores como arreglo
    //    Asegúrate de que la función 'pruebaCorridas(numeros)' retorne un objeto con
    //    las propiedades en el orden en que quieres mostrarlas.
    let data = Object.values(pruebaCorridasMedia(numeros, 0.05));

    // 3) Llamamos a la función auxiliar que pinta el resultado en la tabla
    imprimirTablaPrueba(tablePruebaCorridasMedia, data);
}

function imprimirTablaPruebaSeries(numeros) {
    let tablePruebaSeries = document.getElementsByClassName("tablePruebaSeries")[0];
    // Extraemos los valores que queremos mostrar.
    // En este ejemplo, mostramos: Chi-cuadrado, Grados de Libertad, Chi Crítico y Conclusión.
    let data = Object.values(pruebaIndependenciaSeries(numeros));
    

    imprimirTablaPrueba(tablePruebaSeries, data);
}


function imprimirTablaPruebaHuecos(numeros) {
    let tablePruebaHuecos = document.getElementsByClassName("tablePruebaHuecos")[0];
    let resultado = pruebaIndependenciaHuecos(numeros); // Retorna todas las propiedades

    // Convertir el objeto gapCounts y expected a cadenas legibles
    let gapCountsStr = Object.entries(resultado.gapCounts)
        .map(([k, v]) => `k=${k}: ${v}`)
        .join(" | ");
    let expectedStr = Object.entries(resultado.expected)
        .map(([k, v]) => `k=${k}: ${v.toFixed(3)}`)
        .join(" | ");

    let data = [
        gapCountsStr,
        resultado.totalGaps,
        expectedStr,
        resultado.chiSquare.toFixed(3),
        resultado.gradosLibertad,
        resultado.chiCrit.toFixed(3),
        resultado.conclusion,
        `[${resultado.intervalo[0]}, ${resultado.intervalo[1]}]`
    ];
    
    imprimirTablaPrueba(tablePruebaHuecos, data);
}

function imprimirTablaUniformidadKS(numeros) {
    let tableUniformidadKS = document.getElementsByClassName("tableUniformidadKS")[0];
    let resultado = pruebaUniformidadKS(numeros, 0.05);
    
    // Construir el arreglo de datos para imprimir:
    let data = [
        resultado.D.toFixed(4),
        resultado.n,
        resultado.Dcrit.toFixed(4),
        resultado.Dplus.toFixed(4),
        resultado.Dminus.toFixed(4),
        resultado.conclusion
    ];
    
    imprimirTablaPrueba(tableUniformidadKS, data);
}

















function imprimirTablaPrueba(tabla, data){

    let tbody = tabla.getElementsByTagName("tbody")[0];

    let tr=`<tr>`;

    data.forEach(element => {
        tr+=`<td>${element}</td>`;
    });

    tr+=`</tr>`;

    tbody.innerHTML = tr;

}


function createGradient(ctx, chartArea) {
    let gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, "rgba(88, 1, 114, 0.68)"); // Azul más intenso arriba
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.74)"); // Transparente abajo
    return gradient;
}

function graficarNumeros(numeros, media, li, ls) {
    let ctx = document.getElementById("graficoNumeros").getContext("2d");

    // Si ya existe un gráfico previo, lo destruye antes de crear uno nuevo
    if (window.miGrafico) {
        window.miGrafico.destroy();
    }

    window.miGrafico = new Chart(ctx, {
        type: "line",
        data: {
            labels: numeros.map((_, i) => `Iteración ${i + 1}`), // Etiquetas personalizadas
            datasets: [
                {
                    label: "Números Generados",
                    data: numeros,
                    borderColor: "rgb(88, 1, 114)", // color de la linea                     
                    // backgroundColor: "rgba(44, 1, 57, 0.67)", // Sombra debajo de la línea
                    backgroundColor: (context) => {
                        let chart = context.chart;
                        let { ctx, chartArea } = chart;
                        if (!chartArea) return null; // Evita errores si el gráfico aún no está cargado
                        return createGradient(ctx, chartArea);
                    },
                    borderWidth: 3, // Grosor de la línea
                    pointRadius: 10, // Tamaño de los puntos
                    pointBackgroundColor: "#c300ff",
                    pointBorderColor: "#e7a6fb",
                    tension: 0.4, // Suavizar las curvas de la línea
                    fill: true
                },
                {
                    label: "Media",
                    data: Array(numeros.length).fill(media),
                    borderColor: "#f00", // Rojo oscuro
                    borderDash: [5, 5],
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false
                },
                {
                    label: "Límite Inferior (LI)",
                    data: Array(numeros.length).fill(li),
                    borderColor: "#0f0", // Verde
                    borderDash: [5, 5],
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false
                },
                {
                    label: "Límite Superior (LS)",
                    data: Array(numeros.length).fill(ls),
                    borderColor: "#00f", // Púrpura
                    borderDash: [5, 5],
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            
            responsive: true,  // Hace que la gráfica se ajuste al contenedor
            maintainAspectRatio: true, // Permite modificar la altura sin restricciones
            animation: {
                duration: 1500, // Duración de la animación
                easing: "easeOutBounce" // Suavizado de la animación
            },
            scales: {
                x: {
                    title: { display: true, text: "Iteración", color: "#fff", font: { size: 14 } },
                    ticks: { color: "#fff" }, // Color del texto en la escala X
                    grid: { color: "rgba(255, 255, 255, 0.2)" } // Líneas de la cuadrícula
                },
                y: {
                    title: { display: true, text: "Valor", color: "#fff", font: { size: 14 } },
                    min: 0,
                    max: 1,
                    ticks: { color: "#fff" },
                    grid: { color: "rgba(255, 255, 255, 0.2)" }
                }
            },
            plugins: {

                customCanvasBackground: true,

                legend: {
                    labels: {
                        color: "#fff",
                        font: { size: 14 }
                    }
                },
                tooltip: {
                    backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo oscuro en tooltips
                    titleFont: { size: 14, weight: "bold" },
                    bodyFont: { size: 12 },
                    borderColor: "#fff",
                    borderWidth: 1
                }
            }
        }
    });
}



cambiarMetodo(); // Para cargar los valores iniciales al abrir la página
generarTabla();




document.getElementById("playButton").addEventListener("click", function() {
    let audio = document.getElementById("audio");
    audio.play(); // Reproducir el audio

    // Crear la ventana emergente
    let popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.padding = "20px";
    popup.style.background = "white";
    popup.style.border = "2px solid black";
    popup.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)";
    popup.style.zIndex = "1000";
    
    // Agregar la imagen dentro de la ventana emergente
    let img = document.createElement("img");
    img.src = "imagen.jpg";  // Reemplaza con la URL de tu imagen
    img.style.width = "200px"; // Ajusta el tamaño según sea necesario
    img.style.height = "auto";

    popup.appendChild(img);
    document.body.appendChild(popup);

    // Eliminar la ventana emergente después de 2 segundos
    setTimeout(function() {
        popup.remove();
    }, 2000);
});
