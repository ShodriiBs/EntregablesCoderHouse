let heladoSeleccionado = document.getElementsByClassName("contenedorImagenHelados");
let divCantHelados = document.getElementsByClassName("cantidadSeleccionada")
let botonRestar = document.getElementsByClassName("botonParaRestar")
let botonSumar = document.getElementsByClassName("botonParaSumar")
let stringCantHelado = document.getElementsByClassName("cantidadDeHelados")
let botonBorrar = document.getElementById("botonRemoveAll")
let botonContinuarCompra = document.getElementById("botonContinuarBuy")
let compraDetalles = document.getElementById("detallesCompra")
let divBotones = document.getElementById("botonesCompra")
let arrayHelados = []


for (let i = 0; i < botonRestar.length; i++) {
    botonRestar[i].addEventListener("click", () => {
        let cantidadSpan = stringCantHelado[i];
        let cantidad = parseInt(cantidadSpan.textContent);
        if (cantidad > 0) {
            cantidadSpan.textContent = cantidad - 1;
        }
    });

    botonSumar[i].addEventListener("click", () => {
        let cantidadSpan = stringCantHelado[i];
        let cantidad = parseInt(cantidadSpan.textContent);
        cantidadSpan.textContent = cantidad + 1;
    });
}

if(document.getElementById("openCarritoButton")){
    let botonOpenCarrito = document.getElementById("openCarritoButton")
    botonOpenCarrito.addEventListener("click",()=> {})
}

botonContinuarCompra.addEventListener("click", () => clickButtonUpdateBuy());
botonBorrar.addEventListener("click", () => buttonRemove())


function buttonRemove(){
    for (let i = 0; i < stringCantHelado.length; i++) {
        let cantidadSpan = stringCantHelado[i];
        cantidadSpan.textContent = "0";

        
    }
}

function updateLocalStorage(pedidoDetails, vuelta){
    localStorage.setItem("infoStoragePedido" + vuelta, pedidoDetails)
}

function clickButtonUpdateBuy() {
    compraDetalles.innerHTML = 'Usted desea comprar: ';

    for (let i = 0; i < stringCantHelado.length; i++) {
        let cantidadSpan = stringCantHelado[i];
        let cantidad = cantidadSpan.textContent;

        if (cantidad !== "0") {
            const infoSection = arrayCreatePedido(cantidadSpan, i);
            const pedidoLinea = document.createElement("div");
            pedidoLinea.innerHTML = `<span class="lineaPedidoInfo">${infoSection}</span>`;
            compraDetalles.appendChild(pedidoLinea);
            updateLocalStorage(infoSection, i);
        }
    }

    if (!document.querySelector(".botonAgregarCarrito")) {
        const buttonCarrito = document.createElement("button");
        buttonCarrito.innerHTML = 'Agregar al carrito';
        buttonCarrito.className = 'botonAgregarCarrito';
        divBotones.appendChild(buttonCarrito);

        buttonCarrito.addEventListener("click", () => {});
    }
}

function arrayCreatePedido(cantidadHeladoSet, nroSectionHelado){
    let ObjectSection = {};

    switch(nroSectionHelado){
        case 0:
            ObjectSection = {
                Peso: "1/4kg",
                Cantidad: cantidadHeladoSet.textContent,
                Precio: "$1000"
            };
            
            break;
        case 1:
            ObjectSection = {
                Peso: "1/2kg",
                Cantidad: cantidadHeladoSet.textContent,
                Precio: "$1800"
            };
            break;
        case 2:
            ObjectSection = {
                Peso: "1kg",
                Cantidad: cantidadHeladoSet.textContent,
                Precio: "$3500"
            };
            break;
        case 3:
            ObjectSection = {
                Peso: "1 3/4kg ",
                Cantidad: cantidadHeladoSet.textContent,
                Precio: "$6000"
            };
            break;
        case 4:
            ObjectSection = {
                Peso: "2kg",
                Cantidad: cantidadHeladoSet.textContent,
                Precio: "$6500"
            };
            break;
    }

    arrayHelados.push(ObjectSection);

    let infoDePedidoHelado = "";
    for (let i = 0; i < arrayHelados.length; i++) {
        infoDePedidoHelado = "-" + arrayHelados[i].Cantidad + " potes de " + arrayHelados[i].Peso + "\n";
    }

    return infoDePedidoHelado;
}
