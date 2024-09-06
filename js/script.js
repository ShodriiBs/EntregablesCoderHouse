const contenedorHelados = document.getElementById("contenedorHelados")
let compraDetalles = document.getElementById("detallesCompra")
let listaSaboresHelados = document.getElementById("listaSaboresHelados")
let arrayHelados = []

renderSabores()
renderHelados()

function renderSabores(){
    fetch("./db/sabores.json")
    .then(response => response.json())
    .then(data => {
        listaSaboresHelados.innerHTML = "";
        data.forEach(helado => {
            if (helado.disponible) {
                listaSaboresHelados.innerHTML += `<li>${helado.sabor}</li>`;
            }
        })     
    })
}

function renderHelados() {
    fetch("./db/helados.json")
        .then(response => response.json())
        .then(data => {
            try {
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
                        <div class="divBotonesUX" data-index="${index}">
                            <button class="botonAgregarCarrito" data-index="${index}">Añadir al carrito</button>
                        </div>
                    </section>`;
                });
                asignarEventos(data);
            } catch (error) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error al cargar los helados" + error,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        })
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
        });
    });
}

function agregarAlCarrito(helado, index) {
    try {
        const cantidadElement = document.querySelector(`.cantidadDeHelados[data-index="${index}"]`);
        const cantidad = parseInt(cantidadElement.innerText);

        if (cantidad > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Añadido al carrito",
                showConfirmButton: false,
                timer: 1500,
                width: 300,
            });

            arrayCreatePedido(helado, cantidad);

            let divContenedorSection = document.querySelector(`.divBotonesUX[data-index="${index}"]`);

            if (!divContenedorSection.querySelector(".buttonRemoverCarrito")) {
                const botonLimpiar = document.createElement('div');
                botonLimpiar.innerHTML = `<button class="buttonRemoverCarrito" id="botonRemover${index}">Remover del carrito</button>`;
                divContenedorSection.appendChild(botonLimpiar);

                const buttonElementRemoveInd = botonLimpiar.querySelector(`#botonRemover${index}`);
                buttonElementRemoveInd.addEventListener("click", () => clickButtonRemover(index, helado));
            }

            updateLocalStorage();

        } else {
            Swal.fire("Selecciona una cantidad mayor a 0");
        }
    } catch (error) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error al añadir el helado al carrito" + error,
            showConfirmButton: false,
            timer: 1500
        });
    } 
}

function clickButtonRemover(index, helado) {
    const cantidadElement = document.querySelector(`.cantidadDeHelados[data-index="${index}"]`);

    cantidadElement.innerText = 0
    arrayHelados = arrayHelados.filter(item => item.id !== helado.id);
    updateLocalStorage();
    const botonLimpiar = document.querySelector(`#botonRemover${index}`)
    botonLimpiar.remove()
}

function arrayCreatePedido(helado, heladoCant) {
    arrayHelados = arrayHelados.filter(item => item.id !== helado.id);

    arrayHelados.push({
        id: helado.id,
        Peso: helado.descripcion,
        Cantidad: heladoCant,
        Precio: helado.precio,
        Promo: helado.promo || null
    });

    let infoDePedidoHelado = "";
    if (helado.promo) {
        infoDePedidoHelado = ` ${helado.descripcion} - Cada promo contiene: ${helado.promo}\n`;
    } else {
        infoDePedidoHelado = ` pote/s de ${helado.descripcion}\n`;
    }

    return infoDePedidoHelado;
}

function updateLocalStorage() {
    localStorage.setItem("infoArrayHelados", JSON.stringify(arrayHelados));
}
