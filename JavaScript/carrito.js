const infoDetallesPedido = document.getElementById("infoCarritoPedidoDetalles");
const subtotalPedido = document.getElementById("subtotalDiv");
const elergirnos = document.getElementById("elegirNiceCream");
const buttonDatosPersonales = document.getElementById("envioDatosPersonales");
const inputTelefono = document.getElementById("inputTelefono");
const inputDireccion = document.getElementById("inputDirección");
const mensajeBotonClickeado = document.getElementById("buttonClickeadoInfo");
const dataJSON = document.getElementById("datosEnviadosJSON");
let infoJSONPedidoString = localStorage.getItem("infoArrayHelados");

let infoJSONPedido = JSON.parse(infoJSONPedidoString);

for (let i = 0; i < infoJSONPedido.length; i++) {

    if (infoJSONPedido[i].Promo && infoJSONPedido[i].Cantidad > 0) {

        const detallesFinales = document.createElement("div");
        detallesFinales.innerHTML = `<p>-${infoJSONPedido[i].Cantidad} promo/s de ${infoJSONPedido[i].Peso} = ${infoJSONPedido[i].Cantidad} * ${infoJSONPedido[i].Precio}</p>`;
        infoDetallesPedido.appendChild(detallesFinales);

    } else {

        const detallesFinales = document.createElement("div");
        detallesFinales.innerHTML = `<p>-${infoJSONPedido[i].Cantidad} pote/s de ${infoJSONPedido[i].Peso} = ${infoJSONPedido[i].Cantidad} * ${infoJSONPedido[i].Precio}</p>`;
        infoDetallesPedido.appendChild(detallesFinales);
    }

}

let totalPedido = 0; 

for (let i = 0; i < infoJSONPedido.length; i++) { 
    totalPedido += infoJSONPedido[i].Precio * infoJSONPedido[i].Cantidad 
}

const divElegirnos = document.createElement("h3")
divElegirnos.innerHTML = '¡Muchas gracias por elegir (N)ice Cream! Que tenga un excelente día :)'
elergirnos.appendChild(divElegirnos)

buttonDatosPersonales.addEventListener("click", ()=> {
    inputTelefono.value = ""
    inputDireccion.value = ""
    mensajeBotonClickeado.innerText = "Información enviada y recibida"
    inputTelefono.disabled = true
    inputDireccion.disabled = true
})


subtotalPedido.innerText = `El total del pedido es: $${totalPedido}`;

dataJSON.innerText = `Detalles de tu factura (Información del localStorage antes de ser limpiada): ${infoJSONPedidoString}`

infoJSONPedido.length = 0
localStorage.clear()
