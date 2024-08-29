const helados = [
    {
        id: "heladoXCuarto",
        descripcion: "1/4kg de helado",
        precio: 1000,
        imgSrc: "https://saintmoritz.com.ar/wp-content/uploads/2020/08/helados-saint-mortiz-mediokg-1-1.png",
        cantidad: 0
    },
    {
        id: "heladoXMedio",
        descripcion: "1/2kg de helado",
        precio: 1800,
        imgSrc: "https://saintmoritz.com.ar/wp-content/uploads/2020/08/helados-saint-mortiz-mediokg-.png",
        cantidad: 0
    },
    {
        id: "heladoXKilo",
        descripcion: "1kg de helado",
        precio: 3500,
        imgSrc: "https://as1.ftcdn.net/v2/jpg/03/88/63/08/1000_F_388630882_V9W4Gj5KsLp5g7V1Z1uwr8JdP305yY6J.jpg",
        cantidad: 0
    },
    {
        id: "heladoPromo1",
        descripcion: "Promo 1",
        precio: 6000,
        imgSrc: "https://bluebell.com.ar/carta/wp-content/uploads/kilohelado.jpg",
        cantidad: 0,
        promo: "1 pote de 1kg, 1 pote de 1/2kg y 1 pote de 1/4kg"
    },
    {
        id: "heladoPromo2",
        descripcion: "Promo 2",
        precio: 6500,
        imgSrc: "https://saintmoritz.com.ar/wp-content/uploads/2020/09/promo-2-300x263.jpg",
        cantidad: 0,
        promo: "2 potes de 1kg"
    }
];

const contenedorHelados = document.getElementById("contenedorHelados");
let compraDetalles = document.getElementById("detallesCompra");
const botonesCompra = document.getElementById("botonesCompra");
let arrayHelados = [];

function renderHelados() {
    contenedorHelados.innerHTML = "";
    helados.forEach((helado, index) => {
        contenedorHelados.innerHTML += `
            <section id="${helado.id}" class="contenedorImagenHelados">
                <p class="informacionSectionHelado">${helado.descripcion} $${helado.precio}</p>
                <img src="${helado.imgSrc}" class="imagenHelados">
                <div class="cantidadSeleccionada">
                    <p>
                        <span class="cantidadHeladosSpan">Cantidad:</span>
                        <span class="cantidadDeHelados" data-index="${index}">${helado.cantidad}</span>
                        <button class="botonParaRestar" data-index="${index}">-</button>
                        <button class="botonParaSumar" data-index="${index}">+</button>
                    </p>
                </div>
                <div class="divBotonesUX">
                    <button class="botonAgregarCarrito" data-index="${index}">Añadir al carrito</button>
                </div>
            </section>
        `;
    });

    asignarEventos();
}

function asignarEventos() {
    const botonesRestar = document.querySelectorAll(".botonParaRestar");
    const botonesSumar = document.querySelectorAll(".botonParaSumar");
    const botonesAgregarCarrito = document.querySelectorAll(".botonAgregarCarrito");

    botonesRestar.forEach(boton => {
        boton.addEventListener("click", () => {
            const index = boton.getAttribute("data-index");
            if (helados[index].cantidad > 0) {
                helados[index].cantidad--;
                renderHelados();
            }
        });
    });

    botonesSumar.forEach(boton => {
        boton.addEventListener("click", () => {
            const index = boton.getAttribute("data-index");
            helados[index].cantidad++;
            renderHelados();
        });
    });

    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener("click", () => {
            const index = boton.getAttribute("data-index");
            agregarAlCarrito(helados[index], index);
            crearBotonesCarrito();
        });
    });
}

function agregarAlCarrito(helado, index) {
    if (helado.cantidad > 0) {
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
            pedidoLinea.innerHTML = `<span class="lineaPedidoInfo" data-id-helado="${helado.id}">${infoSection}</span>`;
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
    helados[index].cantidad = 0;
    renderHelados();
    limpiarDelCarrito(helados[index]);
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

    helados.forEach(helado => helado.cantidad = 0);
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

renderHelados();