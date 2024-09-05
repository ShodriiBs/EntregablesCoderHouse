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

                    confirmPostOperation(fullPedido)

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

function confirmPostOperation(fullPedido) {
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

    const resumenPedido = document.getElementById("divIngresarDatos")
    const finalizarCompraDiv = document.getElementById("FinalizarCompra")

    resumenPedido.innerHTML = `
        <button id="revisarPedidoButton">Revisar Pedido</button>
        <button id="rehacerPedidoButton">Rehacer Pedido</button>
        <button id="modificarPedidoButton">Modificar Pedido</button>`

    const infoPedidoFinal = `
        <div id="containerDatosFinalesPedido">
            <div>
                <span>Nombre completo:</span>
                <input type="text" id="NombreCompleto" name="NombreCompleto" required>
            </div><br>
            <div>
                <span>Dirección hogar:</span>
                <input type="text" id="direccionHogar" name="direccionHogar" required>
            </div><br>
            <div>
                <span>Teléfono:</span>
                <input type="tel" id="telefono" name="telefono" required>
            </div><br>
        </div>`

    const botonFinalizar = `<button id="botonFinalizarCompra">Finalizar compra</button>`
    finalizarCompraDiv.innerHTML = infoPedidoFinal + botonFinalizar

    const buttonRevisarPedido = document.getElementById("revisarPedidoButton")
    buttonRevisarPedido.addEventListener("click", () => revisarPedidoBotonClick(fullPedido))

    const buttonRehacerPedido = document.getElementById("rehacerPedidoButton")
    buttonRehacerPedido.addEventListener("click", () => rehacerPedidoBotonClick(resumenPedido, finalizarCompraDiv))

    const buttonModificarPedido = document.getElementById("modificarPedidoButton")
    buttonModificarPedido.addEventListener("click", () => modificarPedidoBotonClick())
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

function rehacerPedidoBotonClick(resumenPedido, finalizarCompraDiv){

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

    resumenPedido.innerHTML = ""
    finalizarCompraDiv.innerHTML = ""
    arrayHelados.length = 0
    localStorage.clear()
}

function modificarPedidoBotonClick() {
    const divContenedoresSection = document.querySelectorAll('.divBotonesUX');

    divContenedoresSection.forEach((divContenedorSection, index) => {
        if (!divContenedorSection.querySelector(".buttonUpdateCarrito")) {
            const botonUpdate = document.createElement('div');
            botonUpdate.innerHTML = `<button class="buttonUpdateCarrito" id="botonUpdate${index}">Actualizar Carrito</button>`;
            divContenedorSection.appendChild(botonUpdate);

            const buttonUpdateCarrito = document.getElementById(`botonUpdate${index}`)
            buttonUpdateCarrito.addEventListener("click", () => actualizarCarrito(index))
        }
    });
}

function confirmarPedido() {

    document.getElementById("botonFinalizarCompra").addEventListener('click', () => {
        const nombre = document.getElementById("NombreCompleto").value;
        const direccion = document.getElementById("direccionHogar").value;
        const telefono = document.getElementById("telefono").value;
        
        if (nombre && direccion && telefono) {
            finalizarCompraDiv.innerHTML = `<p>Compra finalizada! En breves instantes nos estaremos comunicando con usted, muchas gracias por elegir (N)ice Cream :)</p>`;

            let contenido = '<h2>Resumen del Pedido</h2>';
            arrayHelados.forEach(helado => {
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

            const total = arrayHelados.reduce((sum, helado) => sum + (helado.Precio * helado.Cantidad), 0);
            contenido += `<h3>Total: $${total}</h3>`;
            resumenPedido.innerHTML = contenido;

            localStorage.clear();
            arrayHelados.length = 0;

            const botonHacerOtroPedido = `<button id="botonHacerOtroPedido">Hacer otro pedido</button>`;
            finalizarCompraDiv.innerHTML += botonHacerOtroPedido;

            document.getElementById("botonHacerOtroPedido").addEventListener('click', () => {
                buttonRemove(); 
                resumenPedido.innerHTML = ''; 
                finalizarCompraDiv.innerHTML = '';
            });
        } else {
            finalizarCompraDiv.innerHTML += '<p>Por favor, complete todos los campos.</p>';
        }
    });
}
