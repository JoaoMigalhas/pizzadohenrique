"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var rs = require("readline-sync");
var cardapio = [
    {
        nome: '1 - Margherita',
        ingredientes: ['molho de tomate', 'muçarela', 'manjericão'],
        preco: 25.00,
    },
    {
        nome: '2 - Calabresa',
        ingredientes: ['molho de tomate', 'muçarela', 'calabresa', 'cebola'],
        preco: 30.00,
    },
    {
        nome: '3 - Quatro Queijos',
        ingredientes: ['muçarela', 'gorgonzola', 'parmesão', 'provolone'],
        preco: 35.00,
    },
    {
        nome: '4 - Portuguesa',
        ingredientes: ['molho de tomate', 'muçarela', 'presunto', 'ovo', 'cebola', 'azeitona'],
        preco: 35.00,
    },
    {
        nome: '5 - Frango com caputiry',
        ingredientes: ['molho de tomate', 'muçarela', 'frango desfiado', 'catupiry'],
        preco: 45.00,
    },
    {
        nome: '6 - Pepperoni',
        ingredientes: ['molho de tomate', 'muçarela', 'pepperoni'],
        preco: 45.00,
    },
    {
        nome: '7 - Vegetariana',
        ingredientes: ['molho de tomate', 'muçarela', 'pimentão', 'cebola', 'tomate', 'azeitona', 'milho'],
        preco: 45.00,
    },
    {
        nome: '8 - Bacon com Cheddar',
        ingredientes: ['molho de tomate', 'muçarela', 'bacon', 'cheddar'],
        preco: 45.00,
    }
];
var bebidas = [
    { nome: '1 - Coca-Cola 500ml', preco: 5.00, tamanho: '500ml' },
    { nome: '2 - Guaraná 500ml', preco: 4.50, tamanho: '500ml' },
    { nome: '3 - Soda 500ml', preco: 4.00, tamanho: '300ml' },
    { nome: '4 - pepsi 500ml', preco: 4.00, tamanho: '300ml' },
    { nome: '5 - Suco Natural 300ml', preco: 6.00, tamanho: '300ml' },
    { nome: '6 - Agua 300ml', preco: 2.00, tamanho: '300ml' },
];
var pedidoPizzas = [];
var pedidoBebidas = [];
var continuar = true;
while (continuar) {
    // Mostrar cardápio de pizzas
    cardapio.forEach(function (pizza) {
        console.log("".concat(pizza.nome, " - R$ ").concat(pizza.preco.toFixed(2), " \n - Ingredientes: ").concat(pizza.ingredientes.join(', '), "\n"));
    });
    // Escolha da pizza
    var escolhaStr = rs.question("Digite o numero da pizza que deseja: ");
    var escolhaNum = Number(escolhaStr);
    if (isNaN(escolhaNum) || escolhaNum < 1 || escolhaNum > cardapio.length) {
        console.log("Escolha inválida! Tente novamente.");
        continue;
    }
    var tamanhoEscolhido = rs.question("Escolha o tamanho (pequena, media, grande): ").toLowerCase();
    if (!['pequena', 'media', 'grande'].includes(tamanhoEscolhido)) {
        console.log("Tamanho inválido! Tente novamente.");
        continue;
    }
    var pizzaBase = cardapio[escolhaNum - 1];
    // Cria pizza com tamanho selecionado, preço fixo (sem ajuste)
    var pizzaEscolhida = __assign(__assign({}, pizzaBase), { tamanho: tamanhoEscolhido });
    pedidoPizzas.push(pizzaEscolhida);
    console.log("Pizza \"".concat(pizzaEscolhida.nome, "\" - ").concat(pizzaEscolhida.tamanho, " adicionada ao pedido."));
    // Perguntar se quer continuar adicionando pizzas
    var querContinuar = rs.question("Quer adicionar outra pizza? (s/n) ");
    if (querContinuar.toLowerCase() !== 's') {
        continuar = false;
    }
}
var querBebida = rs.question("\nDeseja adicionar bebidas ao seu pedido? (s/n): ").toLowerCase();
if (querBebida === 's') {
    var continuarBebidas = true;
    while (continuarBebidas) {
        console.log("\n--- Bebidas Disponíveis ---");
        bebidas.forEach(function (bebida) {
            console.log("".concat(bebida.nome, " - R$ ").concat(bebida.preco.toFixed(2)));
        });
        var escolhaBebidaStr = rs.question("Digite o numero da bebida que deseja: ");
        var escolhaBebidaNum = Number(escolhaBebidaStr);
        if (isNaN(escolhaBebidaNum) || escolhaBebidaNum < 1 || escolhaBebidaNum > bebidas.length) {
            console.log("Escolha inválida de bebida! Tente novamente.");
        }
        else {
            var bebidaEscolhida = bebidas[escolhaBebidaNum - 1];
            pedidoBebidas.push(bebidaEscolhida);
            console.log("Bebida \"".concat(bebidaEscolhida.nome, "\" adicionada ao pedido."));
        }
        var maisBebidas = rs.question("Deseja adicionar outra bebida? (s/n): ");
        if (maisBebidas.toLowerCase() !== 's') {
            continuarBebidas = false;
        }
    }
}
// === RESUMO FINAL ===
console.log("\nSeu pedido final:");
var total = 0;
if (pedidoPizzas.length > 0) {
    console.log("\nPizzas:");
    pedidoPizzas.forEach(function (pizza, i) {
        console.log("".concat(i + 1, " - ").concat(pizza.nome, " - ").concat(pizza.tamanho, " - R$ ").concat(pizza.preco.toFixed(2)));
        total += pizza.preco;
    });
}
if (pedidoBebidas.length > 0) {
    console.log("\nBebidas:");
    pedidoBebidas.forEach(function (bebida, i) {
        console.log("".concat(i + 1, " - ").concat(bebida.nome, " - R$ ").concat(bebida.preco.toFixed(2)));
        total += bebida.preco;
    });
}
console.log("\nTotal a pagar: R$ ".concat(total.toFixed(2)));
