//Sistema de pedidos da pizzaria

//importar uma biblioteca para receber o valor dado pelos usuarios
import * as rs from "readline-sync";
import * as fs from "fs"; //bibliotecas para o csv
import * as path from "path";

//Criar o csv do arquivo de pedidos
const inputData = path.resolve(__dirname, "Pedidos.csv");
const header = "pizzas;data_hora;mes\n";

// garante que o arquivo existe e tem o cabeçalho
if (!fs.existsSync(inputData) || fs.readFileSync(inputData, "utf-8").trim() === "") {
  fs.writeFileSync(inputData, header, "utf-8");
}


//Criar uma interface das pizzas para definir os valores as entidades
type Pizza = {
  nome: string;
  ingredientes: string[];
  preco: number;
  tamanho?: 'pequena' | 'media' | 'grande';
}

//Criar a mesma interface agora para as bebidas
type Bebida = {
  nome: string;
  preco: number;
  tamanho?: string;
}

//Criar o menu inicial
    console.log("----------- PIZZARIA HENRIQUE --------------");
    console.log("O que deseja fazer?")
    console.log("\n1 -) Realizar um pedido")
    console.log("\n2 -) Cadastrar")
    console.log("\n3 -) Sair")

    const  escolhaInc = rs.question("\nDigite o numero do que deseja fazer: "); //Criar constante da ação a fazer

    if (escolhaInc == '1') {    //Se escolher realizar um pedido ira realizar esse codigo:

//Criar o cardapio
const cardapio: Pizza[] = [
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
    ingredientes: ['molho de tomate','muçarela', 'frango desfiado', 'catupiry'],
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
const bebidas: Bebida[] = [
  { nome: '1 - Coca-Cola 500ml', preco: 5.00, tamanho: '500ml' },
  { nome: '2 - Guaraná 500ml', preco: 4.50, tamanho: '500ml' },
  { nome: '3 - Soda 500ml', preco: 4.00, tamanho: '300ml' },
  { nome: '4 - Pepsi 500ml', preco: 4.00, tamanho: '300ml' },
  { nome: '5 - Suco Natural 300ml', preco: 6.00, tamanho: '300ml' },
  { nome: '6 - Agua 300ml', preco: 2.00, tamanho: '300ml' },
];

//Criar a variavel que vai receber o pedido
const pedidoPizzas: Pizza[] = [];
const pedidoBebidas: Bebida[] = [];

//Deixar true para rodar o loop até que o usuario finalize o pedido e caso tenha alguma informação errada ele retornar do principio
let continuar = true;


//Loop
while (continuar) {
  //Mostrar cardápio de pizzas
  console.log("\n--- Pizzas Disponíveis ---");
  cardapio.forEach(pizza => {
    console.log(`${pizza.nome} - R$ ${pizza.preco.toFixed(2)} \n - Ingredientes: ${pizza.ingredientes.join(', ')}\n`);
  });

  //Escolha da pizza
  const escolhaStr = rs.question("\nDigite o numero da pizza que deseja: ");
  const escolhaNum = Number(escolhaStr); //Transofrmar o que foi digitado em numero

  if (isNaN(escolhaNum) || escolhaNum < 1 || escolhaNum > cardapio.length) { //Verificar se é um numero para continuar o looping
    console.log("\nEscolha inválida! Tente novamente.");
    continue;
  }

  const tamanhoEscolhido = rs.question("\nEscolha o tamanho (pequena, media, grande): ").toLowerCase(); //Definir o tamanho que vai ser pedido

  if (!['pequena', 'media', 'grande'].includes(tamanhoEscolhido)) {
    console.log("\nTamanho inválido! Tente novamente."); //Verifica se está correto para seguir com o codigo
    continue;
  }

  const pizzaBase = cardapio[escolhaNum - 1]; //Enumerar as escolhas de pizzas do cliente

  //Cria pizza com tamanho selecionado, preço fixo (sem ajuste)
  const pizzaEscolhida: Pizza = {
    ...pizzaBase,
    tamanho: tamanhoEscolhido as 'pequena' | 'media' | 'grande',
  };

  pedidoPizzas.push(pizzaEscolhida);
  console.log(`Pizza "${pizzaEscolhida.nome}" - ${pizzaEscolhida.tamanho} adicionada ao pedido.`);


  //Perguntar se quer continuar adicionando pizzas
  const querContinuar = rs.question("\nQuer adicionar outra pizza? (s/n) ");
  if (querContinuar.toLowerCase() !== 's') {
    continuar = false;
  }

}

const querBebida = rs.question("\nDeseja adicionar bebidas ao seu pedido? (s/n): ").toLowerCase(); //Perguntar se quer bebida

if (querBebida === 's') {
  let continuarBebidas = true; //Caso seja sim a respota ele continua

  while (continuarBebidas) {
    console.log("\n--- Bebidas Disponíveis ---");
    bebidas.forEach(bebida => {
      console.log(`${bebida.nome} - R$ ${bebida.preco.toFixed(2)}`);
    });

    const escolhaBebidaStr = rs.question("Digite o numero da bebida que deseja: ");
    const escolhaBebidaNum = Number(escolhaBebidaStr); //Transformar em numero

    if (isNaN(escolhaBebidaNum) || escolhaBebidaNum < 1 || escolhaBebidaNum > bebidas.length) { //Verificar se é um numero
      console.log("Escolha inválida de bebida! Tente novamente.");
    } else {
      const bebidaEscolhida = bebidas[escolhaBebidaNum - 1];
      pedidoBebidas.push(bebidaEscolhida);
      console.log(`Bebida "${bebidaEscolhida.nome}" adicionada ao pedido.`);
    }

    const maisBebidas = rs.question("Deseja adicionar outra bebida? (s/n): ");
    if (maisBebidas.toLowerCase() !== 's') {
      continuarBebidas = false;
    }
  }
}

//Fim do pedido
console.log("\nSeu pedido final:");

let total = 0;

if (pedidoPizzas.length > 0) { //Mostrar as pizzas escolhidas
  console.log("\nPizzas:");
  pedidoPizzas.forEach((pizza, i) => {
    console.log(`${i + 1} - ${pizza.nome} - ${pizza.tamanho} - R$ ${pizza.preco.toFixed(2)}`);
    total += pizza.preco;
  });
}

if (pedidoBebidas.length > 0) { //Mostrar as bebidas escolhidas
  console.log("\nBebidas:");
  pedidoBebidas.forEach((bebida, i) => {
    console.log(`${i + 1} - ${bebida.nome} - R$ ${bebida.preco.toFixed(2)}`);
    total += bebida.preco;
  });
}
    
    console.log(`\nTotal a pagar: R$ ${total.toFixed(2)}`);


    //Salvar no csv
    if (pedidoPizzas.length > 0) { //caso o pedido tenha sido feito ele salva
  const pizzasStr = pedidoPizzas.map(p => `${p.nome} (${p.tamanho})`).join(", ");
  const agora = new Date(); //criar para salvar a data
  const data_hora = agora.toLocaleString("pt-BR");
  const mes = String(agora.getMonth() + 1);

  const linha = `Pizza: ${pizzasStr};${data_hora};${mes}\n`; //forma padrao para salvar (nome da pizza)(data e hora do pedido)(mes)
  fs.appendFileSync(inputData, linha, "utf-8");
 }
    if (pedidoBebidas.length > 0) { //salvar as bebidas da mesma maneira
  const bebidasStr = pedidoBebidas.map(b => `${b.nome} (${b.tamanho})`).join(", ");
  const agora = new Date(); //criar para salvar a data
  const data_hora = agora.toLocaleString("pt-BR");
  const mes = String(agora.getMonth() + 1);

  const linha = `Bebidas: ${bebidasStr};${data_hora};${mes}\n`;//forma padrao para salvar (nome da bebida)(data e hora do pedido)(mes)
  fs.appendFileSync(inputData, linha, "utf-8");

    }
}
