"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rs = require("readline-sync");
var cardapio = [
    {
        nome: 'Margherita',
        ingredientes: ['molho de tomate', 'muçarela', 'manjericão'],
        preco: 25.00,
    },
    {
        nome: 'Calabresa',
        ingredientes: ['molho de tomate', 'muçarela', 'calabresa', 'cebola'],
        preco: 30.00,
    },
    {
        nome: 'Quatro Queijos',
        ingredientes: ['muçarela', 'gorgonzola', 'parmesão', 'provolone'],
        preco: 35.00,
    }
];
// Mostrar cardápio
console.log("Cardápio:");
cardapio.forEach(function (pizza, index) {
    console.log("".concat(index + 1, " - ").concat(pizza.nome, " - R$ ").concat(pizza.preco.toFixed(2)));
});
var pedido = [];
var continuar = true;
while (continuar) {
    var escolhaStr = rs.question("Digite o número da pizza que deseja: ");
    var escolhaNum = Number(escolhaStr);
    if (isNaN(escolhaNum) || escolhaNum < 1 || escolhaNum > cardapio.length) {
        console.log("Escolha inválida! Tente novamente.");
        continue; // volta para o começo do loop para tentar outra vez
    }
    var pizzaEscolhida = cardapio[escolhaNum - 1];
    pedido.push(pizzaEscolhida);
    console.log("Pizza \"".concat(pizzaEscolhida.nome, "\" adicionada ao pedido."));
    // Perguntar se quer continuar
    var querContinuar = rs.question("Quer adicionar outra pizza? (s/n) ");
    if (querContinuar.toLowerCase() !== 's') {
        continuar = false;
    }
}
// Mostrar resumo do pedido
console.log("\nSeu pedido final:");
var total = 0;
pedido.forEach(function (pizza, i) {
    console.log("".concat(i + 1, " - ").concat(pizza.nome, " - R$ ").concat(pizza.preco.toFixed(2)));
    total += pizza.preco;
});
console.log("Total a pagar: R$ ".concat(total.toFixed(2)));
