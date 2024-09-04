const buttonCarrito = document.getElementById("buttonCarrito")

buttonCarrito.addEventListener("click", carritoDetails)

function carritoDetails(){
    let infoCarrito = localStorage.getItem("infoArrayHelados")

    if(infoCarrito && infoCarrito !== "[]"){
        
        infoCarrito = JSON.parse(infoCarrito)
        let fullPedido = ""

        infoCarrito.forEach(cadaPedido => {
            fullPedido = fullPedido + `(${cadaPedido.Cantidad}) ${cadaPedido.Peso} \n`
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

                    confirmPostOperation()

                } else if (result.isDenied) {
                    Swal.fire(
                        "Carrito vacío",
                        "Se vació el carrito con éxito",
                        "info"
                    )
                    
                    VaciarCarritoPostOperation()
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

function confirmPostOperation(){
    const botonesRemover = document.querySelectorAll(".buttonRemoverCarrito");
    botonesRemover.forEach((boton) => boton.remove())

    const botonesAñadirCarrito = document.querySelectorAll(".botonAgregarCarrito");
    botonesAñadirCarrito.forEach(boton => {
        boton.disabled = true
        boton.style.display = "none"
    })

    const botonesRestar = document.querySelectorAll(".botonParaRestar");
    botonesRestar.forEach((boton) => boton.disabled = true)

    const botonesSumar = document.querySelectorAll(".botonParaSumar");
    botonesSumar.forEach((boton) => boton.disabled = true)

    const buttonCarritoHeader = document.getElementById("buttonCarrito")
    buttonCarritoHeader.disabled = true
}

function VaciarCarritoPostOperation(){
    const botonesRemover = document.querySelectorAll(".buttonRemoverCarrito");
    botonesRemover.forEach((boton) => boton.remove())

    const cantidadElement = document.querySelectorAll(`.cantidadDeHelados`);
    cantidadElement.forEach((cantidad) => {
        cantidad.innerText = 0
    })

    localStorage.clear()

}

function confirmarPedido() {
    const resumenPedido = document.getElementById("resumenPedido");
    resumenPedido.innerHTML = '';

    const datosCarrito = localStorage.getItem("infoArrayHelados");
    if (!datosCarrito) {
        resumenPedido.innerHTML = "<p>No hay artículos en el carrito para confirmar.</p>";
        return;
    }

    arrayHelados = JSON.parse(datosCarrito);

    if (arrayHelados.length === 0) {
        resumenPedido.innerHTML = "<p>No hay artículos en el carrito para confirmar.</p>";
        return;
    }

    const finalizarCompraDiv = document.getElementById("FinalizarCompra");
    finalizarCompraDiv.innerHTML = '';

    const NameInput = `
        <p>Por favor, complete los siguientes datos</p>
        <div>
            <label for="NombreCompleto">Nombre completo:</label>
            <input type="text" id="NombreCompleto" name="NombreCompleto" required>
        </div><br>`;
    const direccionInput = `
        <div>
            <label for="direccionHogar">Dirección hogar:</label>
            <input type="text" id="direccionHogar" name="direccionHogar" required>
        </div><br>`;
    const telefonoInput = `
        <div>
            <label for="telefono">Teléfono:</label>
            <input type="tel" id="telefono" name="telefono" required>
        </div><br>`;
    const botonFinalizar = `<button id="botonFinalizarCompra">Finalizar compra</button>`;

    finalizarCompraDiv.innerHTML = NameInput + direccionInput + telefonoInput + botonFinalizar;

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
