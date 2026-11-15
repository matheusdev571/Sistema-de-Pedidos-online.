// Lista com os produtos do carrinho
var carrinho = [];

// Transforma 7.5 em "R$ 7,50"
function dinheiro(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

// Botão "Adicionar": põe o produto no carrinho ou soma 1 na quantidade
function adicionar(nome, preco) {
  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].nome == nome) {
      carrinho[i].qtd = carrinho[i].qtd + 1;
      mostrar();
      return;
    }
  }
  carrinho.push({ nome: nome, preco: preco, qtd: 1 });
  mostrar();
}

// Botões + e −: mexe na quantidade (se chegar a 0, tira do carrinho)
function mudar(posicao, valor) {
  carrinho[posicao].qtd = carrinho[posicao].qtd + valor;
  if (carrinho[posicao].qtd < 1) {
    carrinho.splice(posicao, 1);
  }
  mostrar();
}

// Botão "Remover"
function remover(posicao) {
  carrinho.splice(posicao, 1);
  mostrar();
}

// Desenha o carrinho na tela e calcula o total
function mostrar() {
  var html = "";
  var total = 0;

  for (var i = 0; i < carrinho.length; i++) {
    var item = carrinho[i];
    var subtotal = item.preco * item.qtd;
    total = total + subtotal;

    html += '<div class="linha">' +
      '<span class="linha__nome">' + item.nome + '</span>' +
      '<span class="qtd">' +
        '<button type="button" onclick="mudar(' + i + ', -1)">−</button>' +
        '<b>' + item.qtd + '</b>' +
        '<button type="button" onclick="mudar(' + i + ', 1)">+</button>' +
      '</span>' +
      '<span class="linha__preco">' + dinheiro(subtotal) + '</span>' +
      '<button type="button" class="remover" onclick="remover(' + i + ')">Remover</button>' +
    '</div>';
  }

  if (carrinho.length == 0) {
    html = '<p class="vazio">Seu carrinho está vazio. Clique em "Adicionar" nos produtos.</p>';
  }

  document.getElementById("lista").innerHTML = html;
  document.getElementById("total").textContent = dinheiro(total);
}

// Botão "Confirmar pedido"
function confirmar(evento) {
  evento.preventDefault(); // não recarrega a página

  if (carrinho.length == 0) {
    alert("Adicione pelo menos um produto ao carrinho.");
    return;
  }

  // Monta o resumo do pedido
  var resumo = "";
  var total = 0;
  for (var i = 0; i < carrinho.length; i++) {
    var subtotal = carrinho[i].preco * carrinho[i].qtd;
    total = total + subtotal;
    resumo += '<div class="linha"><span class="linha__nome">' + carrinho[i].qtd + '× ' + carrinho[i].nome + '</span><span class="linha__preco">' + dinheiro(subtotal) + '</span></div>';
  }
  resumo += '<div class="linha"><b>Total</b><b>' + dinheiro(total) + '</b></div>';

  document.getElementById("conf-nome").textContent = document.getElementById("nome").value;
  document.getElementById("conf-endereco").textContent = document.getElementById("endereco").value;
  document.getElementById("conf-pagamento").textContent = document.getElementById("pagamento").value;
  document.getElementById("conf-resumo").innerHTML = resumo;

  // Troca o formulário pela confirmação
  document.getElementById("area-pedido").hidden = true;
  document.getElementById("confirmacao").hidden = false;

  carrinho = [];
  mostrar();
}

// Começa mostrando o carrinho vazio
mostrar();
