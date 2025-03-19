
//----------------------------------Prueba de promedio-------------------------------

function calcularMedia(numeros) {
    let media = 0;

    numeros.forEach(num => {
        media += num;
    });

    media /= numeros.length; // Dividimos la suma entre la cantidad de elementos
    return media;
}

function calcularZ(nivelConfianza){

    //Obtener el valor de z_alpha/2 según el nivel de confianza
    let zValores = {
        0.80: 1.282,
        0.85: 1.440,
        0.90: 1.645,
        0.95: 1.960,
        0.98: 2.326,
        0.99: 2.576,
        0.995: 2.807,
        0.999: 3.291
    };
        let z = zValores[nivelConfianza] || 1.96; // Default: 95%

    return z;

}

function calcularLI(media, numeros, z){

    let n = numeros.length;
    if (n === 0) return null; // Evitar división por cero

    let li = 0.5 - z * (1 / 12*Math.sqrt(n));
    
    //li = jStat.min(numeros);

    //console.log(li+"-"+JStat.min(numeros));

    return(li);

}

function calcularLS(media, numeros, z) {
    
    let n = numeros.length;
    if (n === 0) return null; // Evitar división por cero

    let ls = 0.5 + z * (1 / 12*Math.sqrt(n));

    //li = jStat.max(numeros);

    //console.log(li+"-"+JStat.max(numeros));

    return ls;
}



//----------------------------------Prueba de Varianza-------------------------------

function varianzaMuestral(media, numeros) {
    if (numeros.length < 2) {
        throw new Error("Se necesitan al menos dos datos para calcular la varianza muestral.");
    }

    let n = numeros.length;
    let sumaCuadrados = numeros.reduce((sum, x) => sum + (x - media) ** 2, 0);

    return sumaCuadrados / (n - 1);
}

function calcularChiInfSup(n, alpha) {
    let df = n - 1; // Grados de libertad
    let chiSuperior = jStat.chisquare.inv(1 - alpha / 2, df);
    let chiInferior = jStat.chisquare.inv(alpha / 2, df);
    return { chiSuperior, chiInferior };
}

function calcularChiCritico(gradosDeLibertad, alpha){
    return(jStat.chisquare.inv(1 - alpha, gradosDeLibertad));
}

function calcularLimitesVarianza(numeros, chiInferior, chiSuperior) {
    let n = numeros.length;
    if (n < 2) {
        throw new Error("Se necesitan al menos dos datos para calcular los límites de la varianza.");
    }

    let li = (chiInferior / (12 * (n - 1)));
    let ls = (chiSuperior / (12 * (n - 1)));

    return { li, ls };
}


//-------------------------------Prueba de Forma---------------------------------

function pruebaForma(numeros) {
    const numIntervalos = 10;
    const fe = numeros.length / numIntervalos; // Frecuencia Esperada
    let contador = new Array(numIntervalos).fill(0); // Inicializa con ceros
    let c = 0;

    // Contar cuántos números caen en cada intervalo
    numeros.forEach(num => {
        let index = Math.floor(num * numIntervalos); // Encuentra el índice del intervalo
        if (index >= numIntervalos) index = numIntervalos - 1; // Evita error con num = 1.0
        contador[index]++;
    });

    // Insertar los datos en la tabla
    const tbody = document.querySelector(".tablePruebaForma tbody");
    tbody.innerHTML = ""; // Limpiar contenido previo

    for (let i = 0; i < numIntervalos; i++) {
        let min = (i / numIntervalos).toFixed(1);
        let max = ((i + 1) / numIntervalos).toFixed(1);
        let fo = contador[i]; // Frecuencia Observada
        c += Math.pow(fe - fo, 2) / fe; // Cálculo del chi-cuadrado individual

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${min}-${max}</td>
            <td>${fo}</td>
            <td>${fe.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    }

    // Obtener el valor crítico de chi-cuadrado para df = (numIntervalos - 1) y α = 0.05
    const gradosDeLibertad = numIntervalos - 1;
    const chiCritico = calcularChiCritico(gradosDeLibertad, 0.05);

    let uniformidad = c<chiCritico?"Los datos siguen una distribución uniforme":"Los datos NO siguen una distribución uniforme";

    return{c,chiCritico,uniformidad};

}

//-------------------------------Prueba de Poker---------------------------------

function pruebaPoker(numeros) {
    const probabilidades = {
        'Pachuca': 0.3024,
        'Un par': 0.5040,
        'Dos pares': 0.1080,
        'Una tercia': 0.0720,
        'Full': 0.0090,
        'Poker': 0.0045,
        'Quintilla': 0.0001
    };

    let frecuencias = {
        'Pachuca': 0,
        'Un par': 0,
        'Dos pares': 0,
        'Una tercia': 0,
        'Full': 0,
        'Poker': 0,
        'Quintilla': 0
    };

    let n = numeros.length;

    // Contar ocurrencias en cada categoría
    numeros.forEach(num => {
        let tipo = clasificarNumero(num);
        frecuencias[tipo]++;
    });

    let c = 0;
    const tbody = document.querySelector(".tablePruebaPoker tbody");
    tbody.innerHTML = ""; // Limpiar contenido previo

    for (let categoria in probabilidades) {
        let fo = frecuencias[categoria];
        let pe = probabilidades[categoria];
        let fe = n * pe;
        // 🔥 Evitar divisiones por 0 (si Fe es muy pequeño, usar un valor mínimo)
        if (fe < 0.0001) fe = 0.0001;
        c += Math.pow(fo - fe, 2) / fe; // Cálculo de chi-cuadrado

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${categoria}</td>
            <td>${fo}</td>
            <td>${fe.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    }
    

    // Obtener el valor crítico de chi-cuadrado para 6 grados de libertad y α = 0.05
    const chiCritico = calcularChiCritico(6, 0.05);
    let independencia = c < chiCritico ? "Los números son independientes" : "Los números NO son independientes";

    return { c, chiCritico, independencia };
}

function clasificarNumero(numero) {
    // Multiplica por 100000 y trunca
    let entero = Math.floor(numero * 100000);
    // Con padStart, te aseguras de tener siempre 5 dígitos (rellenando con ceros a la izquierda si hace falta)
    let str = entero.toString().padStart(5, '0');
  
    // Contar la frecuencia de cada dígito
    let conteo = {};
    for (let digito of str) {
      conteo[digito] = (conteo[digito] || 0) + 1;
    }
  
    // Ordenar de mayor a menor las repeticiones
    let valores = Object.values(conteo).sort((a, b) => b - a);
  
    // Clasificar según las reglas de Poker
    if (valores[0] === 5) {
      return 'Quintilla';
    } else if (valores[0] === 4) {
      return 'Poker';
    } else if (valores[0] === 3 && valores[1] === 2) {
      return 'Full';
    } else if (valores[0] === 3) {
      return 'Una tercia';
    } else if (valores[0] === 2 && valores[1] === 2) {
      return 'Dos pares';
    } else if (valores[0] === 2) {
      return 'Un par';
    } else {
      return 'Pachuca';
    }
}

//-------------------------------Prueba de Corridas---------------------------------

function pruebaCorridas(numeros, alpha = 0.05) {
    const n = numeros.length;
    // Con muy pocos datos no se puede hacer la prueba
    if (n < 2) {
        return {
            h: 0,
            eH: 0,
            vH: 0,
            z: 0,
            zCrit: 0,
            conclusion: "No se puede realizar la prueba con menos de 2 datos"
        };
    }

    // 1) Clasificar cada número según si sube (+) o baja (-) respecto al anterior
    let signos = [];
    for (let i = 1; i < n; i++) {
        if (numeros[i] >= numeros[i - 1]) {
            signos.push('+');
        } else {
            signos.push('-');
        }
    }

    // 2) Contar las corridas (h)
    let h = 1; // Hay al menos 1 corrida
    for (let i = 1; i < signos.length; i++) {
        if (signos[i] !== signos[i - 1]) {
            h++;
        }
    }

    // 3) Calcular E(h) y V(h)
    let eH = (2 * n - 1) / 3;
    let vH = (16 * n - 29) / 90;

    // 4) Estadístico Z
    let z = (h - eH) / Math.sqrt(vH);

    // Valor crítico de Z (bilateral) usando jStat o tu método preferido
    let zCrit = jStat.normal.inv(1 - alpha / 2, 0, 1);

    // 5) Conclusión
    let conclusion;
    if (Math.abs(z) <= zCrit) {
        conclusion = "No se rechaza H0 (independientes)";
    } else {
        conclusion = "Se rechaza H0 (dependientes)";
    }

    return {
        h,
        eH,
        vH,
        z,
        zCrit,
        conclusion
    };
}

//-------------------------------Prueba de Corridas Media---------------------------------

function pruebaCorridasMedia(numeros, alpha) {
    const n = numeros.length;
    if (n < 2) {
        return {
            R: 0,
            eR: 0,
            varR: 0,
            Z: 0,
            Zcrit: 0,
            conclusion: "No se puede realizar la prueba con menos de 2 datos."
        };
    }

    // 1) Calcular la media
    let media = numeros.reduce((acc, val) => acc + val, 0) / n;

    // 2) Etiquetar cada número como A (arriba) o B (abajo)
    //    (en este ejemplo, si X_i == media, lo consideramos A).
    let secuencia = numeros.map(x => (x >= media ? 'A' : 'B'));

    // Contar cuántos A y B
    let n1 = secuencia.filter(s => s === 'A').length; // cantidad de A
    let n2 = n - n1;                                  // cantidad de B

    // Si n1 == 0 o n2 == 0, todos quedaron de un solo lado, no hay corridas útiles
    if (n1 === 0 || n2 === 0) {
        return {
            R: 1,
            eR: 1,
            varR: 0,
            Z: 0,
            Zcrit: 0,
            conclusion: "Todos los valores están en un solo lado de la media (no hay prueba válida)."
        };
    }

    // 3) Contar las corridas R
    let R = 1; 
    for (let i = 1; i < secuencia.length; i++) {
        if (secuencia[i] !== secuencia[i - 1]) {
            R++;
        }
    }

    // 4) Calcular E(R) y Var(R) según las fórmulas
    let eR = 1 + (2 * n1 * n2) / n;
    let varR = (2 * n1 * n2 * (2 * n1 * n2 - n)) / (n * n * (n - 1));

    // 5) Estadístico Z
    let Z = (R - eR) / Math.sqrt(varR);

    // 6) Valor crítico Z (bilateral) al nivel alpha
    let Zcrit = jStat.normal.inv(1 - alpha / 2, 0, 1);

    // 7) Conclusión
    let conclusion = (Math.abs(Z) <= Zcrit)
        ? "No se rechaza H0 (independientes)."
        : "Se rechaza H0 (dependientes).";

    return { R, eR, varR, Z, Zcrit, conclusion };
    
}

function pruebaIndependenciaSeries(numeros, d = 3, alpha = 0.05) {
    const n = numeros.length;
    if(n < 2) {
        return {
            mensaje: "Se requieren al menos 2 números para formar una serie.",
        };
    }

    // 1. Formar los pares consecutivos: (x1, x2), (x2, x3), ..., (x_{n-1}, x_n)
    let pairs = [];
    for (let i = 0; i < n - 1; i++) {
        pairs.push([numeros[i], numeros[i + 1]]);
    }
    
    // 2. Inicializar la matriz de frecuencias observadas (d x d)
    let obs = [];
    for (let i = 0; i < d; i++) {
        obs[i] = [];
        for (let j = 0; j < d; j++) {
            obs[i][j] = 0;
        }
    }
    
    // 3. Contar las ocurrencias en cada celda
    pairs.forEach(pair => {
        let x = pair[0], y = pair[1];
        // Determinar la celda: se usa Math.floor(x*d) y Math.floor(y*d)
        // Si x o y llegan a ser 1, se ubican en la última celda.
        let i = Math.floor(x * d);
        let j = Math.floor(y * d);
        if (i >= d) i = d - 1;
        if (j >= d) j = d - 1;
        obs[i][j]++;
    });
    
    // 4. Calcular la frecuencia esperada (E) para cada celda
    let totalPairs = pairs.length;  // n-1
    let numCeldas = d * d;
    let expected = totalPairs / numCeldas;
    
    // 5. Calcular el estadístico chi-cuadrado
    let chiSquare = 0;
    for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
            chiSquare += Math.pow(obs[i][j] - expected, 2) / expected;
        }
    }
    
    // 6. Grados de libertad: número de celdas - 1
    let gradosLibertad = numCeldas - 1;
    
    // 7. Valor crítico de chi-cuadrado (asumiendo que tienes una función calcularChiCritico)
    let chiCrit = calcularChiCritico(gradosLibertad, alpha);
    
    // 8. Conclusión
    let conclusion = chiSquare < chiCrit 
        ? "Los números son independientes" 
        : "Los números NO son independientes";
    
    return {
        obs,
        totalPairs,
        expected,
        chiSquare,
        gradosLibertad,
        chiCrit,
        conclusion
    };
}

function pruebaIndependenciaHuecos(numeros, a = 0.3, b = 0.7, kMax = 5, alpha = 0.05) {
    const p = b - a;  // Probabilidad de caer en el intervalo I

    let gaps = [];
    let gapCount = 0;
    let inIntervalFound = false; // Para empezar a contar desde la primera ocurrencia en I

    // Recorrer la secuencia
    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] >= a && numeros[i] <= b) {
            // Si se encuentra un número en I:
            if (inIntervalFound) {
                gaps.push(gapCount);
            } else {
                // Primera ocurrencia, se activa la cuenta
                inIntervalFound = true;
            }
            gapCount = 0;  // Reiniciamos el contador
        } else {
            if (inIntervalFound) {
                gapCount++;  // Solo contamos si ya se encontró al menos un número en I
            }
        }
    }
    // totalGaps: número total de huecos registrados
    let totalGaps = gaps.length;

    // Se cuentan las frecuencias observadas de huecos para k = 0, 1, …, kMax-1
    // y se agrupan todos los huecos con k >= kMax en la categoría kMax.
    let gapCounts = {};
    for (let k = 0; k < kMax; k++) {
        gapCounts[k] = 0;
    }
    gapCounts[kMax] = 0;  // Categoría agrupada para k >= kMax

    for (let gap of gaps) {
        if (gap < kMax) {
            gapCounts[gap]++;
        } else {
            gapCounts[kMax]++;
        }
    }

    // Calcular las frecuencias esperadas:
    // Para k = 0,1,...,kMax-1: Expected = totalGaps * p * (1-p)^k.
    // Para la categoría k = kMax (k >= kMax): Expected = totalGaps * (1-p)^(kMax)
    let expected = {};
    for (let k = 0; k < kMax; k++) {
        expected[k] = totalGaps * p * Math.pow(1 - p, k);
    }
    expected[kMax] = totalGaps * Math.pow(1 - p, kMax);

    // Calcular el estadístico chi-cuadrado
    let chiSquare = 0;
    for (let k in gapCounts) {
        let obs = gapCounts[k];
        let exp = expected[k];
        // Evitar división por 0 si la frecuencia esperada es muy pequeña
        if (exp < 0.0001) exp = 0.0001;
        chiSquare += Math.pow(obs - exp, 2) / exp;
    }

    // Número de categorías (incluye la última agrupada)
    let numCategorias = Object.keys(gapCounts).length;
    let gradosLibertad = numCategorias - 1;

    // Se obtiene el valor crítico de chi-cuadrado (debes tener la función calcularChiCritico definida)
    let chiCrit = calcularChiCritico(gradosLibertad, alpha);

    let conclusion = chiSquare < chiCrit 
        ? "Los números son independientes" 
        : "Los números NO son independientes";

    return {
        gapCounts,       // Objeto con la frecuencia observada para cada categoría
        totalGaps,       // Total de huecos registrados
        expected,        // Frecuencias esperadas para cada categoría
        chiSquare,       // Estadístico chi-cuadrado calculado
        gradosLibertad,  // Grados de libertad
        chiCrit,         // Valor crítico de chi-cuadrado
        conclusion,      // Conclusión del test
        intervalo: [a, b] // El intervalo considerado para la prueba
    };
}

function pruebaUniformidadKS(numeros, alpha = 0.05) {
    let n = numeros.length;
    if (n === 0) {
        return { mensaje: "La muestra está vacía" };
    }

    // Ordenar la muestra de forma creciente
    let sorted = [...numeros].sort((a, b) => a - b);

    let Dplus = 0;
    let Dminus = 0;

    // Calcular D+ y D-
    for (let i = 0; i < n; i++) {
        // Para D+, se compara la función empírica F_n(x) = (i+1)/n con F(x)=x
        let diffPlus = (i + 1) / n - sorted[i];
        if (diffPlus > Dplus) Dplus = diffPlus;

        // Para D-, se compara F(x) - (i)/n
        let diffMinus = sorted[i] - i / n;
        if (diffMinus > Dminus) Dminus = diffMinus;
    }

    let D = Math.max(Dplus, Dminus);

    // Valor crítico: para alpha=0.05 se usa c=1.36; para alpha=0.10 c=1.22; para alpha=0.01 c=1.63
    let c;
    if (alpha === 0.10) c = 1.22;
    else if (alpha === 0.05) c = 1.36;
    else if (alpha === 0.01) c = 1.63;
    else c = 1.36; // valor por defecto
    let Dcrit = c / Math.sqrt(n);

    let conclusion = D < Dcrit 
        ? "La muestra es uniforme" 
        : "La muestra NO es uniforme";

    return {
        D,           // Estadístico KS
        n,           // Tamaño de la muestra
        Dcrit,       // Valor crítico
        Dplus,       // Máxima diferencia positiva
        Dminus,      // Máxima diferencia negativa
        conclusion
    };
}



















function chiCuadradoUniformidad(datos, k) {
    let n = datos.length;
    let frecuenciaEsperada = n / k;
    let intervalos = new Array(k).fill(0);

    // Contar frecuencias observadas en los intervalos
    datos.forEach(num => {
        let index = Math.floor(num * k);  // Ubicar número en un intervalo
        if (index === k) index = k - 1;  // Ajuste si num es 1
        intervalos[index]++;
    });

    // Calcular estadístico chi-cuadrada
    let chiCuadrado = intervalos.reduce((sum, oi) => 
        sum + ((oi - frecuenciaEsperada) ** 2) / frecuenciaEsperada, 0);

    return { chiCuadrado, intervalos };
}


function pruebaChiCuadradoUniforme(numeros, alpha = 0.05) {
    // Cantidad total de valores
    const n = numeros.length;
    // Dividimos [0,1] en k = 10 intervalos de amplitud 0.1
    const k = 10;
    // Frecuencia esperada en cada intervalo
    const FE = n / k;
    
    // Contar frecuencias observadas en cada intervalo
    let frecuencias = new Array(k).fill(0);
    for (let i = 0; i < n; i++) {
        let valor = numeros[i];
        // Determina el intervalo al que pertenece
        // Si valor == 1, forzamos el índice al último intervalo (k - 1)
        let indice = Math.floor(valor * k);
        if (indice === k) indice = k - 1;
        frecuencias[indice]++;
    }
    
    // Cálculo del estadístico Chi-Cuadrado
    let chiCuadrado = 0;
    for (let i = 0; i < k; i++) {
        let FO = frecuencias[i];
        chiCuadrado += Math.pow((FO - FE), 2) / FE;
    }

    // Grados de libertad: k - 1 - (parametros estimados=0 en este caso) => 9
    // Para α=0.05 y gl=9, el valor crítico (aprox) es 16.92 
    // (Puedes ajustarlo según tu tabla/tablas u obtenerlo de alguna librería)
    const chiCritico = 16.92;  

    // Interpretación
    // Si chiCuadrado < chiCritico => "No se rechaza H0" (es uniforme).
    // Caso contrario => "Se rechaza H0".
    let resultado = {
        chiCalculado: chiCuadrado,
        chiCritico: chiCritico,
        decision: (chiCuadrado < chiCritico)
            ? `Uniformidad aceptada (Chi²=${chiCuadrado} < crítico=${chiCritico})`
            : `No es uniforme (Chi²=${chiCuadrado} > crítico=${chiCritico})`
    };

    // Imprime en consola, o podrías mostrarlo donde gustes en tu HTML
    console.log(`Chi² calculado: ${resultado.chiCalculado.toFixed(2)}`);
    console.log(`Chi² crítico (gl=9, α=${alpha}): ${resultado.chiCritico}`);
    console.log(`Decisión: ${resultado.decision}`);

    return resultado;
}


function pruebaFormaa(numeros) {
    let k = 10; // Número de intervalos
    let n = numeros.length;
    let frecuenciaEsperada = n / k;
    let intervalos = new Array(k).fill(0);

    // Clasificar los números en intervalos
    numeros.forEach(num => {
        let index = Math.floor(num * k);
        if (index === k) index = k - 1; // Ajuste si el número es exactamente 1
        intervalos[index]++;
    });

    // Calcular estadístico Chi-Cuadrado
    let chiCuadrado = intervalos.reduce((sum, fo) => sum + ((fo - frecuenciaEsperada) ** 2) / frecuenciaEsperada, 0);

    // Valor crítico para gl=9 y α=0.05 es 16.92
    const chiCritico = 16.92;

    // Determinar resultado
    let resultado = chiCuadrado < chiCritico ? "Distribución uniforme aceptada" : "Distribución no uniforme";

    return { chiCuadrado, chiCritico, resultado };
}