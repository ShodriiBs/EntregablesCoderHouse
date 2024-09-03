const buttonCarrito = document.getElementById("buttonCarrito")

buttonCarrito.addEventListener("click", carritoDetails)

function carritoDetails(){
    let infoCarrito = localStorage.getItem("infoArrayHelados")

    if(infoCarrito != null){
        infoCarrito = JSON.parse(infoCarrito)
        infoCarrito.forEach(cadaPedido => {
            Swal.fire({
                title: "¡Tu Pedido!",
                text: `(${cadaPedido.Cantidad}) ${cadaPedido.Peso}`,
                icon: "info",
                position: "top-end",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirmar pedido",
                cancelButtonText: "Volver atrás"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "¡Confirmado!",
                        text: "Consultá el resumen y completá tus datos :)",
                        icon: "success"
                    });
                }
            });
        })
    }else{
        Swal.fire({
            position: "top-end",
            icon: "info",
            title: "No se agregaron productos al carrito",
            showConfirmButton: false,
            timer: 2000
          });
    }
}