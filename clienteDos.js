const inquirer = require('inquirer')

let opciones = [{
    name: "nombre",
    type: 'input',
    message: 'Ingresa tu nombre',
}, {
    name: "telefono",
    type: 'input',
    message: 'Ingresa tu numero de telefono',
},
{
    name: "gusto",
    type: 'rawlist',
    message: 'Elegi el gusto de la pizza',
    choices: ['Muzzarella', 'Jamon y Morron', 'Calabresa', '4 Quesos'],
}, {
    name: "tamanio",
    type: 'list',
    message: 'Elegi el tamaño de la pizza',
    choices: ['Personal', 'Mediana', 'Grande'],
}, {
    name: "con_bebida",
    type: 'confirm',
    default: false
}, {
    name: "bebida",
    type: 'list',
    message: 'Elegi la bebida',
    choices: ['Coca', 'Sprite', 'Fanta', 'Agua'],
    when: function (respuesta) {
        return respuesta.con_bebida
    }
}, {
    name: "gustos_de_empanadas",
    type: 'checkbox',
    message: 'Elegi los gustos de las empanadas',
    choices: ['Jamon y Queso', 'Cebolla y Queso', 'Caprese', 'Roquefort', 'Verdura', 'Humita'],
}, {
    name: "para_llevar",
    type: 'confirm',
    message: 'La pizza es para llevar ?',
    default: false
}, {
    name: "direccion",
    type: 'input',
    message: 'Ingresa tu direccion',
    when: function (respuestas) {
        return respuestas.para_llevar
    },
    validate: function (respuesta) {
        if (respuesta.length < 5) {
            return 'Dejanos saber tu direccion para enviarte la pizza'
        }
        return true
    }
}, {
    name: "cliente_habitual",
    type: 'confirm',
    default: false,
}]

let descuentosConBebida = (con_bebida, tamanio) => {
    let descuento = 0
    if (con_bebida && tamanio == 'Personal') {
        return descuento = 3;
    } else if (con_bebida && tamanio == 'Mediana') {
        return descuento = 5;
    } else if (con_bebida && tamanio == 'Grande') {
        return descuento = 8;
    } else {
        return descuento;
    }
}

let precio_pizza = (tamanio) => {
    switch (tamanio) {
        case 'Personal':
            return (430);
        case 'Mediana':
            return 560;
        case 'Grande':
            return 650;
    }
}

inquirer.prompt(opciones)
    .then(function (respuestas) {
        console.log(respuestas);
        console.log("===Resumen Pedido===");
        console.log("Tus datos son Nombre:" + respuestas.nombre + " " + "/ Teléfono:" + respuestas.telefono);

        let precio_delivery = 0;
        if (respuestas.para_llevar) {
            precio_delivery = 20;
            console.log("Tu pedido será entregado en:" + respuestas.direccion);

        } else {
            console.log("Nos indicaste que pasarás a retirar tu pedido");
        }

        console.log("=== Productos solicitados ===");

        console.log("Pizza:" + respuestas.gusto);
        console.log("Tamaño:" + respuestas.tamanio);

        if (respuestas.con_bebida) {
            console.log("Bebida:" + respuestas.bebida);
        }

        if (respuestas.cliente_habitual) {
            console.log("Tus tres empanadas de regalo serán de:");
            console.log("● Gusto empanada Jamon");
            console.log("● Gusto empanada 4 Quesos");
            console.log("● Gusto empanada Roquefort");
        }

        let precioPizzaCliente = precio_pizza(respuestas.tamanio);
        let descuento = descuentosConBebida(respuestas.con_bebida, respuestas.tamanio)

        let precio_bebida = 0
        if (respuestas.con_bebida) {
             precio_bebida = 80;
        };

        console.log("===============================");

        let totalProductos = precio_bebida + precioPizzaCliente;

        console.log("Total Productos:" + " " + totalProductos);
        console.log("Total Delivery:" + " " + precio_delivery);

        let totalDescuentos = ((descuento * (precio_bebida + precioPizzaCliente)) / 100);

        console.log("Descuentos: " + totalDescuentos);
        console.log("Total:" + " " + (totalProductos - totalDescuentos) + precio_delivery)

        console.log("===========================")

        console.log("Gracias por comprar en DH Pizzas. Esperamos que disfrutes tu pedido.")

    })