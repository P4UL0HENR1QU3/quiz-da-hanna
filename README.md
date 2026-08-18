# Quiz da Hanna

Vinte perguntas sobre a Hanna, com cronômetro, pontuação por rapidez e ranking.
Página única, sem framework e sem etapa de build — é só abrir o `index.html`.

**Jogar:** https://p4ul0henr1qu3.github.io/quiz-da-hanna/

## Como funciona

- **20 perguntas**, embaralhadas a cada partida, com as alternativas também fora de ordem.
  Todo mundo responde o mesmo conjunto, então o ranking é justo.
- **20 segundos por pergunta.** Acerto vale 100 pontos mais um bônus de até 50 pela
  rapidez, o que evita empates no topo.
- **Uma pergunta aceita várias respostas** (a dos medos). Vale o conjunto exato:
  marcar de menos ou de mais conta como erro.
- **Teclado:** `A`–`D` ou `1`–`4` respondem, `Enter` avança. Na pergunta de marcar
  várias, `1`–`6` alternam e `Enter` confirma.
- Homem não passa do cadastro. É proposital.

## Estrutura

```
index.html          página
css/estilo.css      estilos, tema claro e escuro, layout de celular
js/app.js           perguntas, telas e regras do jogo
js/placar.js        onde as pontuações são guardadas
sql/tabela.sql      tabela e permissões do banco
img/                fotos usadas no quiz
```

## Ranking compartilhado (opcional)

Sem configurar nada, o quiz funciona e cada aparelho guarda o próprio ranking.
Para que todo mundo veja o mesmo placar, ligue um banco:

1. Crie um projeto em [supabase.com](https://supabase.com) — dá para entrar com o GitHub.
2. Em **SQL Editor**, cole o conteúdo de [`sql/tabela.sql`](sql/tabela.sql) e clique em **Run**.
3. Em **Project Settings → Data API**, copie a **URL** e a chave **anon public**.
4. Preencha as duas no topo de [`js/placar.js`](js/placar.js):

```js
var CONFIG = {
  url: 'https://xxxxxxxx.supabase.co',
  chave: 'eyJhbGciOi...'
};
```

A chave `anon` é feita para ficar visível no navegador — quem protege são as regras
de acesso do `tabela.sql`, que liberam apenas leitura e inserção. Ninguém consegue
editar nem apagar pontuação alheia.

Para zerar o ranking, rode no SQL Editor:

```sql
delete from public.pontuacoes;
```

Se o banco estiver fora do ar, a pontuação continua sendo salva no aparelho e a tela
avisa em vez de fingir que deu certo.

## Personalizar

O nome fica numa constante só, no alto do `js/app.js`:

```js
var NOME_DELA = 'Hanna';
```

As perguntas estão logo abaixo, no array `QUESTOES`. Cada uma tem o enunciado (`p`),
a resposta certa (`c`), as erradas (`e`) e a curiosidade que aparece depois (`n`).
Adicionar `foto: 'descrição'` faz aparecer uma imagem na correção — o CSS dessa foto
fica em `.nota .foto`.
