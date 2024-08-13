let infoDetallesPedido = document.getElementById("infoCarritoPedidoDetalles")

for(i=0; i<5;i++){
    obtieneStorage = localStorage.getItem("infoStoragePedido"+i)
    if(obtieneStorage == null){
        //que no haga nada
    }else{
        const detallesFinales = document.createElement("div")
        detallesFinales.innerHTML = `<p>${obtieneStorage}</p>`
        infoDetallesPedido.appendChild(detallesFinales)
    }
}