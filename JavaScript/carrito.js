const infoDetallesPedido = document.getElementById("infoCarritoPedidoDetalles");
const subtotalPedido = document.getElementById("subtotalDiv");
const dataJSON = document.getElementById("datosEnviadosJSON");
let infoJSONPedidoString = localStorage.getItem("infoArrayHelados");

infoJSONPedido = JSON.parse(infoJSONPedidoString);

for (let i = 0; i < infoJSONPedido.length; i++) {

    const detallesFinales = document.createElement("div");
    detallesFinales.innerHTML = `<p>-${infoJSONPedido[i].Cantidad} pote/s de ${infoJSONPedido[i].Peso} = ${infoJSONPedido[i].Cantidad} * ${infoJSONPedido[i].Precio}</p>`;
    infoDetallesPedido.appendChild(detallesFinales);
    
}

let totalPedido = 0; 

for (let i = 0; i < infoJSONPedido.length; i++) { 
    totalPedido += infoJSONPedido[i].Precio * infoJSONPedido[i].Cantidad 
}

subtotalPedido.innerText = `El total del pedido es: $${totalPedido}`;

dataJSON.innerText = `Detalles de tu factura (Información del localStorage): ${infoJSONPedidoString}`

infoJSONPedido.length = 0
localStorage.clear()
