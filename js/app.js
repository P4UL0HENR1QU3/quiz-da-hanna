(function () {
  'use strict';

  /* ============ personalize aqui ============ */
  var NOME_DELA = 'Hanna';      /* o nome dela entre as aspas */
  /* ========================================== */

  var ELA  = NOME_DELA ? ('a ' + NOME_DELA) : 'ela';    /* "a Hanna nasceu" */
  var DELA = NOME_DELA ? ('da ' + NOME_DELA) : 'dela';  /* "o gatinho da Hanna" */
  var TITULO_PAGINA = NOME_DELA ? ('Quiz da ' + NOME_DELA) : 'Caderno Rosa';
  var TEMPO = 20000;   /* tempo por pergunta, em milissegundos */

  var GENEROS = ['Mulher','Homem','Não-binárie'];
  var SEXUALIDADES = ['Hétero','Gay','Lésbica','Bi','Pan','Assexual'];

  var QUESTOES = [
    {p:'Quando é o aniversário ' + DELA + '?', c:'15 de março', e:['15 de maio','5 de março','13 de março'],
     n:'15 de março.'},
    {p:'Em que ano ' + ELA + ' nasceu?', c:'2007', e:['2005','2006','2008'],
     n:'2007 — a melhor safra.'},
    {p:'Qual é o signo solar ' + DELA + '?', c:'Peixes', e:['Aquário','Capricórnio','Áries'],
     n:'Peixes: sensível, sonhadora e fofa.'},
    {p:'E o ascendente?', c:'Capricórnio', e:['Peixes','Escorpião','Aquário'],
     n:'Ascendente em Capricórnio — a parte séria e determinada.'},
    {p:'A lua ' + DELA + ' está em qual signo?', c:'Aquário', e:['Peixes','Câncer','Capricórnio'],
     n:'Lua em Aquário.'},
    {p:'Qual destas comidas ' + ELA + ' ODEIA?', c:'Empadão', e:['Poke','Paçoca','Frango frito'],
     n:'Empadão é inimigo declarado. Nunca ofereça.'},
    {p:'Qual é o filme favorito ' + DELA + '?', c:'Meninas Malvadas', e:['Barbie','As Branquelas','O Diabo Veste Prada'],
     n:'Meninas Malvadas. E filme sempre ganha de série.'},
    {p:'Qual flor ' + ELA + ' só passou a gostar depois?', c:'Girassol', e:['Rosa','Tulipa','Orquídea'],
     n:'Girassol.'},
    {p:'Qual flor ' + ELA + ' gosta, mas é difícil de encontrar?', c:'Jasmim', e:['Lírio','Lavanda','Camélia'],
     n:'Jasmim. Precisa encomendar antes na floricultura.'},
    {p:'De que ' + ELA + ' tem medo?', multi:true,
     ops:[{t:'Coisa gigante',c:true},{t:'Lugar fechado',c:true},{t:'Aranha',c:true},
          {t:'Altura',c:false},{t:'Palhaço',c:false},{t:'Trovão',c:false}],
     n:'Megalofobia, claustrofobia e aracnofobia. O pacote completo.'},
    {p:'Qual é o sabor de bolo preferido ' + DELA + '?', c:'Morango ou limão', e:['Chocolate','Cenoura','Red velvet'],
     n:'Bolo de morango ou de limão — esses dois e mais nenhum.'},
    {p:'Quais artistas ' + ELA + ' escuta sem parar?', c:'Sabrina Carpenter e Lady Gaga', e:['Taylor Swift e Ariana Grande','Beyoncé e Rihanna','Olivia Rodrigo e Billie Eilish'],
     n:'Sabrina Carpenter e Lady Gaga.'},
    {p:'O que ' + ELA + ' estuda hoje?', c:'Biblioteconomia', e:['Pedagogia','Letras','História'],
     n:'Biblioteconomia — inteligente do jeito dela.'},
    {p:'Qual curso ' + ELA + ' quer fazer depois?', c:'Psicopedagogia', e:['Direito','Psicologia','Jornalismo'],
     n:'Psicopedagogia é o próximo plano.'},
    {p:'' + (NOME_DELA ? NOME_DELA : 'Ela') + ' fez a mesma faculdade de qual famoso?', c:'Davi Brito', e:['Whindersson Nunes','Felipe Neto','Neymar'],
     n:'Isso mesmo: a mesma faculdade do Davi Brito.'},
    {p:'Em que bairro ' + ELA + ' mora?', c:'Jardim Guanabara', e:['Jardim Botânico','Vila Guanabara','Guanabara Park'],
     n:'Jardim Guanabara — onde fica a Coca-Cola mais cara do planeta.'},
    {p:'Qual é o nome do gatinho ' + DELA + '?', c:'Cesar', e:['Nero','Simba','Tom'],
     n:'Cesar, o laranjinha fofo.', foto:'Cesar, o gatinho laranja'},
    {p:'Qual Labubu ' + ELA + ' precisa ganhar?', c:'O azul', e:['O rosa','O verde','O roxo'],
     n:'Labubu AZUL. Anota aí.'},
    {p:'Em que situação ' + ELA + ' come doce, mesmo não gostando?', c:'Quando está de TPM', e:['Todo dia depois do almoço','Só no aniversário','Quando está triste'],
     n:'Doce só na TPM.'},
    {p:'Qual é o chocolate favorito ' + DELA + '?', c:'Ferrero Rocher', e:['Kinder Bueno','Ouro Branco','Sonho de Valsa'],
     n:'Ferrero Rocher, sempre.'}
  ];

  var TITULOS = [
    {min:20, t:'Alma gêmea homologada', d:'Vinte de vinte. Isso não é sorte, é amor com anotação.'},
    {min:17, t:'Isso aqui é amor mesmo', d:'Você presta atenção nos detalhes. Continua assim.'},
    {min:14, t:'Crush aplicado', d:'Boa! Faltou pouco pra nota máxima.'},
    {min:10, t:'Na média, mas dá pra melhorar', d:'Você conhece o básico. Agora vá além do básico.'},
    {min:6,  t:'Vocês só se seguem no Insta', d:'Tá na hora de puxar assunto de verdade.'},
    {min:0,  t:'Peraí, quem é você mesmo?', d:'Sem julgamentos. Só... comece do começo.'}
  ];

  /* ---------------- utilidades ---------------- */
  function esc(s){
    return String(s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function embaralhar(a){
    var r = a.slice();
    for (var i = r.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var t = r[i]; r[i] = r[j]; r[j] = t;
    }
    return r;
  }
  function novoId(){
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
  }
  function lsLer(chave, padrao){
    try { return JSON.parse(localStorage.getItem(chave) || 'null') || padrao; } catch (e) { return padrao; }
  }
  function lsGravar(chave, valor){
    try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) {}
  }

  function ordenar(lista){
    return lista.slice().sort(function(a, b){
      if (b.pontos !== a.pontos) return b.pontos - a.pontos;
      if (a.ms !== b.ms) return a.ms - b.ms;
      return (a.quando || 0) - (b.quando || 0);
    });
  }
  function juntar(a, b){
    var vistos = {}, saida = [];
    a.concat(b).forEach(function(e){
      if (!e || !e.id || vistos[e.id]) return;
      vistos[e.id] = 1;
      saida.push(e);
    });
    return ordenar(saida).slice(0, 100);
  }

  /* ---------------- estado ---------------- */
  var st = {
    tela: 'capa',
    jogador: {nome:'', genero:'', sexo:''},
    ordem: [],
    i: 0,
    pontos: 0,
    acertos: 0,
    respondida: false,
    inicioQ: 0,
    inicioTudo: 0,
    timer: null,
    ranking: ordenar(lsLer('cr_ranking', [])),
    meuId: null,
    salvando: false,
    somenteLeitura: !Placar.ativo(),
    erroRede: false
  };

  /* Busca o ranking do banco assim que a página abre. Enquanto não chega,
     a tela mostra o que estiver guardado neste aparelho. */
  function carregarRanking(){
    if (!Placar.ativo()) return;
    Placar.listar().then(function(lista){
      st.ranking = juntar(lista, lsLer('cr_ranking', []));
      st.erroRede = false;
      if (st.tela === 'ranking' || st.tela === 'resultado') desenhar(false);
    }, function(){
      st.erroRede = true;
      if (st.tela === 'ranking') desenhar(false);
    });
  }

  function enviarPontuacao(entrada){
    if (!Placar.ativo()){ st.salvando = false; return; }
    st.salvando = true;
    Placar.enviar(entrada).then(function(){
      st.salvando = false;
      st.erroRede = false;
      return Placar.listar();
    }, function(){
      /* A pontuação já está salva neste aparelho; só não subiu ao banco. */
      st.salvando = false;
      st.erroRede = true;
      if (st.tela === 'resultado' || st.tela === 'ranking') desenhar(false);
      throw 0;
    }).then(function(lista){
      st.ranking = juntar(lista, lsLer('cr_ranking', []));
      if (st.tela === 'resultado' || st.tela === 'ranking') desenhar(false);
    }, function(){});
  }

  /* ---------------- telas ---------------- */
  function girassol(){
    return '<svg class="sticker" viewBox="0 0 100 100" aria-hidden="true">'
      + '<g fill="var(--sun)">'
      + '<circle cx="50" cy="14" r="13"/><circle cx="50" cy="86" r="13"/>'
      + '<circle cx="14" cy="50" r="13"/><circle cx="86" cy="50" r="13"/>'
      + '<circle cx="24" cy="24" r="12"/><circle cx="76" cy="24" r="12"/>'
      + '<circle cx="24" cy="76" r="12"/><circle cx="76" cy="76" r="12"/>'
      + '</g><circle cx="50" cy="50" r="21" fill="#6B3A22"/>'
      + '<circle cx="50" cy="50" r="13" fill="#8A4B2C"/></svg>';
  }

  function telaCapa(){
    return '<section class="screen card ruled capa">'
      + '<div class="tape"></div>'
      + girassol()
      + '<p class="eyebrow">quiz oficial &middot; edição única</p>'
      + '<h1 class="title">' + (NOME_DELA ? 'Quiz da<em>' + esc(NOME_DELA) + '</em>' : 'Caderno<em>Rosa</em>') + '</h1>'
      + '<p class="lede">Vinte perguntas sobre ' + esc(ELA) + '. Cada resposta tem 20 segundos — quem responde rápido soma mais. No fim, seu nome entra no ranking.</p>'
      + '<div class="chips">'
      + '<span class="chip">20 perguntas</span>'
      + '<span class="chip">20s por rodada</span>'
      + '<span class="chip">ranking geral</span>'
      + '</div>'
      + '<div class="stack" style="margin-top:22px">'
      + '<button class="btn btn-primary" data-acao="cadastro">Abrir o caderno</button>'
      + '<button class="btn btn-ghost" data-acao="ranking">Ver o ranking</button>'
      + '</div>'
      + '</section>';
  }

  function grupoPills(nome, itens, escolhido){
    return itens.map(function(op){
      return '<button type="button" class="pill" data-grupo="' + nome + '" data-valor="' + esc(op) + '" '
        + 'aria-pressed="' + (escolhido === op ? 'true' : 'false') + '">' + esc(op) + '</button>';
    }).join('');
  }

  /* Homem está barrado — a piada da casa. */
  function vetado(){ return st.jogador.genero === 'Homem'; }

  function textoBotaoComecar(){
    return vetado() ? 'Homem não pode participar' : 'Começar o quiz';
  }

  /* joinha pra baixo em SVG: emoji não aceita cor, este aceita */
  function svgJoinha(){
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22'
      + 'l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06'
      + 'L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/></svg>';
  }

  function blocoVeto(){
    return '<div class="veto pop" id="veto" role="status">'
      + '<b>' + svgJoinha() + 'Acesso negado</b>'
      + '<span>Homem não participa deste quiz. Ordens ' + esc(DELA) + '.</span>'
      + '<div class="foto" role="img" aria-label="modo sério"></div>'
      + '</div>';
  }

  function formularioOk(){
    var j = st.jogador;
    return !!(j.nome.trim() && j.genero && j.sexo) && !vetado();
  }

  function telaCadastro(){
    var j = st.jogador;
    var ok = formularioOk();
    return '<section class="screen card">'
      + '<p class="eyebrow">antes de começar</p>'
      + '<h2>Quem está respondendo?</h2>'
      + '<p class="lede" style="margin:8px 0 24px">Isso vai aparecer no ranking do lado da sua pontuação.</p>'

      + '<div class="field">'
      + '<label class="label" for="in-nome">Seu nome</label>'
      + '<input class="txt" id="in-nome" maxlength="24" placeholder="como você quer aparecer" value="' + esc(j.nome) + '">'
      + '</div>'

      + '<div class="field">'
      + '<span class="label" id="rot-genero">Gênero</span>'
      + '<div class="opts" role="group" aria-labelledby="rot-genero">' + grupoPills('genero', GENEROS, j.genero) + '</div>'
      + (vetado() ? blocoVeto() : '')
      + '</div>'

      + '<div class="field">'
      + '<span class="label" id="rot-sexo">Sexualidade</span>'
      + '<div class="opts" role="group" aria-labelledby="rot-sexo">' + grupoPills('sexo', SEXUALIDADES, j.sexo) + '</div>'
      + '</div>'

      + '<div class="stack">'
      + '<button class="btn btn-primary" data-acao="comecar"' + (ok ? '' : ' disabled') + '>' + textoBotaoComecar() + '</button>'
      + '<button class="btn btn-ghost" data-acao="capa">Voltar</button>'
      + '</div>'
      + '</section>';
  }

  function telaQuiz(){
    var q = st.ordem[st.i];
    var letras = ['A','B','C','D'];
    var respostas;

    if (q.multi){
      respostas = q.opcoes.map(function(o){
        var marcado = q.marcadas.indexOf(o.t) > -1;
        var estado = '';
        if (st.respondida){
          if (o.c) estado = ' data-estado="certa"';
          else if (marcado) estado = ' data-estado="errada"';
        }
        return '<button class="resp" data-acao="marcar" data-valor="' + esc(o.t) + '"'
          + ' aria-pressed="' + (marcado ? 'true' : 'false') + '"' + estado
          + (st.respondida ? ' disabled' : '') + '>'
          + '<span class="key">' + (marcado ? '✓' : '') + '</span>'
          + '<span>' + esc(o.t) + '</span></button>';
      }).join('');
    } else {
      respostas = q.opcoes.map(function(op, k){
        var estado = '';
        if (st.respondida){
          if (op === q.c) estado = ' data-estado="certa"';
          else if (op === q.escolhida) estado = ' data-estado="errada"';
        }
        return '<button class="resp" data-acao="responder" data-valor="' + esc(op) + '"' + estado
          + (st.respondida ? ' disabled' : '') + '>'
          + '<span class="key">' + letras[k] + '</span><span>' + esc(op) + '</span></button>';
      }).join('');
    }

    var confirmar = (q.multi && !st.respondida)
      ? '<button class="btn btn-primary" style="margin-top:16px" data-acao="confirmar"'
        + (q.marcadas.length ? '' : ' disabled') + '>Confirmar</button>'
      : '';

    var feedback = '';
    if (st.respondida){
      feedback = '<div class="nota pop">'
        + '<b style="color:' + (q.certo ? 'var(--good)' : 'var(--bad)') + '">'
        + (q.certo ? 'Acertou!' : (q.expirou ? 'Acabou o tempo' : 'Não foi dessa vez'))
        + '</b>'
        + '<span>' + esc(q.n) + '</span>'
        + (q.foto ? '<div class="foto" role="img" aria-label="' + esc(q.foto) + '"></div>' : '')
        + '</div>'
        + '<button class="btn btn-primary" style="margin-top:16px" data-acao="proxima">'
        + (st.i + 1 >= st.ordem.length ? 'Ver meu resultado' : 'Próxima pergunta') + '</button>';
    }

    return '<section class="screen card">'
      + '<div class="hud">'
      + '<span class="label">Pergunta ' + (st.i + 1) + ' de ' + st.ordem.length + '</span>'
      + '<span class="pontos">' + st.pontos + ' pts</span>'
      + '</div>'
      + '<div class="timer" id="barra-tempo"><i style="width:100%"></i></div>'
      + '<h2 class="pergunta"' + (q.multi ? ' style="margin-bottom:6px"' : '') + '>' + esc(q.p) + '</h2>'
      + (q.multi ? '<p class="label" style="margin-bottom:16px">marque todas que valem</p>' : '')
      + '<div class="respostas">' + respostas + '</div>'
      + confirmar
      + feedback
      + '</section>';
  }

  function statusPlacar(){
    if (st.salvando) return 'Salvando no ranking…';
    if (st.somenteLeitura) return 'Ranking salvo só neste aparelho.';
    if (st.erroRede) return 'Salvo neste aparelho — o banco não respondeu.';
    return 'Resultado salvo no ranking.';
  }

  function tituloDe(acertos){
    for (var k = 0; k < TITULOS.length; k++){
      if (acertos >= TITULOS[k].min) return TITULOS[k];
    }
    return TITULOS[TITULOS.length - 1];
  }

  function telaResultado(){
    var t = tituloDe(st.acertos);
    var pct = Math.round(st.acertos / st.ordem.length * 100);
    var posicao = st.ranking.findIndex(function(e){ return e.id === st.meuId; }) + 1;
    return '<section class="screen card ruled">'
      + '<div class="tape"></div>'
      + '<div class="placar">'
      + '<p class="eyebrow">sua pontuação</p>'
      + '<div class="n pop">' + st.pontos + '</div>'
      + '<p class="label">' + st.acertos + ' de ' + st.ordem.length + ' certas &middot; ' + pct + '%</p>'
      + '</div>'
      + '<div class="barra"><i style="width:' + pct + '%"></i></div>'
      + '<h2 style="margin-top:20px">' + esc(t.t) + '</h2>'
      + '<p class="lede" style="margin-top:6px">' + esc(t.d) + '</p>'
      + (posicao ? '<p class="hand" style="margin-top:14px">Você está em ' + posicao + 'º lugar no ranking.</p>' : '')
      + '<div class="stack" style="margin-top:22px">'
      + '<button class="btn btn-primary" data-acao="ranking">Ver o ranking</button>'
      + '<button class="btn btn-ghost" data-acao="copiar">Copiar meu resultado</button>'
      + '<button class="btn btn-ghost" data-acao="reiniciar">Jogar de novo</button>'
      + '</div>'
      + '<p class="aviso">' + statusPlacar() + '</p>'
      + '<p class="rodape" style="margin-top:16px">Lembrete permanente: ' + ELA + ' precisa de um Labubu azul.</p>'
      + '</section>';
  }

  function telaRanking(){
    var linhas = st.ranking.length
      ? st.ranking.map(function(e, k){
          var rotulo = [e.genero, e.sexualidade].filter(Boolean).join(' · ');
          return '<div class="linha"' + (k < 3 ? ' data-medalha="' + (k + 1) + '"' : '')
            + (e.id === st.meuId ? ' data-eu="1"' : '') + '>'
            + '<span class="pos">' + (k + 1) + '</span>'
            + '<span class="quem"><b>' + esc(e.nome) + '</b><span>' + esc(rotulo) + ' &middot; ' + e.acertos + '/' + e.total + '</span></span>'
            + '<span class="pts">' + e.pontos + '</span>'
            + '</div>';
        }).join('')
      : '<p class="vazio">Ninguém respondeu ainda.<br>Seja a primeira pessoa do ranking.</p>';

    return '<section class="screen card">'
      + '<p class="eyebrow">quem conhece mais</p>'
      + '<h2>Ranking</h2>'
      + '<div class="linhas">' + linhas + '</div>'
      + '<div class="stack" style="margin-top:22px">'
      + '<button class="btn btn-primary" data-acao="' + (st.meuId ? 'reiniciar' : 'cadastro') + '">'
      + (st.meuId ? 'Jogar de novo' : 'Quero responder também') + '</button>'
      + '<button class="btn btn-ghost" data-acao="capa">Voltar para a capa</button>'
      + '</div>'
      + '<p class="aviso">' + (st.somenteLeitura
          ? 'Este ranking está salvo só neste aparelho — quem abrir o link em outro celular começa o próprio.'
          : st.erroRede
            ? 'Não consegui falar com o banco agora. Você está vendo o ranking deste aparelho.'
            : 'Ranking compartilhado: todo mundo que abrir o link vê as mesmas pontuações.') + '</p>'
      + '</section>';
  }

  /* ---------------- render ---------------- */
  var raiz = document.getElementById('root');

  /* rolarTopo só quando a pessoa realmente avança de tela ou de pergunta —
     nunca num re-render feito por um clique dentro da tela atual. */
  function desenhar(rolarTopo){
    var html = '';
    if (st.tela === 'capa') html = telaCapa();
    else if (st.tela === 'cadastro') html = telaCadastro();
    else if (st.tela === 'quiz') html = telaQuiz();
    else if (st.tela === 'resultado') html = telaResultado();
    else if (st.tela === 'ranking') html = telaRanking();
    raiz.innerHTML = html;
    if (st.tela === 'quiz' && !st.respondida) iniciarTimer();
    if (rolarTopo){
      try { window.scrollTo({top: 0, behavior: 'instant'}); }
      catch (e) { window.scrollTo(0, 0); }
    }
  }

  /* ---------------- timer ---------------- */
  function pararTimer(){
    if (st.timer){ clearInterval(st.timer); st.timer = null; }
  }
  function iniciarTimer(){
    pararTimer();
    st.inicioQ = Date.now();
    var barra = document.getElementById('barra-tempo');
    var preenchimento = barra ? barra.querySelector('i') : null;
    st.timer = setInterval(function(){
      var passou = Date.now() - st.inicioQ;
      var resta = Math.max(0, TEMPO - passou);
      if (preenchimento){
        preenchimento.style.width = (resta / TEMPO * 100) + '%';
        if (resta < 5000) barra.classList.add('urgente');
      }
      if (resta <= 0) responder(null, true);
    }, 100);
  }

  /* ---------------- fluxo ---------------- */
  function comecar(){
    if (!formularioOk()) return;
    st.ordem = embaralhar(QUESTOES).map(function(q){
      if (q.multi){
        return {p:q.p, n:q.n, multi:true, opcoes: embaralhar(q.ops), marcadas: [], certo:false, expirou:false};
      }
      return {p:q.p, c:q.c, n:q.n, foto:q.foto, opcoes: embaralhar([q.c].concat(q.e)),
              escolhida: null, certo:false, expirou:false};
    });
    st.i = 0; st.pontos = 0; st.acertos = 0; st.respondida = false;
    st.meuId = null;
    st.inicioTudo = Date.now();
    st.tela = 'quiz';
    desenhar(true);
  }

  /* Numa questão de marcar várias, só vale o conjunto exato:
     todas as certas marcadas e nenhuma errada junto. */
  function conjuntoExato(q){
    var esperadas = q.opcoes.filter(function(o){ return o.c; });
    if (q.marcadas.length !== esperadas.length) return false;
    return esperadas.every(function(o){ return q.marcadas.indexOf(o.t) > -1; });
  }

  function responder(valor, porTempo){
    if (st.respondida) return;
    pararTimer();
    var q = st.ordem[st.i];
    if (q.multi){
      q.certo = conjuntoExato(q);
    } else {
      q.escolhida = valor;
      q.certo = valor === q.c;
    }
    q.expirou = !!porTempo;
    st.respondida = true;
    if (q.certo){
      var resta = Math.max(0, TEMPO - (Date.now() - st.inicioQ));
      st.acertos++;
      st.pontos += 100 + Math.round(50 * resta / TEMPO);
    }
    /* sem rolar: a correção aparece logo abaixo das alternativas */
    desenhar(false);
    var seguir = raiz.querySelector('[data-acao="proxima"]');
    if (seguir){
      seguir.focus({preventScroll: true});
      seguir.scrollIntoView({block: 'nearest'});
    }
  }

  function proxima(){
    if (st.i + 1 >= st.ordem.length) return finalizar();
    st.i++;
    st.respondida = false;
    desenhar(true);
  }

  function finalizar(){
    var j = st.jogador;
    var entrada = {
      id: novoId(),
      nome: j.nome.trim().slice(0, 24),
      genero: j.genero,
      sexualidade: j.sexo,
      pontos: st.pontos,
      acertos: st.acertos,
      total: st.ordem.length,
      ms: Date.now() - st.inicioTudo,
      quando: Date.now()
    };
    st.meuId = entrada.id;
    st.ranking = juntar(st.ranking, [entrada]);
    /* Guarda sempre no aparelho: se o banco estiver fora do ar, nada se perde. */
    lsGravar('cr_ranking', st.ranking.slice(0, 40));

    st.tela = 'resultado';
    desenhar(true);
    enviarPontuacao(entrada);
  }

  function copiarResultado(){
    var t = tituloDe(st.acertos);
    var txt = 'Fiz ' + st.pontos + ' pontos no ' + TITULO_PAGINA + ' (' + st.acertos + '/' + st.ordem.length + ') — ' + t.t + '.';
    var alvo = document.querySelector('[data-acao="copiar"]');
    function feito(ok){
      if (!alvo) return;
      alvo.textContent = ok ? 'Copiado!' : 'Não deu pra copiar';
      setTimeout(function(){ if (alvo) alvo.textContent = 'Copiar meu resultado'; }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(txt).then(function(){ feito(true); }, function(){ feito(false); });
    } else {
      feito(false);
    }
  }

  /* ---------------- eventos ---------------- */
  /* Selecionar gênero/sexualidade muda só os botões do grupo — sem redesenhar
     a tela, para a página não pular de volta pro topo no meio do formulário. */
  function marcarEscolha(pill, grupo){
    var irmaos = pill.parentNode.querySelectorAll('.pill');
    for (var k = 0; k < irmaos.length; k++){
      irmaos[k].setAttribute('aria-pressed', irmaos[k] === pill ? 'true' : 'false');
    }
    if (grupo === 'genero'){
      var veto = document.getElementById('veto');
      var campo = pill.closest('.field');
      if (vetado()){
        if (!veto && campo){
          campo.insertAdjacentHTML('beforeend', blocoVeto());
          chuvaDeDeslikes();
        }
      } else if (veto){
        veto.remove();
      }
    }
    atualizarBotaoComecar();
  }

  function atualizarBotaoComecar(){
    var b = raiz.querySelector('[data-acao="comecar"]');
    if (!b) return;
    b.textContent = textoBotaoComecar();
    if (formularioOk()) b.removeAttribute('disabled');
    else b.setAttribute('disabled', '');
  }

  function chuvaDeDeslikes(){
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var antiga = document.getElementById('chuva');
    if (antiga) antiga.remove();
    var camada = document.createElement('div');
    camada.id = 'chuva';
    camada.setAttribute('aria-hidden', 'true');
    for (var k = 0; k < 34; k++){
      var gota = document.createElement('span');
      gota.innerHTML = svgJoinha();
      gota.style.left = (Math.random() * 92) + '%';
      gota.style.width = Math.round(20 + Math.random() * 30) + 'px';
      gota.style.animationDuration = (2.1 + Math.random() * 1.9) + 's';
      gota.style.animationDelay = (Math.random() * 1.3) + 's';
      gota.style.setProperty('--giro', Math.round(-540 + Math.random() * 1080) + 'deg');
      camada.appendChild(gota);
    }
    document.body.appendChild(camada);
    setTimeout(function(){ if (camada.parentNode) camada.remove(); }, 5400);
  }

  raiz.addEventListener('click', function(ev){
    var pill = ev.target.closest('.pill');
    if (pill){
      guardarCampos();
      var grupo = pill.dataset.grupo;
      if (grupo === 'genero') st.jogador.genero = pill.dataset.valor;
      if (grupo === 'sexo') st.jogador.sexo = pill.dataset.valor;
      marcarEscolha(pill, grupo);
      return;
    }
    var botao = ev.target.closest('[data-acao]');
    if (!botao) return;
    var acao = botao.dataset.acao;

    if (acao === 'cadastro'){ st.tela = 'cadastro'; desenhar(true); }
    else if (acao === 'ranking'){ pararTimer(); st.tela = 'ranking'; desenhar(true); }
    else if (acao === 'capa'){ st.tela = 'capa'; desenhar(true); }
    else if (acao === 'comecar'){ guardarCampos(); comecar(); }
    else if (acao === 'responder'){ responder(botao.dataset.valor); }
    else if (acao === 'marcar'){ alternarMarca(botao, botao.dataset.valor); }
    else if (acao === 'confirmar'){ responder(null); }
    else if (acao === 'proxima'){ proxima(); }
    else if (acao === 'copiar'){ copiarResultado(); }
    else if (acao === 'reiniciar'){ st.tela = 'cadastro'; desenhar(true); }
  });

  /* Marcar/desmarcar mexe só no botão: redesenhar a tela reiniciaria o
     cronômetro e daria tempo infinito a quem ficasse clicando. */
  function alternarMarca(botao, valor){
    if (st.respondida) return;
    var q = st.ordem[st.i];
    var k = q.marcadas.indexOf(valor);
    if (k > -1) q.marcadas.splice(k, 1);
    else q.marcadas.push(valor);
    var marcado = k === -1;
    botao.setAttribute('aria-pressed', marcado ? 'true' : 'false');
    var chave = botao.querySelector('.key');
    if (chave) chave.textContent = marcado ? '✓' : '';
    var conf = raiz.querySelector('[data-acao="confirmar"]');
    if (conf){
      if (q.marcadas.length) conf.removeAttribute('disabled');
      else conf.setAttribute('disabled', '');
    }
  }

  function guardarCampos(){
    var n = document.getElementById('in-nome');
    if (n) st.jogador.nome = n.value;
  }

  raiz.addEventListener('input', function(ev){
    if (!ev.target.classList.contains('txt')) return;
    guardarCampos();
    atualizarBotaoComecar();
  });

  raiz.addEventListener('keydown', function(ev){
    if (ev.key === 'Enter' && ev.target.classList.contains('txt')){
      ev.preventDefault();
      guardarCampos();
      if (formularioOk()) comecar();
    }
  });

  document.addEventListener('keydown', function(ev){
    if (st.tela !== 'quiz') return;
    if (st.respondida){
      if (ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); proxima(); }
      return;
    }
    var q = st.ordem[st.i];

    if (q.multi){
      if (ev.key === 'Enter'){
        ev.preventDefault();
        if (q.marcadas.length) responder(null);
        return;
      }
      var n = ['1','2','3','4','5','6'].indexOf(ev.key);
      if (n > -1 && q.opcoes[n]){
        var alvo = raiz.querySelectorAll('[data-acao="marcar"]')[n];
        if (alvo) alternarMarca(alvo, q.opcoes[n].t);
      }
      return;
    }

    var k = ['a','b','c','d'].indexOf(ev.key.toLowerCase());
    if (k === -1) k = ['1','2','3','4'].indexOf(ev.key);
    if (k > -1) responder(q.opcoes[k]);
  });

  carregarRanking();

  desenhar(true);
})();
