"use strict";
// Sistemas de pizzaria completo
// importar as bibliotecas necessárias
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs"); // módulo para manipular arquivos
var path = require("path"); // módulo para lidar com caminhos de arquivos
var rs = require("readline-sync"); // módulo para receber entradas do usuário
// inicia o bloco de código para armazenagem e modificação de dados no arquivo dataLog
// define o caminho para onde as entradas serão armazenadas
var inputData = path.resolve(__dirname, "dataLog.csv");
// cabeçalho do CSV
var header = "nomeCliente; cpfCliente; pizzas; bebida; sobremesa; acompanhamento; endereco; data_hora; mes; formaDePagamento\n";
// função para ler os arquivos do dataLog "caso exista"
function readDataLog() {
    try {
        var dados = fs.readFileSync(inputData, "utf-8");
        // se o arquivo estiver vazio, retorna uma lista vazia
        if (!dados.trim())
            return [];
        // divide o conteúdo por linhas e transforma em objetos Dados
        return dados.split("\n").map(function (linha) {
            var _a = linha.split(";"), nomeCliente = _a[0], cpfCliente = _a[1], pizzas = _a[2], bebida = _a[3], sobremesa = _a[4], acompanhamento = _a[5], endereco = _a[6], data_hora = _a[7], mes = _a[8], formaDePagamento = _a[9];
            return {
                nomeCliente: nomeCliente === null || nomeCliente === void 0 ? void 0 : nomeCliente.trim(),
                cpfCliente: cpfCliente === null || cpfCliente === void 0 ? void 0 : cpfCliente.trim(),
                pizzas: pizzas === null || pizzas === void 0 ? void 0 : pizzas.trim(),
                bebida: bebida === null || bebida === void 0 ? void 0 : bebida.trim(),
                sobremesa: sobremesa === null || sobremesa === void 0 ? void 0 : sobremesa.trim(),
                acompanhamento: acompanhamento === null || acompanhamento === void 0 ? void 0 : acompanhamento.trim(),
                endereco: endereco === null || endereco === void 0 ? void 0 : endereco.trim(),
                data_hora: data_hora === null || data_hora === void 0 ? void 0 : data_hora.trim(),
                mes: mes === null || mes === void 0 ? void 0 : mes.trim(),
                formaDePagamento: formaDePagamento === null || formaDePagamento === void 0 ? void 0 : formaDePagamento.trim(),
            };
        });
    }
    catch (_a) {
        // se o arquivo não existir, também retorna uma lista vazia
        return [];
    }
}
// inicia o bloco de código para funções e criação de objetos
// função para salvar uma nova entrada no arquivo
// para a entrada de novos dados no arquivo dataLog.csv
function newInput(Pedido) {
    var linha = "".concat(Pedido.nomeCliente, ";").concat(Pedido.cpfCliente, ";").concat(Pedido.pizzas, ";").concat(Pedido.bebida, ";").concat(Pedido.sobremesa, ";").concat(Pedido.acompanhamento, ";").concat(Pedido.endereco, ";").concat(Pedido.data_hora, ";").concat(Pedido.mes, ";").concat(Pedido.formaDePagamento, "\n");
    fs.appendFileSync(inputData, linha, "utf-8");
}
// Garante que o arquivo CSV tenha o cabeçalho se ele não existir ou estiver vazio
if (!fs.existsSync(inputData) || fs.readFileSync(inputData, 'utf-8').trim() === '') {
    fs.writeFileSync(inputData, header, "utf-8");
}
// Entrada de pedidos
function requestNewInputOfPizza() {
    console.log("\n--- Cadastro de Pedidos ---");
    var correctInput = 0;
    while (correctInput === 0) {
        var nomeCliente = rs.question("Digite o nome do cliente: ").trim().toUpperCase();
        var cpfCliente = rs.question("Digite o CPF do cliente: ").trim();
        var pizzas = rs.question("Digite os sabores da pizza: ").trim().toUpperCase();
        var bebida = rs.question("Digite as bebidas: ").trim().toUpperCase();
        var sobremesa = rs.question("Digite a sobremesa: ").trim().toUpperCase();
        var acompanhamento = rs.question("Digite o acompanhamento: ").trim().toUpperCase();
        var endereco = rs.question("Digite o endereço do cliente: ").trim().toUpperCase();
        var data_hora = rs.question("Digite o dia e a hora do pedido: ").trim().toUpperCase(); // const data_hora = inserir função para puxar data e hora do sistema
        var mes = rs.question("Digite o mes: ").trim().toUpperCase(); // const mes = inserir função para puxar o mes do sistema
        var formaDePagamento = rs.question("Digite a forma de pagamento: ").trim().toUpperCase();
        // Cria um novo objeto Pedido com as entradas do usuário
        var newRequest = {
            nomeCliente: nomeCliente,
            cpfCliente: cpfCliente,
            pizzas: pizzas,
            bebida: bebida,
            sobremesa: sobremesa,
            acompanhamento: acompanhamento,
            endereco: endereco,
            data_hora: data_hora, // data_hora, tirar o comentário após inserir a função
            mes: mes, // mes, tirar o comentário após inserir a função
            formaDePagamento: formaDePagamento,
        };
        // Chama a função newInput para salvar o novo veículo no CSV
        newInput(newRequest);
        console.log("Veículo cadastrado com sucesso!");
        break;
        var correctInput_1 = 1;
    }
}
// Encerrando o bloco de código para armazenagem e modificação de dados no arquivo dataLog
// Encerrando o bloco de código para funções e criação de objetos
// Exemplo de como chamar a função para solicitar entrada
// requestNewInputOfPizza();
// Interface do usuário
var userChoice;
while (userChoice !== 9) {
    console.log("\nBEM VINDO A PIZZARIA HENRIQUE\n");
    console.log("1 - Pizzas");
    console.log("2 - Bebidas");
    console.log("3 - Acompanhamentos");
    console.log("4 - Sobremesa");
    console.log("5 - Cadastro");
    console.log("6 - Encerrar");
    console.log("7 - Realizar um pedido");
    userChoice = parseInt(rs.question("O que deseja fazer?")); // = Pede uma entrada ao usuário
    //userChoice === 1
    if (userChoice === 1) {
        requestNewInputOfPizza();
        continue;
    }
}
// Você pode opcionalmente ler e imprimir os dados para verificar
console.log("\n--- Dados atuais no CSV ---");
console.log(readDataLog());
