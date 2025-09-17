"use strict";
//Sistema de pedidos da pizzaria
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
//importar uma biblioteca para receber o valor dado pelos usuarios
var rs = require("readline-sync");
var fs = require("fs"); //bibliotecas para o csv
var path = require("path");
//Criar o csv do arquivo de pedidos
var inputData = path.resolve(__dirname, "Pedidos.csv");
var header = "pizzas;data_hora;mes\n";
// garante que o arquivo existe e tem o cabeçalho
if (!fs.existsSync(inputData) || fs.readFileSync(inputData, "utf-8").trim() === "") {
    fs.writeFileSync(inputData, header, "utf-8");
}
//Criar o menu inicial
console.log("----------- PIZZARIA HENRIQUE --------------");
console.log("O que deseja fazer?");
console.log("\n1 -) Realizar um pedido");
console.log("\n2 -) Cadastrar");
console.log("\n3 -) Sair");
var escolhaInc = rs.question("\nDigite o numero do que deseja fazer: "); //Criar constante da ação a fazer
if (escolhaInc == '1') { //Se escolher realizar um pedido ira realizar esse codigo:
    //Criar o cardapio
    var cardapio = [
        {
            nome: '1 ---- Margherita ----',
            ingredientes: ['molho de tomate', 'muçarela', 'manjericão'], //Cardapio contendo nome do sabor, os ingredientes e o preço de cada pizza
            preco: 25.00,
        },
        {
            nome: '2 ---- Calabresa ----',
            ingredientes: ['molho de tomate', 'muçarela', 'calabresa', 'cebola'],
            preco: 30.00,
        },
        {
            nome: '3 ---- Quatro Queijos ----',
            ingredientes: ['muçarela', 'gorgonzola', 'parmesão', 'provolone'],
            preco: 35.00,
        },
        {
            nome: '4 ---- Portuguesa ----',
            ingredientes: ['molho de tomate', 'muçarela', 'presunto', 'ovo', 'cebola', 'azeitona'],
            preco: 35.00,
        },
        {
            nome: '5 ---- Frango com caputiry ----',
            ingredientes: ['molho de tomate', 'muçarela', 'frango desfiado', 'catupiry'],
            preco: 45.00,
        },
        {
            nome: '6 ---- Pepperoni ----',
            ingredientes: ['molho de tomate', 'muçarela', 'pepperoni'],
            preco: 45.00,
        },
        {
            nome: '7 ---- Vegetariana ----',
            ingredientes: ['molho de tomate', 'muçarela', 'pimentão', 'cebola', 'tomate', 'azeitona', 'milho'],
            preco: 45.00,
        },
        {
            nome: '8 ---- Bacon com Cheddar ----',
            ingredientes: ['molho de tomate', 'muçarela', 'bacon', 'cheddar'],
            preco: 45.00,
        }
    ];
    //Criar um cardapio para as bebidas disponiveis
    var bebidas = [
        { nome: '1 - Coca-Cola 500ml', preco: 5.00, tamanho: '500ml' },
        { nome: '2 - Guaraná 500ml', preco: 4.50, tamanho: '500ml' },
        { nome: '3 - Soda 500ml', preco: 4.00, tamanho: '300ml' },
        { nome: '4 - Pepsi 500ml', preco: 4.00, tamanho: '300ml' },
        { nome: '5 - Suco Natural 300ml', preco: 6.00, tamanho: '300ml' },
        { nome: '6 - Agua 300ml', preco: 2.00, tamanho: '300ml' },
    ];
    //Criar a variavel que vai receber o pedido
    var pedidoPizzas = [];
    var pedidoBebidas = [];
    //Deixar true para rodar o loop até que o usuario finalize o pedido e caso tenha alguma informação errada ele retornar do principio
    var continuar = true;
    //Loop
    while (continuar) {
        //Mostrar cardápio de pizzas
        console.log("\n--- Pizzas Disponíveis ---");
        cardapio.forEach(function (pizza) {
            console.log("".concat(pizza.nome, " - R$ ").concat(pizza.preco.toFixed(2), " \n - Ingredientes: ").concat(pizza.ingredientes.join(', '), "\n"));
        });
        //Escolha da pizza
        var escolhaStr = rs.question("\nDigite o numero da pizza que deseja: ");
        var escolhaNum = Number(escolhaStr); //Transofrmar o que foi digitado em numero
        if (isNaN(escolhaNum) || escolhaNum < 1 || escolhaNum > cardapio.length) { //Verificar se é um numero para continuar o looping
            console.log("\nEscolha inválida! Tente novamente.");
            continue;
        }
        var tamanhoEscolhido = rs.question("\nEscolha o tamanho (pequena, media, grande): ").toLowerCase(); //Definir o tamanho que vai ser pedido
        if (!['pequena', 'media', 'grande'].includes(tamanhoEscolhido)) {
            console.log("\nTamanho inválido! Tente novamente."); //Verifica se está correto para seguir com o codigo
            continue;
        }
        var pizzaBase = cardapio[escolhaNum - 1]; //Enumerar as escolhas de pizzas do cliente
        //Cria pizza com tamanho selecionado, preço fixo (sem ajuste)
        var pizzaEscolhida = __assign(__assign({}, pizzaBase), { tamanho: tamanhoEscolhido });
        pedidoPizzas.push(pizzaEscolhida);
        console.log("Pizza \"".concat(pizzaEscolhida.nome, "\" - ").concat(pizzaEscolhida.tamanho, " adicionada ao pedido."));
        //Perguntar se quer continuar adicionando pizzas
        var querContinuar = rs.question("\nQuer adicionar outra pizza? (s/n) ");
        if (querContinuar.toLowerCase() !== 's') {
            continuar = false;
        }
    }
    var querBebida = rs.question("\nDeseja adicionar bebidas ao seu pedido? (s/n): ").toLowerCase(); //Perguntar se quer bebida
    if (querBebida === 's') {
        var continuarBebidas = true; //Caso seja sim a respota ele continua
        while (continuarBebidas) {
            console.log("\n--- Bebidas Disponíveis ---");
            bebidas.forEach(function (bebida) {
                console.log("".concat(bebida.nome, " - R$ ").concat(bebida.preco.toFixed(2)));
            });
            var escolhaBebidaStr = rs.question("Digite o numero da bebida que deseja: ");
            var escolhaBebidaNum = Number(escolhaBebidaStr); //Transformar em numero
            if (isNaN(escolhaBebidaNum) || escolhaBebidaNum < 1 || escolhaBebidaNum > bebidas.length) { //Verificar se é um numero
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
    //Fim do pedido
    console.log("\nSeu pedido final:");
    var total_1 = 0;
    if (pedidoPizzas.length > 0) { //Mostrar as pizzas escolhidas
        console.log("\nPizzas:");
        pedidoPizzas.forEach(function (pizza, i) {
            console.log("".concat(i + 1, " - ").concat(pizza.nome, " - ").concat(pizza.tamanho, " - R$ ").concat(pizza.preco.toFixed(2)));
            total_1 += pizza.preco;
        });
    }
    if (pedidoBebidas.length > 0) { //Mostrar as bebidas escolhidas
        console.log("\nBebidas:");
        pedidoBebidas.forEach(function (bebida, i) {
            console.log("".concat(i + 1, " - ").concat(bebida.nome, " - R$ ").concat(bebida.preco.toFixed(2)));
            total_1 += bebida.preco;
        });
    }
    console.log("\nTotal a pagar: R$ ".concat(total_1.toFixed(2)));
    //Salvar no csv
    if (pedidoPizzas.length > 0) {
        var pizzasStr = pedidoPizzas.map(function (p) { return "".concat(p.nome, " (").concat(p.tamanho, ")"); }).join(", ");
        var agora = new Date();
        var data_hora = agora.toLocaleString("pt-BR");
        var mes = String(agora.getMonth() + 1);
        var linha = "".concat(pizzasStr, ";").concat(data_hora, ";").concat(mes, "\n");
        fs.appendFileSync(inputData, linha, "utf-8");
    }
    if (pedidoBebidas.length > 0) {
        var bebidasStr = pedidoBebidas.map(function (b) { return "".concat(b.nome, " (").concat(b.tamanho, ")"); }).join(", ");
        var agora = new Date();
        var data_hora = agora.toLocaleString("pt-BR");
        var mes = String(agora.getMonth() + 1);
        var linha = "Bebidas: ".concat(bebidasStr, ";").concat(data_hora, ";").concat(mes, "\n");
        fs.appendFileSync(inputData, linha, "utf-8");
    }
}
