//Funcion constructora de Objeto Seguro
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Formula de cotizacion segun seguro elegido (en prototipo)
Seguro.prototype.cotizarSeguro = function () {

    //marca
    let cantidad;
    const base = 300;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }


    //leer año
    const diferencia = new Date().getFullYear() - this.year;

    //Se reduce si es mas antiguo

    cantidad -= ((diferencia * 3) * cantidad) / 100;


    //tipo basico 30% mas si es completo 50% mas

    if (this.tipo === 'basico') {
        cantidad *= 1.30;

    } else {
        cantidad *= 1.50;
       
    }
    return  Math.round(cantidad)

}

//Funcion constructora de la visualizacion grafica
function UI() {}

// Prototipo de UI para llenar opcion de año automaticamente
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    min = max - 20;

    const year = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}

//Prototipo para Mostrar Alertas en entorno grafico
UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //insertar html
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 2000);

}

//Prototipo para mostrar resultado en entorno grafico
UI.prototype.mostrarResultado = (total, seguro) => {
   const {marca, year, tipo} = seguro;

   let textoMarca;

    switch (marca) {
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;

        default:
            break;
    }

    // crear resultado
    const div = document.createElement('div');
    div.classList.add('centerform');

    div.innerHTML = `<p class="header centerform">Tu resumen</p>

    <p class="font-bold centerform"> Marca: ${textoMarca} <br> Año: ${year}  <br> Tipo de Seguro: ${tipo}</p>
          <p class="font-bold centerform"> Total: ${total} €</p>
    `
    const resultadoDiv = document.querySelector('#resultado');
    resultadoDiv.appendChild(div);
}

//Nueva instancia de la funcion UI
const ui = new UI();

//Llamado de evento para pintar los años en opciones
document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
})
addEventListener();

//llamada a eventos del submit de formulario, boton (que ocurre al accionarlo)
function addEventListener() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

//Que va tomar la accion del formulario, marca, año y tipo
function cotizarSeguro(e) {
    e.preventDefault();

    //leer marca
    const marca = document.querySelector('#marca').value;

    //leer año
    const year = document.querySelector('#year').value;

    //leer tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        //Mostrar mensaje de error de formulario
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error')
        return;
    }

//Mostrar mensaje de correcto
    ui.mostrarMensaje('Cotizando', 'correcto')

    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }
    
    //Crear un nuevo objeto de seguro en base a lo seleccionado
    const seguro = new Seguro(marca, year, tipo);

    //Crear objeto segun el prototipo de seguro (cotizar seguro, usando el objeto nuevo seguro)
    const total = seguro.cotizarSeguro();

    //utilizar el prototype para pintar en el entorno grafico
    UI.prototype.mostrarResultado(total, seguro);
}

