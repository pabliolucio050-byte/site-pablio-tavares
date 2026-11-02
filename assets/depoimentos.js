/* =========================================================
   DEPOIMENTOS DE CLIENTES  |  edite somente este arquivo
   =========================================================
   Campos de cada depoimento:
     nome      : nome do cliente (exatamente como ele autorizou)
     cargo     : identificação profissional (opcional, "" para nenhum)
     segmento  : ramo de atuação
     local     : cidade/UF (opcional, "" para nenhum)
     icone     : hamburguer | jantinha | cardiologia | advocacia | pizza | acougue
     texto     : depoimento, sem aspas
     aprovado  : false = RASCUNHO (aparece só na prévia, com o selo "Relato em aprovação")
                 true  = cliente autorizou o texto e o uso do nome
                         (aparece em produção, com as 5 estrelas)

   Regra de segurança: no site oficial só aparecem os depoimentos com
   aprovado: true. Se nenhum estiver aprovado, a seção inteira fica oculta.
   Só troque para true depois de ter a autorização do cliente por escrito
   (um "autorizo" no WhatsApp já serve como registro).
   ========================================================= */

window.DEPOIMENTOS = [
  {
    nome: "Luiz Mendonça",
    cargo: "",
    segmento: "Hamburgueria",
    local: "Goiânia, GO",
    icone: "hamburguer",
    texto: "Antes, minha hamburgueria dependia praticamente dos clientes que chegavam até nós. A gente esperava o pedido aparecer. Hoje, conseguimos trabalhar com vendas ativas ao longo do dia, lembrando nossos clientes de pedir aquele hambúrguer. Isso mudou bastante nossa forma de vender.",
    aprovado: true
  },
  {
    nome: "Giovanni Rosa",
    cargo: "",
    segmento: "Jantinha e Gastronomia",
    local: "",
    icone: "jantinha",
    texto: "Antes, todos os pedidos chegavam pelo WhatsApp e a gente não tinha um controle organizado de quem comprava ou quantos pedidos recebíamos. Com o CRM, ficou muito mais fácil acompanhar as vendas, identificar os clientes e organizar o atendimento. Hoje temos muito mais controle sobre o negócio.",
    aprovado: true
  },
  {
    nome: "Dr. José Sérgio",
    cargo: "",
    segmento: "Cardiologia | Saúde",
    local: "",
    icone: "cardiologia",
    texto: "Já tínhamos um sistema de agendamento, mas o acompanhamento dos pacientes ainda dependia muito de contatos manuais. Com a automação integrada ao CRM, conseguimos organizar os agendamentos, os lembretes e os próximos atendimentos. O processo ficou muito mais prático para a equipe e para os pacientes.",
    aprovado: true
  },
  {
    nome: "Carol Cariis",
    cargo: "Advogada",
    segmento: "Advocacia",
    local: "",
    icone: "advocacia",
    texto: "Investíamos em tráfego pago e recebíamos contatos de possíveis clientes, mas faltava organização para acompanhar cada oportunidade. Hoje, com o CRM e um funil comercial estruturado, conseguimos identificar de onde vêm os contatos, acompanhar cada atendimento e organizar melhor a qualificação dos interessados.",
    aprovado: true
  },
  {
    nome: "Jane Vital",
    cargo: "",
    segmento: "Pizzaria",
    local: "",
    icone: "pizza",
    texto: "Hoje tenho uma inteligência artificial ajudando nas vendas da minha pizzaria. É como ter uma estrutura comercial trabalhando junto comigo. Ficou muito mais fácil voltar a conversar com quem já comprou, aproveitar oportunidades e aumentar nossa carteira de clientes. Fez muita diferença na organização das vendas.",
    aprovado: true
  },
  {
    nome: "Roger Santos",
    cargo: "",
    segmento: "Açougue Premium",
    local: "",
    icone: "acougue",
    texto: "Depois que implantamos o CRM no açougue, ficou muito mais fácil entender quem são nossos clientes e organizar o relacionamento com eles. Hoje temos ações comerciais automatizadas funcionando durante a semana inteira, mantendo contato com nossa base e incentivando novas compras. Agora existe um processo comercial muito mais organizado.",
    aprovado: true
  }
];

/* ===== Renderização (não precisa editar daqui para baixo) ===== */
(function () {
  var sec = document.getElementById("clientes");
  var grid = document.getElementById("dep-grid");
  if (!sec || !grid || !window.DEPOIMENTOS) return;

  // Prévia = localhost ou URLs de prévia da Vercel. Qualquer outro endereço é produção.
  var h = location.hostname;
  var PRODUCAO = ["pablio-tavares.vercel.app"];
  var previa = location.protocol === "file:" || /^(localhost|127\.|\[::1\])/.test(h) ||
               (/\.vercel\.app$/.test(h) && PRODUCAO.indexOf(h) === -1);

  var lista = window.DEPOIMENTOS.filter(function (d) { return d.aprovado || previa; });
  if (!lista.length) return; // nada aprovado em produção: seção continua oculta

  var I = {
    hamburguer: '<path d="M4 10a8 5 0 0 1 16 0z"/><path d="M3 13.5h18"/><path d="M4 17h16v.5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z"/><path d="M9 7.5v.01M12 6.5v.01M15 7.5v.01"/>',
    jantinha: '<path d="M3 12h18"/><path d="M4 12a8 7 0 0 0 16 0"/><path d="M5 4l14 6"/><path d="M8 4.8v2.4M12 6.5v2.4"/>',
    cardiologia: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="M3 12h4l2-3 3 6 2-3h7"/>',
    advocacia: '<path d="M12 3v18M7 21h10"/><path d="M5 7h14"/><path d="M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
    pizza: '<path d="M12 21L3.5 6a14 14 0 0 1 17 0z"/><path d="M5.5 9.5a11 11 0 0 1 13 0"/><path d="M10 12v.01M13.5 14.5v.01M12 18v.01"/>',
    acougue: '<path d="M3 6h12v9a2 2 0 0 1-2 2H3z"/><path d="M15 9h6"/><circle cx="12" cy="9" r="1"/>'
  };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var estrelas = '<div class="dep-stars" role="img" aria-label="Avaliação 5 de 5">★★★★★</div>';
  var selo = '<div class="dep-draft">Relato em aprovação</div>';

  grid.innerHTML = lista.map(function (d, i) {
    var sub = [d.cargo, d.segmento, d.local].filter(Boolean).map(esc).join(" · ");
    return '<figure class="dep rv" id="dep-' + i + '">' +
      '<div class="dep-top"><span class="dep-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (I[d.icone] || I.jantinha) + '</svg></span>' +
      (d.aprovado ? estrelas : selo) + '</div>' +
      '<blockquote><p>' + esc(d.texto) + '</p></blockquote>' +
      '<figcaption><b>' + esc(d.nome) + '</b><span>' + sub + '</span></figcaption>' +
      '</figure>';
  }).join("");
  sec.hidden = false;

  // Carrossel no celular: botões e indicadores
  var dots = document.getElementById("dep-dots");
  var cards = grid.querySelectorAll(".dep");
  dots.innerHTML = Array.prototype.map.call(cards, function (c, i) {
    return '<button type="button" aria-label="Ir para o depoimento ' + (i + 1) + ' de ' + cards.length + '" aria-controls="dep-' + i + '"></button>';
  }).join("");
  var db = dots.querySelectorAll("button");
  var ir = function (i) { i = Math.max(0, Math.min(cards.length - 1, i)); grid.scrollTo({ left: cards[i].offsetLeft - grid.offsetLeft, behavior: "smooth" }); };
  var atual = function () {
    var x = grid.scrollLeft, best = 0;
    cards.forEach(function (c, i) { if (Math.abs(c.offsetLeft - grid.offsetLeft - x) < Math.abs(cards[best].offsetLeft - grid.offsetLeft - x)) best = i; });
    return best;
  };
  var marca = function () { var a = atual(); db.forEach(function (b, i) { b.setAttribute("aria-current", i === a ? "true" : "false"); }); };
  db.forEach(function (b, i) { b.addEventListener("click", function () { ir(i); }); });
  document.getElementById("dep-prev").addEventListener("click", function () { ir(atual() - 1); });
  document.getElementById("dep-next").addEventListener("click", function () { ir(atual() + 1); });
  grid.addEventListener("scroll", function () { clearTimeout(grid._t); grid._t = setTimeout(marca, 80); }, { passive: true });
  marca();
})();
