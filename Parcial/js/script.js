import crearTabla from './tabla.js';

import {
    Anuncio_Auto,
    obtenerAnuncios,
    obtenerId,
    guardarDatos,
    eliminarAnuncio,
    editarAnuncio
} from './Anuncio_Auto.js';

let frmPersona;
let divTabla;

// window.addEventListener('load', inicializarManejadores);




window.addEventListener('load', () => {


    frmPersona = document.forms[0];
    frmPersona.addEventListener('submit', clickAlta);
    document.forms[0].listar.addEventListener('click', clickListar);
    document.forms[0].btnModificar.addEventListener('click', clickModificar);
    document.forms[0].btnBorrar.addEventListener('click', clickEliminar);
    divTabla = document.getElementById('divTabla');

    
    // var imagenEliminar = document.createElement("img");
    // imagenEliminar.setAttribute('src','./icons/basura.png');
    // var imagenModificar = document.createElement("img");
    // imagenModificar.setAttribute('src','./icons/lapiz.png');
    // document.getElementById('borrar').appendChild(imagenEliminar);
    // document.getElementById('btnModificar').appendChild(imagenModificar);
});

//obtenerPersona
function obtenerAnuncio() {
    let id = obtenerId();
    const nuevoAuto = new Anuncio_Auto(id,
        document.getElementById('txtTitulo').value,
        document.querySelector('#txtTransaccion').value,
        document.getElementById('txtDescripcion').value,
        document.getElementById('txtPrecio').value,
        document.getElementById('txtPuertas').value,
        document.getElementById('txtKms').value,
        document.getElementById('txtPotencia').value
    );
    // console.log('dia elejido => ', document.getElementById('dia').value);
    // console.log('deporte => ', document.getElementById('deporte').value);
    // console.log('Fuma => ', document.getElementById('checkFuma').checked);
    return nuevoAuto;
}


//Actualizan la lista
function clickListar() {
    // constructor(id, nombre, apellido, email,sexo,fecha, deporte, fumador)
    // let per = new PersonaCompleta(20, 'aa', 'aa', 'a@a', 'Male', '2020-10-10', 'Futbol', true);
    // console.log(per);

    divTabla.style.display = "none";
    document.getElementById('containerSpinner').style.display = "block";
    setTimeout(() => {
        divTabla.innerHTML = "";
        divTabla.appendChild(crearTabla(obtenerAnuncios()));

        divTabla.style.display = "block";
        document.getElementById('containerSpinner').style.display = "none";
    }, 3000); //1000
}

function clickEliminar() {
    eliminarAnuncio();
    clickListar();
}

function clickModificar() {
    editarAnuncio();
    clickListar();
}

function clickAlta(e) {
    e.preventDefault();
    let listaPersonas = obtenerAnuncios();
    const nuevoAuto = obtenerAnuncio();
    if (nuevoAuto) {
        listaPersonas.push(nuevoAuto);
        let id = obtenerId();
        guardarDatos(listaPersonas, (id + 1));

        cargarFormulario();
    }
    clickListar();
}

//Metodo sin uso para ver como capturar los datos
function cargarFormulario() {


    document.getElementById('txtTitulo').value="";
    document.querySelector('#txtTransaccion').value="";
    document.getElementById('txtDescripcion').value="";
    document.getElementById('txtPrecio').value="";
    document.getElementById('txtPuertas').value="";
    document.getElementById('txtKms').value="";
    document.getElementById('txtPotencia').value="";
}