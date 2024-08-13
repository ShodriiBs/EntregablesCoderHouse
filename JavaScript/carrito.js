const infoDetallesPedido = document.getElementById("infoCarritoPedidoDetalles")
const subtotalPedido = document.getElementById("subtotalDiv")

for(i=0; i<5;i++){
    obtieneStorage = localStorage.getItem("infoStoragePedido"+i)
    totalCompra = localStorage.getItem("subtotalHelados")
    if(obtieneStorage == null){
        //que no haga nada
    }else{
        const detallesFinales = document.createElement("div")
        detallesFinales.innerHTML = `<p>${obtieneStorage}</p>`
        infoDetallesPedido.appendChild(detallesFinales)
    }
}

subtotalPedido.innerText = `El total del pedido es de $${totalCompra}`

localStorage.clear()
