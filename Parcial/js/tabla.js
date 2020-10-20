let cantFilas;
//Metodos dedicados a la creacion de la tabla
export default function crearTabla(lista){
    const tabla = document.createElement('table');

    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));

    return tabla;
}

function crearCabecera(item){
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (const key in item) {
        const th = document.createElement('th');
        const texto = document.createTextNode(key);
        th.appendChild(texto);
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
}

function crearCuerpo(lista){
    const tbody = document.createElement('tbody');
   
    lista.forEach(element => {

        const tr = document.createElement('tr');

        for (const key in element) {
            const td = document.createElement('td');
            const texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            tr.appendChild(td);
        }

        if(element.hasOwnProperty('id')){
            tr.setAttribute('data-id', element['id']);
            tr.setAttribute('data-lastNombre', element['last_name']);
            // tr.dataset.id = element['id'];
        }

        agregarManejadorTR(tr);
        tbody.appendChild(tr);
    });

    return tbody;
}


//Agrega el click a los TR
function agregarManejadorTR(tr) {
    if(tr){
        // debugger
        if(cantFilas==null ){
            cantFilas=1;
        }
        if(cantFilas % 2 == 0){

        }else{
            // tr.setAttribute('style','background-color:aquamarine;');
        }
        cantFilas++;

        tr.addEventListener('click', function(e){
            
            //  alert( e.path[1].dataset.id); //<---id
            const idPersonaSeleccionada = e.path[1].dataset.id;
            buscarPersona(idPersonaSeleccionada);
            localStorage.setItem('idSeleccionado',idPersonaSeleccionada);
            document.getElementById('btnModificar').style.display ="inline-block";
            document.getElementById('btnBorrar').style.display ="inline-block";
            
        });
    }
}


//Metodos para buscar una persona / cargar un formulario
function buscarPersona(idPer){
    const listado = JSON.parse(localStorage.getItem('anuncios'));

    if(listado != null ){
        listado.forEach(element => {
            if(element['id'] == idPer){
                cargarFormulario(element['titulo'],element['transaccion'],element['descripcion'],element['precio']
                ,element['puertas'],element['kms'],element['potencia']);
            }
        });
    }
}

function cargarFormulario( titulo, transaccion, descripcion, precio, puertas, kms, potencia){

    document.getElementById('txtTitulo').value=titulo;
    document.querySelector('#txtTransaccion').value=transaccion;
    document.getElementById('txtDescripcion').value=descripcion;
    document.getElementById('txtPrecio').value=precio;
    document.getElementById('txtPuertas').value=puertas;
    document.getElementById('txtKms').value=kms;
    document.getElementById('txtPotencia').value=potencia;
}



