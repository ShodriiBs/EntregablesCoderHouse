const heladoSeleccionado = document.getElementsByClassName("contenedorImagenHelados");
const divCantHelados = document.getElementsByClassName("cantidadSeleccionada")
const botonRestar = document.getElementsByClassName("botonParaRestar")
const botonSumar = document.getElementsByClassName("botonParaSumar")
const stringCantHelado = document.getElementsByClassName("cantidadDeHelados")
const botonBorrar = document.getElementById("botonRemoveAll")
const botonContinuarCompra = document.getElementById("botonActualizarBuy")
let compraDetalles = document.getElementById("detallesCompra")
const divBotones = document.getElementById("botonesCompra")
let arrayHelados = []
let buttonCarrito = null

for (let i = 0; i < botonRestar.length; i++) {
    botonRestar[i].addEventListener("click", () => {
        const cantidadSpan = stringCantHelado[i];
        const cantidad = parseInt(cantidadSpan.textContent);
        if (cantidad > 0) {
            cantidadSpan.textContent = cantidad - 1;
        }
    });

    botonSumar[i].addEventListener("click", () => {
        const cantidadSpan = stringCantHelado[i];
        const cantidad = parseInt(cantidadSpan.textContent);
        cantidadSpan.textContent = cantidad + 1;
    });
}

botonContinuarCompra.addEventListener("click", () => clickButtonUpdateBuy());
botonBorrar.addEventListener("click", () => buttonRemove())

function buttonRemove(){
    botonContinuarCompra.disabled = false
    
    for (let i = 0; i < stringCantHelado.length; i++) {
        botonRestar[i].disabled = false
        botonSumar[i].disabled = false
        const cantidadSpan = stringCantHelado[i];
        cantidadSpan.textContent = "0";

        compraDetalles.innerHTML = ''
        localStorage.clear()

        if(buttonCarrito){
            buttonCarrito.remove()
        }
    }
    arrayHelados.length = 0
}

function updateLocalStorage(pedidoDetails, vuelta){
    localStorage.setItem("infoStoragePedido" + vuelta, pedidoDetails)
}

function clickButtonUpdateBuy() {
    botonContinuarCompra.disabled = true
    compraDetalles.innerHTML = 'Usted desea comprar: ';


    for (let i = 0; i < stringCantHelado.length; i++) {
        const cantidadSpan = stringCantHelado[i];
        const cantidad = cantidadSpan.textContent;
        botonRestar[i].disabled = true
        botonSumar[i].disabled = true

        if (cantidad !== "0") {
            const infoSection = arrayCreatePedido(cantidadSpan, i);
            const pedidoLinea = document.createElement("div");
            pedidoLinea.innerHTML = `<span class="lineaPedidoInfo">${infoSection}</span>`;
            compraDetalles.appendChild(pedidoLinea);
            updateLocalStorage(infoSection, i);
        }
    }

    if (!document.querySelector(".botonAgregarCarrito")) {
        buttonCarrito = document.createElement("button");
        buttonCarrito.innerHTML = 'Agregar al carrito';
        buttonCarrito.className = 'botonAgregarCarrito';
        divBotones.appendChild(buttonCarrito);

        buttonCarrito.addEventListener("click", () => {

            clickButtonAddCarrito()
            buttonCarrito.remove()
            botonContinuarCompra.disabled = false
            }
        );
        
    }
}

function clickButtonAddCarrito(){
    window.open("carrito.html","_blank");

    for (let i = 0; i < stringCantHelado.length; i++) {
        const cantidadSpan = stringCantHelado[i];
        cantidadSpan.textContent = "0";
    }

    clickButtonUpdateBuy();

    for (let i = 0; i < stringCantHelado.length; i++) {
        botonRestar[i].disabled = false
        botonSumar[i].disabled = false
    }
    compraDetalles.innerHTML = '';

    localStorage.setItem("infoArrayHelados", JSON.stringify(arrayHelados));
    arrayHelados.length = 0

}

function arrayCreatePedido(cantidadHeladoSet, nroSectionHelado){
    let ObjectSection = {};

    switch(nroSectionHelado){
        case 0:
            ObjectSection = {
                Peso: "1/4kg",
                Cantidad: cantidadHeladoSet.textContent,
                Precio: 1000
            };
            
            break;
        case 1:
            ObjectSection = {
                Peso: "1/2kg",
                Cantidad: cantidadHeladoSet.textContent,
                Precio: 1800
            };
            break;
        case 2:
            ObjectSection = {
                Peso: "1kg",
                Cantidad: cantidadHeladoSet.textContent,
                Precio: 3500
            };
            break;
        case 3:
            ObjectSection = {
                Peso: "1 3/4kg ",
                Cantidad: cantidadHeladoSet.textContent,
                Precio: 6000,
                Promo: "1 pote de 1kg, 1 pote de 1/2kg y 1 pote de 1/4kg"
            };
            break;
        case 4:
            ObjectSection = {
                Peso: "2kg",
                Cantidad: cantidadHeladoSet.textContent,
                Precio: 6500,
                Promo: "2 potes de 1kg"
            };
            break;
    }

    
    arrayHelados.push(ObjectSection);

    let infoDePedidoHelado = "";
    for (let i = 0; i < arrayHelados.length; i++) {

        if (arrayHelados[i].Promo && arrayHelados[i].Cantidad > 0) {
            infoDePedidoHelado = "-" + arrayHelados[i].Cantidad + " promo/s de " + arrayHelados[i].Peso + " (" + arrayHelados[i].Promo + ")\n";
        } else {
            infoDePedidoHelado = "-" + arrayHelados[i].Cantidad + " potes de " + arrayHelados[i].Peso + "\n";
        }
        
    }

    return infoDePedidoHelado;
}
