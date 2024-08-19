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


infoJSONPedido.forEach(item => {
    const detallesFinales = document.createElement("div");
    if (item.Promo && item.Cantidad > 0) {
        detallesFinales.innerHTML = `<p>-${item.Cantidad} promo/s de ${item.Peso} = ${item.Cantidad} * ${item.Precio}</p>`;
    } else {
        detallesFinales.innerHTML = `<p>-${item.Cantidad} pote/s de ${item.Peso} = ${item.Cantidad} * ${item.Precio}</p>`;
    }
    infoDetallesPedido.appendChild(detallesFinales);
});


let totalPedido = infoJSONPedido.reduce((total, item) => {
    return total + (item.Precio * item.Cantidad);
}, 0);

subtotalPedido.innerText = `El total del pedido es de: $${totalPedido}`;

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

dataJSON.innerText = `Detalles de tu factura (Información del localStorage antes de ser limpiada): ${infoJSONPedidoString}`

infoJSONPedido.length = 0
localStorage.clear()
