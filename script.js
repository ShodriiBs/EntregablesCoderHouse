let ingresoConfirm = confirm("¡Bienvenid@ a la concesionaria Bustos!")
let arrayInfoAutos = []

if (!ingresoConfirm) {
    console.log("No quiso ser atendid@ jaja")
} else {
    while (ingresoConfirm) {
        const numMenu = menuPrincipal()
        console.log(numMenu)

        if (numMenu == 7) {
            salirConcesionaria()
            ingresoConfirm = false
        } else if (numMenu >= 1 && numMenu <= 6){
            const seguirComprando = confirm("¿Desea seguir viendo otros vehículos? \nAceptar = Sí \nCancelar = No")
            if (!seguirComprando) {
                salirConcesionaria()
                ingresoConfirm = false
            }
        }
    }
}

function menuPrincipal() { 
    const grupoAutos = parseInt(prompt("Seleccione qué marca de auto está interesad@: \n1- Volkswagen \n2- Peugeot \n3- Nissan \n4- Fiat \n5- Renault \n6- Audi \n7- Salir"))

    validarOpcionesMenuPrincipal(grupoAutos)

    return grupoAutos
}

function validarOpcionesMenuPrincipal(opcionSeleccionadaMenuPrincipal) { 
    const arrayAutosMarcas = ["Volkswagen", "Peugeot", "Nissan", "Fiat", "Renault", "Audi"]

    if (opcionSeleccionadaMenuPrincipal >= 1 && opcionSeleccionadaMenuPrincipal <= 6) {
        const autosDisponibles = confirm("Autos " + arrayAutosMarcas[opcionSeleccionadaMenuPrincipal - 1] + " disponibles: \n" + autosDisposicion(opcionSeleccionadaMenuPrincipal) + "\n¿Le interesa y/o desea ver la información de los autos mencionados?")
        if (autosDisponibles) {
            const continuarCompra = infoAutosDisponibles(arrayInfoAutos)
            if (continuarCompra) {
                adquirirAuto(arrayInfoAutos, arrayAutosMarcas[opcionSeleccionadaMenuPrincipal - 1])
            }
        } else {
            console.log(autosDisponibles)
        }
    } else if (opcionSeleccionadaMenuPrincipal == 7) {
        // Salir del menú
    } else {
        opcionNoValida()
    }
}

function opcionNoValida() { 
    alert("Por favor, seleccione una de las opciones ofrecidas")
    console.log("Se seleccionó opción fuera del menú")
}

function salirConcesionaria() { 
    alert("¡Muchas gracias! Vuelva pronto")
    console.log("Se cierran los cuadros de dialogos / termina visita a la concesionaria")
}

function infoAutosDisponibles(allInfoAutoMarca) { 
    let infoAuto = ""
    for (let i = 0; i < allInfoAutoMarca.length; i++) {
        infoAuto = infoAuto + "Modelo: " + allInfoAutoMarca[i].modelo + "\nValor USD: " + allInfoAutoMarca[i].precio + "\nAño: " + allInfoAutoMarca[i].año + "\nVersión: " + allInfoAutoMarca[i].version + "\nColor: " + allInfoAutoMarca[i].color + "\n-------------\n"
    }
    alert(infoAuto)
    const adquisicionAuto = confirm("¿Está interesad@ en adquirir alguno de estos vehículos? \nAceptar = Sí \nCancelar = No")
    return adquisicionAuto
}

function adquirirAuto(autoParaAdquirir, marcaAutoComprar) { 
    let adquirirAutoValor = ""
    for (let i = 0; i < autoParaAdquirir.length; i++) {
        adquirirAutoValor = adquirirAutoValor + (i + 1) + "- " + autoParaAdquirir[i].modelo + " - USD: " + autoParaAdquirir[i].precio + "\n"
    }

    const seleccionAuto = parseInt(prompt("Por favor, indique qué auto desea comprar: \n" + adquirirAutoValor + "4- Salir"))

    if (seleccionAuto == 1 || seleccionAuto == 2 || seleccionAuto == 3) {
        alert("¡Muchas gracias por confiar en nosotros! Y felicidades por su nuevo " + marcaAutoComprar + " " + autoParaAdquirir[seleccionAuto - 1].modelo)
    } else if (seleccionAuto == 4) {
        // Salir de la compra
    } else {
        opcionNoValida()
        adquirirAuto(autoParaAdquirir, marcaAutoComprar)
    }
}

function autosDisposicion(marcaDeAuto) { 
    switch (marcaDeAuto) {
        case 1:
            arrayInfoAutos = [
                { modelo: "Bora", precio: "9000", año: "2011", version: "Highline 1.8T", color: "Azul oscuro" },
                { modelo: "Vento", precio: "12500", año: "2013", version: "Sportline 2.0TSI", color: "Negro" },
                { modelo: "Passat", precio: "15000", año: "2020", version: "Highline", color: "Blanco" } ]
            break
        case 2:
            arrayInfoAutos = [
                { modelo: "208", precio: "11500", año: "2021", version: "Allure 1.6", color: "Azul" },
                { modelo: "307", precio: "6000", año: "2010", version: "XS 2.0", color: "Gris" },
                { modelo: "408", precio: "10000", año: "2017", version: "Feline 1.6", color: "Blanco" } ]
            break
        case 3:
            arrayInfoAutos = [
                { modelo: "Sentra", precio: "12000", año: "2018", version: "SR 1.8", color: "Plateado" },
                { modelo: "Versa", precio: "8000", año: "2016", version: "Sense 1.6", color: "Blanco" },
                { modelo: "Sentra", precio: "10500", año: "2021", version: "Sense 1.6", color: "Negro" } ]
            break
        case 4:
            arrayInfoAutos = [
                { modelo: "Cronos", precio: "13000", año: "2019", version: "Drive 1.3", color: "Rojo" },
                { modelo: "Punto", precio: "7000", año: "2014", version: "Attractive 1.4", color: "Azul" },
                { modelo: "Palio", precio: "5000", año: "2012", version: "ELX 1.3", color: "Verde" } ]
            break
        case 5:
            arrayInfoAutos = [
                { modelo: "Clio", precio: "4000", año: "2011", version: "Expression 1.2", color: "Negro" },
                { modelo: "Kangoo", precio: "6000", año: "2015", version: "Express 1.6", color: "Blanco" },
                { modelo: "Logan", precio: "9000", año: "2017", version: "Dynamique 1.6", color: "Gris" } ]
            break
        case 6:
            arrayInfoAutos = [
                { modelo: "A4", precio: "20000", año: "2019", version: "TFSI 2.0", color: "Negro" },
                { modelo: "A5", precio: "25000", año: "2020", version: "Sportback 2.0", color: "Rojo" },
                { modelo: "Q3", precio: "30000", año: "2021", version: "TFSI 1.4", color: "Blanco" } ]
            break
    }

    let modelosAutos = ""
    for (let i = 0; i < arrayInfoAutos.length; i++) {
        modelosAutos = modelosAutos + "- " + arrayInfoAutos[i].modelo + "\n"
    }

    return modelosAutos
}
