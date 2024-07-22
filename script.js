var ingresoConfirm = confirm("¡Bienvenid@ a la concesionaria Bustos!")
var arrayInfoAutos = []

if (!ingresoConfirm) {
    console.log("No quiso ser atendid@ jaja")
} else {
    while (ingresoConfirm) {
        var numMenu = menuPrincipal()

        if (numMenu == 7) {
            ingresoConfirm = false
        } else {
            var seguirComprando = confirm("¿Desea seguir viendo otros vehículos? \nAceptar = Sí \nCancelar = No")
            if (!seguirComprando) {
                salirConcesionaria()
                ingresoConfirm = false
            }
        }
    }
}

function menuPrincipal() { //Menú principal de la concesionaria
    var grupoAutos = parseInt(prompt("Seleccione qué marca de auto está interesad@: \n1- Volkswagen \n2- Peugeot \n3- Nissan \n4- Fiat \n5- Renault \n6- Audi \n7- Salir"))

    validarOpcionesMenuPrincipal(grupoAutos)

    return grupoAutos
}

function validarOpcionesMenuPrincipal(opcionSeleccionadaMenuPrincipal) { //Valida opción escrita en menú principal
    var arrayAutosMarcas = ["Volkswagen", "Peugeot", "Nissan", "Fiat", "Renault", "Audi"]

    if (opcionSeleccionadaMenuPrincipal >= 1 && opcionSeleccionadaMenuPrincipal <= 6) {
        var autosDisponibles = confirm("Autos " + arrayAutosMarcas[opcionSeleccionadaMenuPrincipal - 1] + " disponibles: \n" + autosDisposicion(opcionSeleccionadaMenuPrincipal) + "\n¿Le interesa y/o desea ver la información de los autos mencionados?")
        if (autosDisponibles) {
            var continuarCompra = infoAutosDisponibles(arrayInfoAutos)
            if (continuarCompra) {
                adquirirAuto(arrayInfoAutos, arrayAutosMarcas[opcionSeleccionadaMenuPrincipal - 1])
            }
        } else {
            console.log(autosDisponibles)
            alert("Redirigiendo al menú principal")
            menuPrincipal()
        }
    } else if (opcionSeleccionadaMenuPrincipal == 7) {
        salirConcesionaria()
    } else {
        opcionNoValida()
        menuPrincipal()
    }
}

function opcionNoValida() { //Para cuando se escriba una opcion fuera del menú
    alert("Por favor, seleccione una de las opciones ofrecidas")
    console.log("Se seleccionó opción fuera del menú")
}

function salirConcesionaria() { //Salir 
    alert("¡Muchas gracias! Vuelva pronto")
    console.log("Se cierran los cuadros de dialogos / termina visita a la concesionaria")
}

function infoAutosDisponibles(allInfoAutoMarca) { //Info de los autos según marca
    var infoAuto = ""
    for (var i = 0; i < allInfoAutoMarca.length; i++) {
        infoAuto += "Modelo: " + allInfoAutoMarca[i][0] + "\nValor USD: " + allInfoAutoMarca[i][1] + "\nAño: " + allInfoAutoMarca[i][2] + "\nVersión: " + allInfoAutoMarca[i][3] + "\nColor: " + allInfoAutoMarca[i][4] + "\n-------------\n"
    }
    alert(infoAuto)
    var adquisicionAuto = confirm("¿Está interesad@ en adquirir alguno de estos vehículos? \nAceptar = Sí \nCancelar = No")
    return adquisicionAuto
}

function adquirirAuto(autoParaAdquirir, marcaAutoComprar) { //Menu para comprar autos según marca
    var adquirirAutoValor = ""
    for (var i = 0; i < autoParaAdquirir.length; i++) {
        adquirirAutoValor += (i + 1) + "- " + autoParaAdquirir[i][0] + " - USD: " + autoParaAdquirir[i][1] + "\n"
    }

    var seleccionAuto = parseInt(prompt("Por favor, indique qué auto desea comprar: \n" + adquirirAutoValor + "4- Salir al menú principal"))

    if (seleccionAuto == 1 || seleccionAuto == 2 || seleccionAuto == 3) {
        alert("¡Muchas gracias por confiar en nosotros! Y felicidades por su nuevo " + marcaAutoComprar + " " + autoParaAdquirir[seleccionAuto - 1][0])
    } else if (seleccionAuto == 4) {
        menuPrincipal()
    } else {
        opcionNoValida()
        adquirirAuto(autoParaAdquirir, marcaAutoComprar)
    }
}

function autosDisposicion(marcaDeAuto) { //Todos los autos disponibles de la concesionaria
    var allAutos = []

    switch (marcaDeAuto) {
        case 1:
            allAutos = ["Bora", "Vento", "Passat"];
            arrayInfoAutos = [
                ["Bora", "9000", "2011", "Highline 1.8T", "Azul oscuro"],
                ["Vento", "12500", "2013", "Sportline 2.0TSI", "Negro"],
                ["Passat", "15000", "2020", "Highline", "Blanco"]
            ]
            break;
        case 2:
            allAutos = ["208", "307", "408"]
            arrayInfoAutos = [
                ["208", "11500", "2021", "Allure 1.6", "Azul"],
                ["307", "6000", "2010", "XS 2.0", "Gris"],
                ["408", "10000", "2017", "Feline 1.6", "Blanco"]
            ]
            break;
        case 3:
            allAutos = ["Sentra", "Versa", "Sentra"]
            arrayInfoAutos = [
                ["Sentra", "12000", "2018", "SR 1.8", "Plateado"],
                ["Versa", "8000", "2016", "Sense 1.6", "Blanco"],
                ["Sentra", "10500", "2021", "Sense 1.6", "Negro"]
            ]
            break;
        case 4:
            allAutos = ["Cronos", "Punto", "Palio"]
            arrayInfoAutos = [
                ["Cronos", "13000", "2019", "Drive 1.3", "Rojo"],
                ["Punto", "7000", "2014", "Attractive 1.4", "Azul"],
                ["Palio", "5000", "2012", "ELX 1.3", "Verde"]
            ]
            break;
        case 5:
            allAutos = ["Clio", "Kangoo", "Logan"]
            arrayInfoAutos = [
                ["Clio", "4000", "2011", "Expression 1.2", "Negro"],
                ["Kangoo", "6000", "2015", "Express 1.6", "Blanco"],
                ["Logan", "9000", "2017", "Dynamique 1.6", "Gris"]
            ]
            break;
        case 6:
            allAutos = ["A4", "A5", "Q3"]
            arrayInfoAutos = [
                ["A4", "20000", "2019", "TFSI 2.0", "Negro"],
                ["A5", "25000", "2020", "Sportback 2.0", "Rojo"],
                ["Q3", "30000", "2021", "TFSI 1.4", "Blanco"]
            ]
            break;
    }

    return allAutos.join(" - ");
}