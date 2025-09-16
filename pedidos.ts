//Cadastro de pedidos
 // Sistemas de pizzaria completo
    // importar as bibliotecas necessárias

    import * as fs from "fs"; // módulo para manipular arquivos
    import * as path from "path"; // módulo para lidar com caminhos de arquivos
    import * as rs from "readline-sync"; // módulo para receber entradas do usuário

type Pizza = {
  nome: string;
  ingredientes: string[];
  preco: number;
  tamanho?: 'pequena' | 'media' | 'grande';
}

// Cria um array de pizzas
const cardapio: Pizza[] = [
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
  }
];

// Exemplo de uso: mostrar nomes e preços
cardapio.forEach(pizza => {
  console.log(`${pizza.nome} - R$ ${pizza.preco.toFixed(2)} \n - Ingrediente:${pizza.ingredientes}\n`);
});

const pedido: Pizza[] = [];

let continuar = true;

while (continuar) {
  const escolhaStr = rs.question("Digite o numero da pizza que deseja: ");
  const escolhaNum = Number(escolhaStr);

  if (isNaN(escolhaNum) || escolhaNum < 1 || escolhaNum > cardapio.length) {
    console.log("Escolha inválida! Tente novamente.");
    continue; // volta para o começo do loop para tentar outra vez
  }

  const pizzaEscolhida = cardapio[escolhaNum - 1];
  pedido.push(pizzaEscolhida);
  console.log(`Pizza "${pizzaEscolhida.nome}" adicionada ao pedido.`);

  // Perguntar se quer continuar
  const querContinuar = rs.question("Quer adicionar outra pizza? (s/n) ");
  if (querContinuar.toLowerCase() !== 's') {
    continuar = false;
  }
}


// Mostrar resumo do pedido
console.log("\nSeu pedido final:");
let total = 0;
pedido.forEach((pizza, i) => {
  console.log(`${i + 1} - ${pizza.nome} - R$ ${pizza.preco.toFixed(2)}`);
  total += pizza.preco;
});
console.log(`Total a pagar: R$ ${total.toFixed(2)}`);
