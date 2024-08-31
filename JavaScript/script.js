const contenedorHelados = document.getElementById("contenedorHelados");
let compraDetalles = document.getElementById("detallesCompra");
const botonesCompra = document.getElementById("botonesCompra");
let arrayHelados = [];

renderHelados();

function renderHelados(){
    fetch("./JSON/helados.json")
        .then(response => response.json())
        .then(data => {
            contenedorHelados.innerHTML = "";
            data.forEach((helado, index) => {
                contenedorHelados.innerHTML += `
                    <section id="${helado.id}" class="contenedorImagenHelados">
                        <p class="informacionSectionHelado">${helado.descripcion} $${helado.precio}</p>
                        <img src="${helado.imgSrc}" class="imagenHelados">
                        <div class="cantidadSeleccionada">
                            <p>
                                <span class="cantidadHeladosSpan">Cantidad:</span>
                                <span class="cantidadDeHelados" data-index="${index}">0</span>
                                <button class="botonParaRestar" data-index="${index}">-</button>
                                <button class="botonParaSumar" data-index="${index}">+</button>
                            </p>
                        </div>
                        <div class="divBotonesUX">
                            <button class="botonAgregarCarrito" data-index="${index}">Añadir al carrito</button>
                        </div>
                    </section>`;
            });

            asignarEventos(data);
        });
}

function asignarEventos(data) {
    const botonesRestar = document.querySelectorAll(".botonParaRestar");
    const botonesSumar = document.querySelectorAll(".botonParaSumar");
    const botonesAgregarCarrito = document.querySelectorAll(".botonAgregarCarrito");
    const cantidadHeladoValue = document.querySelectorAll(".cantidadDeHelados");

    botonesRestar.forEach(boton => {
        boton.addEventListener("click", () => {
            const index = boton.getAttribute("data-index");
            let cantidadActual = parseInt(cantidadHeladoValue[index].innerText);
            if (cantidadActual > 0) {
                cantidadHeladoValue[index].innerText = --cantidadActual;
            }
        });
    });

    botonesSumar.forEach(boton => {
        boton.addEventListener("click", () => {
            const index = boton.getAttribute("data-index");
            let cantidadActual = parseInt(cantidadHeladoValue[index].innerText);
            cantidadHeladoValue[index].innerText = ++cantidadActual;
        });
    });

    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener("click", () => {
            const index = boton.getAttribute("data-index");
            agregarAlCarrito(data[index], index);
            crearBotonesCarrito();
        });
    });
}

function agregarAlCarrito(helado, index) {
    const cantidadElement = document.querySelector(`.cantidadDeHelados[data-index="${index}"]`);
    const cantidad = parseInt(cantidadElement.innerText);

    if (cantidad > 0) {
        helado.cantidad = cantidad;
        const cantidadExistente = compraDetalles.querySelectorAll(".lineaPedidoInfo");
        let elementoExistente = null;

        cantidadExistente.forEach(elemento => {
            if (elemento.dataset.idHelado === helado.id) {
                elementoExistente = elemento;
            }
        });

        if (elementoExistente) {
            const nuevaInfo = arrayCreatePedido(helado);
            elementoExistente.innerHTML = nuevaInfo;
        } else {
            const infoSection = arrayCreatePedido(helado);
            const pedidoLinea = document.createElement("div");
            pedidoLinea.classList.add("lineaPedidoInfo");
            pedidoLinea.setAttribute("data-id-helado", helado.id);
            pedidoLinea.innerHTML = infoSection;
            compraDetalles.appendChild(pedidoLinea);
        }

        const seccionHelado = document.getElementById(helado.id);
        const divBotonesUX = seccionHelado.querySelector('.divBotonesUX');
        if (!divBotonesUX.querySelector('.botonLimpiarPedido')) {
            const botonLimpiar = document.createElement('button');
            botonLimpiar.className = 'botonLimpiarPedido';
            botonLimpiar.innerText = 'Limpiar pedido';
            botonLimpiar.addEventListener('click', () => limpiarPedido(index));
            divBotonesUX.appendChild(botonLimpiar);
        }

        updateLocalStorage();
    }
}

function limpiarPedido(index) {
    const helado = arrayHelados.find(item => item.id === helado[index].id);
    if (helado) {
        helado.cantidad = 0;
        renderHelados();
        limpiarDelCarrito(helado);
    }
}

function limpiarDelCarrito(helado) {
    const elementosExistentes = compraDetalles.querySelectorAll(".lineaPedidoInfo");
    elementosExistentes.forEach(elemento => {
        if (elemento.dataset.idHelado === helado.id) {
            elemento.remove();
        }
    });
    arrayHelados = arrayHelados.filter(item => item.id !== helado.id);
    updateLocalStorage();
}

function crearBotonesCarrito() {
    if (!document.getElementById("botonRemoveAll")) {
        const botonBorrar = document.createElement('button');
        botonBorrar.id = "botonRemoveAll";
        botonBorrar.innerText = "Vaciar carrito";
        botonBorrar.addEventListener('click', buttonRemove);
        botonesCompra.appendChild(botonBorrar);
    }
    
    if (!document.getElementById("botonConfirmarPedido")) {
        const botonConfirmar = document.createElement('button');
        botonConfirmar.id = "botonConfirmarPedido";
        botonConfirmar.innerText = 'Confirmar pedido';
        botonConfirmar.addEventListener('click', confirmarPedido);
        botonesCompra.appendChild(botonConfirmar);
    }
}

function buttonRemove() {
    arrayHelados.forEach(helado => helado.cantidad = 0);
    renderHelados();

    compraDetalles.innerHTML = '';
    localStorage.clear();
    arrayHelados.length = 0;

    const botonBorrar = document.getElementById("botonRemoveAll");
    if (botonBorrar) {
        botonBorrar.remove();
    }

    const botonConfirmar = document.getElementById("botonConfirmarPedido");
    if (botonConfirmar) {
        botonConfirmar.remove();
    }

    const resumenPedido = document.getElementById("resumenPedido");
    if (resumenPedido) {
        resumenPedido.innerHTML = '';
    }

    const finalizarCompraDiv = document.getElementById("FinalizarCompra");
    if (finalizarCompraDiv) {
        finalizarCompraDiv.innerHTML = '';
    }
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

function arrayCreatePedido(helado) {
    arrayHelados = arrayHelados.filter(item => item.id !== helado.id);

    arrayHelados.push({
        id: helado.id,
        Peso: helado.descripcion,
        Cantidad: helado.cantidad,
        Precio: helado.precio,
        Promo: helado.promo || null
    });

    let infoDePedidoHelado = "";
    if (helado.promo) {
        infoDePedidoHelado = `-${helado.cantidad} promo/s de ${helado.descripcion} (${helado.promo})\n`;
    } else {
        infoDePedidoHelado = `-${helado.cantidad} pote/s de ${helado.descripcion}\n`;
    }

    return infoDePedidoHelado;
}

function updateLocalStorage() {
    localStorage.setItem("infoArrayHelados", JSON.stringify(arrayHelados));
}
