//Constructores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Cotizacion

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


function UI() {

}

//llenar opcion de año
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


//Mostrar Alertas
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
console.log(textoMarca);
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

//instanciar UI

const ui = new UI();



document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();

})

addEventListener();

function addEventListener() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();

    //leer marca
    const marca = document.querySelector('#marca').value;


    //leer año
    const year = document.querySelector('#year').value;

    //leer tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error')
        return;
    }

    ui.mostrarMensaje('Cotizando', 'correcto')

    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }
    //Instanciar Seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    //utilizar el prototype
    UI.prototype.mostrarResultado(total, seguro);
}

