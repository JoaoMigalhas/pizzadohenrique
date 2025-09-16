import * as rs from "readline-sync";

type Pizza = {
  nome: string;
  ingredientes: string[];
  preco: number;
  tamanho?: 'pequena' | 'media' | 'grande';
}

const cardapio: Pizza[] = [
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
cardapio.forEach((pizza, index) => {
  console.log(`${index + 1} - ${pizza.nome} - R$ ${pizza.preco.toFixed(2)}`);
});

const pedido: Pizza[] = [];

let continuar = true;

while (continuar) {
  const escolhaStr = rs.question("Digite o número da pizza que deseja: ");
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
