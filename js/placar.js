/* ============================================================
   Placar — onde as pontuações ficam guardadas.

   Enquanto CONFIG estiver em branco, o quiz funciona normalmente,
   mas cada aparelho guarda o próprio ranking (localStorage).
   Preencha os dois campos abaixo e o ranking passa a ser único
   para todo mundo, sem precisar mexer em mais nada.

   Como preencher (Supabase, plano gratuito):
     1. supabase.com  ->  entre com o GitHub  ->  New project
     2. SQL Editor  ->  cole o conteúdo de sql/tabela.sql  ->  Run
     3. Project Settings -> Data API:
          URL          ->  cole em CONFIG.url
          anon public  ->  cole em CONFIG.chave

   A chave "anon" é feita para ficar visível no navegador: quem
   manda são as regras (RLS) definidas em sql/tabela.sql, que
   liberam apenas ler e inserir — ninguém apaga nem edita nada.
   ============================================================ */

var Placar = (function () {
  'use strict';

  var CONFIG = {
    url: '',      /* ex.: https://abcdefgh.supabase.co */
    chave: ''     /* a chave anon public */
  };

  var TABELA = 'pontuacoes';
  var LIMITE = 100;

  function ativo(){
    return !!(CONFIG.url && CONFIG.chave);
  }

  function endereco(caminho){
    return CONFIG.url.replace(/\/+$/, '') + '/rest/v1/' + caminho;
  }

  function cabecalhos(extras){
    var h = {
      apikey: CONFIG.chave,
      Authorization: 'Bearer ' + CONFIG.chave,
      'Content-Type': 'application/json'
    };
    if (extras) for (var k in extras) h[k] = extras[k];
    return h;
  }

  /* O banco guarda colunas em snake_case; a tela usa outros nomes. */
  function daLinha(l){
    return {
      id: l.id,
      nome: l.nome,
      genero: l.genero,
      sexualidade: l.sexualidade,
      pontos: l.pontos,
      acertos: l.acertos,
      total: l.total,
      ms: l.ms,
      quando: Date.parse(l.criado_em) || 0
    };
  }

  function paraLinha(e){
    return {
      id: e.id,
      nome: e.nome,
      genero: e.genero,
      sexualidade: e.sexualidade,
      pontos: e.pontos,
      acertos: e.acertos,
      total: e.total,
      ms: e.ms
    };
  }

  function checar(r){
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r;
  }

  function listar(){
    if (!ativo()) return Promise.resolve([]);
    var q = '?select=*&order=pontos.desc,ms.asc&limit=' + LIMITE;
    return fetch(endereco(TABELA) + q, { headers: cabecalhos() })
      .then(checar)
      .then(function (r) { return r.json(); })
      .then(function (linhas) { return linhas.map(daLinha); });
  }

  function enviar(entrada){
    if (!ativo()) return Promise.resolve(null);
    return fetch(endereco(TABELA), {
      method: 'POST',
      headers: cabecalhos({ Prefer: 'return=minimal' }),
      body: JSON.stringify(paraLinha(entrada))
    }).then(checar);
  }

  return { ativo: ativo, listar: listar, enviar: enviar };
})();
