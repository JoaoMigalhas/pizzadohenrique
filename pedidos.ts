import * as rs from "readline-sync";

type Pizza = {
  nome: string;
  ingredientes: string[];
  preco: number;
  tamanho?: 'pequena' | 'media' | 'grande';
}

type Bebida = {
  nome: string;
  preco: number;
  tamanho?: string;
}

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
  },

   {
    nome: '4 - Portuguesa',
    ingredientes: ['molho de tomate', 'muçarela', 'presunto', 'ovo', 'cebola', 'azeitona'],
    preco: 35.00,
  },

     {
    nome: '5 - Frango com caputiry',
    ingredientes: ['molho de tomate','muçarela', 'frango desfiado', 'catupiry'],
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

const bebidas: Bebida[] = [
  { nome: '1 - Coca-Cola 500ml', preco: 5.00, tamanho: '500ml' },
  { nome: '2 - Guaraná 500ml', preco: 4.50, tamanho: '500ml' },
  { nome: '3 - Soda 500ml', preco: 4.00, tamanho: '300ml' },
  { nome: '4 - pepsi 500ml', preco: 4.00, tamanho: '300ml' },
  { nome: '5 - Suco Natural 300ml', preco: 6.00, tamanho: '300ml' },
  { nome: '6 - Agua 300ml', preco: 2.00, tamanho: '300ml' },
];

const pedidoPizzas: Pizza[] = [];
const pedidoBebidas: Bebida[] = [];

let continuar = true;

while (continuar) {
  // Mostrar cardápio de pizzas
  cardapio.forEach(pizza => {
    console.log(`${pizza.nome} - R$ ${pizza.preco.toFixed(2)} \n - Ingredientes: ${pizza.ingredientes.join(', ')}\n`);
  });

  // Escolha da pizza
  const escolhaStr = rs.question("Digite o numero da pizza que deseja: ");
  const escolhaNum = Number(escolhaStr);

  if (isNaN(escolhaNum) || escolhaNum < 1 || escolhaNum > cardapio.length) {
    console.log("Escolha inválida! Tente novamente.");
    continue;
  }

  const tamanhoEscolhido = rs.question("Escolha o tamanho (pequena, media, grande): ").toLowerCase();

  if (!['pequena', 'media', 'grande'].includes(tamanhoEscolhido)) {
    console.log("Tamanho inválido! Tente novamente.");
    continue;
  }

  const pizzaBase = cardapio[escolhaNum - 1];

  // Cria pizza com tamanho selecionado, preço fixo (sem ajuste)
  const pizzaEscolhida: Pizza = {
    ...pizzaBase,
    tamanho: tamanhoEscolhido as 'pequena' | 'media' | 'grande',
  };

  pedidoPizzas.push(pizzaEscolhida);
  console.log(`Pizza "${pizzaEscolhida.nome}" - ${pizzaEscolhida.tamanho} adicionada ao pedido.`);


  // Perguntar se quer continuar adicionando pizzas
  const querContinuar = rs.question("Quer adicionar outra pizza? (s/n) ");
  if (querContinuar.toLowerCase() !== 's') {
    continuar = false;
  }

}

const querBebida = rs.question("\nDeseja adicionar bebidas ao seu pedido? (s/n): ").toLowerCase();

if (querBebida === 's') {
  let continuarBebidas = true;

  while (continuarBebidas) {
    console.log("\n--- Bebidas Disponíveis ---");
    bebidas.forEach(bebida => {
      console.log(`${bebida.nome} - R$ ${bebida.preco.toFixed(2)}`);
    });

    const escolhaBebidaStr = rs.question("Digite o numero da bebida que deseja: ");
    const escolhaBebidaNum = Number(escolhaBebidaStr);

    if (isNaN(escolhaBebidaNum) || escolhaBebidaNum < 1 || escolhaBebidaNum > bebidas.length) {
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

// === RESUMO FINAL ===
console.log("\nSeu pedido final:");

let total = 0;

if (pedidoPizzas.length > 0) {
  console.log("\nPizzas:");
  pedidoPizzas.forEach((pizza, i) => {
    console.log(`${i + 1} - ${pizza.nome} - ${pizza.tamanho} - R$ ${pizza.preco.toFixed(2)}`);
    total += pizza.preco;
  });
}

if (pedidoBebidas.length > 0) {
  console.log("\nBebidas:");
  pedidoBebidas.forEach((bebida, i) => {
    console.log(`${i + 1} - ${bebida.nome} - R$ ${bebida.preco.toFixed(2)}`);
    total += bebida.preco;
  });
}

console.log(`\nTotal a pagar: R$ ${total.toFixed(2)}`);
