console.log('Flappy Bird');

/*
Adicionar uma tag 'img' através do JS

  const img = new Image();
  img.src = './index.jpeg';
  document.body.appendChild(img);

  const img2 = document.createElement('img');
  img2.src = './index.jpeg';
  document.body.appendChild(img2);

*/
const sprites = new Image();
sprites.src = './sprites.png';

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// plano de fundo
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,

  desenha: function() {
    
    /*
    function draw() {
      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
          contexto.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' +
                          Math.floor(255 - 42.5 * j) + ',0)';
          contexto.fillRect(j * 25, i * 25, 25, 25);
        }
      }
    }
    */

    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(
      0, 0, // se refere onde a cor que nós aplicamos acima irá começar a desenhar
      canvas.width, canvas.height // se refere onde a cor terminará de desenhar
    );
    
    // drawImage() oferece diferentes maneiras de se desenhar uma imagem na tela
    contexto.drawImage(
      sprites, // referente a imagem que nós queremos
      planoDeFundo.spriteX, planoDeFundo.spriteY, // sprite x e sprite y (se refere aos pixels da imagem)
      planoDeFundo.largura, planoDeFundo.altura, // tamanho do recorte da sprite
      planoDeFundo.x, planoDeFundo.y, // se refere a posição dessa nossa imagem dentro do canvas
      planoDeFundo.largura, planoDeFundo.altura // qual vai ser o heigth e width da nossa imagem dentro do canvas
    );
    
    contexto.drawImage(
      sprites, // referente a imagem que nós queremos
      planoDeFundo.spriteX, planoDeFundo.spriteY, // sprite x e sprite y (se refere aos pixels da imagem)
      planoDeFundo.largura, planoDeFundo.altura, // tamanho do recorte da sprite
      planoDeFundo.x + planoDeFundo.largura, planoDeFundo.y, // se refere a posição dessa nossa imagem dentro do canvas
      planoDeFundo.largura, planoDeFundo.altura // qual vai ser o heigth e width da nossa imagem dentro do canvas
    );

  }
}

// [mensagemGetReady]
const mensagemGetReady = {
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width / 2) - 174/2,
  y: 50,

  desenha() {
    contexto.drawImage(
      sprites, // referente a imagem que nós queremos
      mensagemGetReady.spriteX, mensagemGetReady.spriteY, // sprite x e sprite y (se refere aos pixels da imagem)
      mensagemGetReady.largura, mensagemGetReady.altura, // tamanho do recorte da sprite
      mensagemGetReady.x, mensagemGetReady.y, // se refere a posição dessa nossa imagem dentro do canvas
      mensagemGetReady.largura, mensagemGetReady.altura // qual vai ser o heigth e width da nossa imagem dentro do canvas
    );
  }
}











// chão
function criarChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    // fixo: 224 * 2,
    // chao1: 0,
    // chao2: 0 + 224,
    // chao3: 0 + (224 * 2),
  
    atualiza() {
      console.log('É preciso movimentar o chão');
      const movimento = 1;
      const repeteEm = chao.largura / 2;

      // if(chao.chao1 <= -chao.largura){
      //   chao.chao1 = chao.fixo;
      // } else if(chao.chao2 <= -chao.largura) {
      //   chao.chao2 = chao.fixo;
      // } else if(chao.chao3 <= -chao.largura) {
      //   chao.chao3 = chao.fixo;
      // }

      const movimentacao = chao.x - movimento;
      
      // chao.chao1 -= movimento;
      // chao.chao2 -= movimento;
      // chao.chao3 -= movimento;

      console.log('[chao.x]', chao.x);
      console.log('[repeteEm]', repeteEm);
      console.log('[Movimentação]', movimentacao % repeteEm);

      chao.x = movimentacao % repeteEm;
    },
  
    desenha: function() {
      contexto.drawImage(
        sprites, // referente a imagem que nós queremos
        chao.spriteX, chao.spriteY, // sprite x e sprite y (se refere aos pixels da imagem)
        chao.largura, chao.altura, // tamanho do recorte da sprite
        chao.x, chao.y, // se refere a posição dessa nossa imagem dentro do canvas
        chao.largura, chao.altura // qual vai ser o heigth e width da nossa imagem dentro do canvas
      );
  
      contexto.drawImage(
        sprites, // referente a imagem que nós queremos
        chao.spriteX, chao.spriteY, // sprite x e sprite y (se refere aos pixels da imagem)
        chao.largura, chao.altura, // tamanho do recorte da sprite
        chao.x + chao.largura, chao.y, // se refere a posição dessa nossa imagem dentro do canvas
        chao.largura, chao.altura // qual vai ser o heigth e width da nossa imagem dentro do canvas
      );
    }
  }
  return chao;
}

// flappy bird
function criarFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,

    pulo: 4.6,
    velocidade: 0,
    gravidade: 0.25,

    pula() {
      console.log('DEVO PULAR...');
      console.log('[Antes do pulo]' + flappyBird.velocidade);
      flappyBird.velocidade = -flappyBird.pulo;
      console.log('[Depois do pulo]' + flappyBird.velocidade);
    },
    
    atualiza() {

      if(fazColisao(flappyBird, globais.chao)) {
        console.log("FEZ COLISÃO...");

        som_HIT.play();
        setTimeout(() => {
          mudarParaTela(Telas.INICIO);
        }, 500);

        return;
      }
      flappyBird.velocidade += flappyBird.gravidade;
      flappyBird.y += flappyBird.velocidade;
    },

    movimentos: [
      { spriteX: 0, spriteY: 0 }, // asa para cima
      { spriteX: 0, spriteY: 26}, // asa no meio
      { spriteX: 0, spriteY: 52}  // asa para baixo
    ],

    desenha: function() {
      const { spriteX, spriteY } = flappyBird.movimentos[0];

      contexto.drawImage(
        sprites, // referente a imagem que nós queremos
        spriteX, spriteY, // sprite x e sprite y (se refere aos pixels da imagem)
        flappyBird.largura, flappyBird.altura, // tamanho do recorte da sprite
        flappyBird.x, flappyBird.y, // se refere a posição dessa nossa imagem dentro do canvas
        flappyBird.largura, flappyBird.altura // qual vai ser o heigth e width da nossa imagem dentro do canvas
      );
    }
  }
  return flappyBird;
}

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if(flappyBirdY >= chaoY) {
    return true;
  }
  return false;
}




const globais = {};
let telaAtiva;
//
// [Telas]
//
const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criarFlappyBird();
      globais.chao = criarChao();
    },
    desenha() {
      planoDeFundo.desenha();
      globais.chao.desenha();
      mensagemGetReady.desenha();
      globais.flappyBird.desenha();
    },
    click() {
      mudarParaTela(Telas.JOGO);
    },
    atualiza() {
      globais.chao.atualiza();
    }
  },

  JOGO: {
    desenha() {
      planoDeFundo.desenha();
      globais.chao.desenha();
      globais.flappyBird.desenha();
    },
    click() {
      globais.flappyBird.pula();
    },
    atualiza() {
      globais.flappyBird.atualiza();
      globais.chao.atualiza();
    }
  }
}

function mudarParaTela(novaTela) {
  telaAtiva = novaTela;

  if(telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}












function loopOfAnimation() {
  telaAtiva.atualiza();
  telaAtiva.desenha();
  requestAnimationFrame(loopOfAnimation);
}












canvas.addEventListener('click', function() {
  if(telaAtiva.click){
    telaAtiva.click();
  }
});

mudarParaTela(Telas.INICIO);
loopOfAnimation();
