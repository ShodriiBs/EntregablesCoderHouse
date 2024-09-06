const buttonCarrito = document.getElementById("buttonCarrito")

buttonCarrito.addEventListener("click", carritoDetails)

function carritoDetails(){
    let infoCarrito = localStorage.getItem("infoArrayHelados")
    let fullPedido = ""
    
    if(infoCarrito && infoCarrito !== "[]"){
        
        infoCarrito = JSON.parse(infoCarrito)

        infoCarrito.forEach(cadaPedido => {
            fullPedido += `(${cadaPedido.Cantidad}) ${cadaPedido.Peso}\n`;
        });

        Swal.fire({
            title: "Tu Carrito :)\n\n" + fullPedido,
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText: "Volver Atrás",
            confirmButtonText: "Confirmar Carrito",
            denyButtonText: `Vaciar Carrito`,
            position: "top-end"
            }).then((result) => {
                
                if (result.isConfirmed) {
                    Swal.fire(
                        "¡Confirmado!",
                        "Por favor, completá con tu información personal para finalizar la operación de compra",
                        "success"
                    )

                    confirmPostOperation(fullPedido, infoCarrito)

                } else if (result.isDenied) {
                    Swal.fire(
                        "Carrito vacío",
                        "Se vació el carrito con éxito",
                        "info"
                    )
                    VaciarCarritoPostOperation()
                }
            });

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

function confirmPostOperation(fullPedido, infoCarrito) {
    const botonesRemover = document.querySelectorAll(".buttonRemoverCarrito");
    botonesRemover.forEach((boton) => boton.remove());

    const botonesAñadirCarrito = document.querySelectorAll(".botonAgregarCarrito");
    botonesAñadirCarrito.forEach(boton => {
        boton.disabled = true;
        boton.style.display = "none";
    });

    const botonesRestar = document.querySelectorAll(".botonParaRestar")
    botonesRestar.forEach((boton) => boton.disabled = true)

    const botonesSumar = document.querySelectorAll(".botonParaSumar")
    botonesSumar.forEach((boton) => boton.disabled = true)

    const buttonCarritoHeader = document.getElementById("buttonCarrito")
    buttonCarritoHeader.disabled = true

    const divIngresarDatos = document.getElementById("divIngresarDatos")
    const finalizarCompraDiv = document.getElementById("FinalizarCompra")

    divIngresarDatos.innerHTML = `
        <button id="revisarPedidoButton">Revisar Pedido</button>
        <button id="rehacerPedidoButton">Rehacer Pedido</button>`

    const infoPedidoFinal = `
        <div id="containerDatosFinalesPedido">
            <p id="labelFinalPedido">Una vez que completes con tus datos, nos estaremos comunicando cuanto antes para llevarte tu pedido :)</p>
            <div id="divCentrarInputs">
                <div class="inputsCompletar">
                    <span>Nombre completo</span><br>
                    <input type="text" id="NombreCompleto" name="NombreCompleto" required>
                </div><br>
                <div class="inputsCompletar">
                    <span>Dirección hogar</span><br>
                    <input type="text" id="direccionHogar" name="direccionHogar" required>
                </div><br>
                <div class="inputsCompletar">
                    <span>Correo electrónico</span><br>
                    <input type="email" id="emailInput" name="emailInput" required>
                </div><br>
                <div class="inputsCompletar">
                    <span>Teléfono</span><br>
                    <input type="number" id="telefono" name="telefono" required>
                </div><br>
                <div class="inputsCompletar">
                    <span>Nro de tarjeta</span><br>
                    <input type="number" id="nroTarjeta" name="nroTarjeta" required>
                </div><br>                
            </div>
        </div>`

    const botonFinalizar = `<button id="botonFinalizarCompra">Finalizar compra</button><br>`
    finalizarCompraDiv.innerHTML = infoPedidoFinal + botonFinalizar

    const buttonRevisarPedido = document.getElementById("revisarPedidoButton")
    buttonRevisarPedido.addEventListener("click", () => revisarPedidoBotonClick(fullPedido))

    const buttonRehacerPedido = document.getElementById("rehacerPedidoButton")
    buttonRehacerPedido.addEventListener("click", () => rehacerPedidoBotonClick(divIngresarDatos, finalizarCompraDiv))

    const buttonFinalizarPedido = document.getElementById("botonFinalizarCompra")
    buttonFinalizarPedido.addEventListener("click", () => finalizarPedidoBotonClick(divIngresarDatos, finalizarCompraDiv, infoCarrito))
}

function VaciarCarritoPostOperation(){
    const botonesRemover = document.querySelectorAll(".buttonRemoverCarrito");
    botonesRemover.forEach((boton) => boton.remove())

    const cantidadElement = document.querySelectorAll(`.cantidadDeHelados`);
    cantidadElement.forEach((cantidad) => {
        cantidad.innerText = 0
    })

    arrayHelados.length = 0
    localStorage.clear()

}

function revisarPedidoBotonClick(fullPedido){
    Swal.fire("Tu pedido \n\n" + fullPedido)
}

function rehacerPedidoBotonClick(divIngresarDatos, finalizarCompraDiv){

    Swal.fire({
        title: "Seguro que quieres rehacer el pedido?",
        text: "Tendrás que hacerlo nuevamente desde cero",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, estoy segur@",
        cancelButtonText: "Volver atrás"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Carrito vacío",
            text: "A llenarlo nuevamente",
            icon: "success"
          });

          const botonesAñadirCarrito = document.querySelectorAll(".botonAgregarCarrito");
          botonesAñadirCarrito.forEach(boton => {
              boton.disabled = false;
              boton.style.display = "block";
          });
      
          const botonesRestar = document.querySelectorAll(".botonParaRestar")
          botonesRestar.forEach((boton) => boton.disabled = false)
      
          const botonesSumar = document.querySelectorAll(".botonParaSumar")
          botonesSumar.forEach((boton) => boton.disabled = false)
      
          const buttonCarritoHeader = document.getElementById("buttonCarrito")
          buttonCarritoHeader.disabled = false
      
          const cantidadElement = document.querySelectorAll(`.cantidadDeHelados`);
          cantidadElement.forEach((cantidad) => {
              cantidad.innerText = 0
          })
      
          divIngresarDatos.innerHTML = ""
          finalizarCompraDiv.innerHTML = ""
          arrayHelados.length = 0
          localStorage.clear()
        }
      });
}

function finalizarPedidoBotonClick(divIngresarDatos, finalizarCompraDiv, infoCarrito) {
    const nombreCompleto = document.getElementById("NombreCompleto").value
    const direccionHogar = document.getElementById("direccionHogar").value
    const emailInput = document.getElementById("emailInput").value
    const telefono = document.getElementById("telefono").value
    const nroTarjeta = document.getElementById("nroTarjeta").value
    const ResumenCompra = document.getElementById("ResumenCompra")

    if (!nombreCompleto || !direccionHogar || !emailInput || !telefono || !nroTarjeta) {
        Swal.fire({
            icon: "error",
            title: "Campos incompletos",
            text: "Por favor, complete todos los campos para finalizar el pedido.",
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "Pedido Finalizado",
            text: "¡Muchas gracias por tu compra y por elegirnos! Te dejamos el detalle de la operación. Que tengas un lindo día",
        });
        
        let contenido = '<h2>Resumen del Pedido</h2>';
        infoCarrito.forEach(helado => {
            contenido += `
                <div class="pedido-item">
                    <p><strong>${helado.Peso}</strong></p>
                    <p>Cantidad: ${helado.Cantidad}</p>
                    <p>Precio por unidad: $${helado.Precio}</p>
                    ${helado.Promo ? `<p>Promo: ${helado.Promo}</p>` : ''}
                    <hr>
                </div>
            `;
        });

        const total = infoCarrito.reduce((sum, helado) => sum + (helado.Precio * helado.Cantidad), 0);
        contenido += `<h3>Total: $${total}</h3>`;
        ResumenCompra.innerHTML = `<p>Muchas gracias ${nombreCompleto}, aquí tu factura</p>
        <p>Dirección: ${direccionHogar}</p>
        <p>Correo electrónico: ${emailInput}</p>
        <p>Teléfono: ${telefono}</p>` + contenido;

        localStorage.clear();
        infoCarrito.length = 0;

        const botonHacerOtroPedido = `<button id="botonRealizarOtraCompra">Realizar otra compra</button><br>`
        ResumenCompra.innerHTML += botonHacerOtroPedido
        divIngresarDatos.innerHTML = ""
        finalizarCompraDiv.innerHTML = ""

        document.getElementById("botonRealizarOtraCompra").addEventListener('click', () => iniciarNuevoPedido(divIngresarDatos, finalizarCompraDiv, ResumenCompra))

    }
}

function iniciarNuevoPedido(divIngresarDatos, finalizarCompraDiv, ResumenCompra){

    const botonesAñadirCarrito = document.querySelectorAll(".botonAgregarCarrito");
    botonesAñadirCarrito.forEach(boton => {
        boton.disabled = false;
        boton.style.display = "block";
    });
      
    const botonesRestar = document.querySelectorAll(".botonParaRestar")
    botonesRestar.forEach((boton) => boton.disabled = false)
      
    const botonesSumar = document.querySelectorAll(".botonParaSumar")
    botonesSumar.forEach((boton) => boton.disabled = false)
      
    const buttonCarritoHeader = document.getElementById("buttonCarrito")
    buttonCarritoHeader.disabled = false
      
    const cantidadElement = document.querySelectorAll(`.cantidadDeHelados`);
    cantidadElement.forEach((cantidad) => {
        cantidad.innerText = 0
    })
      
    divIngresarDatos.innerHTML = ""
    finalizarCompraDiv.innerHTML = ""
    arrayHelados.length = 0
    localStorage.clear()
    ResumenCompra.innerHTML = "";

    Swal.fire("¡Ya podés seguir comprando!")
}