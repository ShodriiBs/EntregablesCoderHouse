const infoDetallesPedido = document.getElementById("infoCarritoPedidoDetalles");
const subtotalPedido = document.getElementById("subtotalDiv");
let infoJSONPedido = localStorage.getItem("infoArrayHelados");
infoJSONPedido = JSON.parse(infoJSONPedido);

for (let i = 0; i < 5; i++) {
    let obtieneStorage = localStorage.getItem("infoStoragePedido" + i);
    if (obtieneStorage !== null) {
        const detallesFinales = document.createElement("div");
        detallesFinales.innerHTML = `<p>${obtieneStorage}</p>`;
        infoDetallesPedido.appendChild(detallesFinales);
    }
}

let totalPedido = 0; 

for (let i = 0; i < infoJSONPedido.length; i++) { 
    totalPedido += infoJSONPedido[i].Precio * infoJSONPedido[i].Cantidad; 
}

subtotalPedido.innerText = `El total del pedido es: $${totalPedido}`;
totalPedido = 0

localStorage.clear()
