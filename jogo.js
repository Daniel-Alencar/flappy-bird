console.log('Flappy Bird');
let frames = 0;
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

function criarObstaculos() {
  const obstaculos = {
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 0 + 52,
      spriteY: 169,
    },

    largura: 52,
    altura: 400,
    espacamentoEntreCanos: 100,
    espacoEntreObstaculos: 175,

    canoChaoY: 300,
    canoCeuY: 300 - 400 - 100,
    canos1X: 350,
    canos2X: 350 + 175,
    canos3X: 350 + (175 * 2),
  
    atualiza() {
      const movimento = 1;

      obstaculos.canos1X -= movimento;
      obstaculos.canos2X -= movimento;
      obstaculos.canos3X -= movimento;
    },
  
    desenha() {

      if(obstaculos.canos1X <= -obstaculos.largura) {
        console.log('Entrou no 1');
        obstaculos.canos1X = (obstaculos.espacoEntreObstaculos * 3) + (obstaculos.largura * 2);

      } else if(obstaculos.canos2X <= -obstaculos.largura) {
        console.log('Entrou no 2');
        obstaculos.canos2X = (obstaculos.espacoEntreObstaculos * 3) + (obstaculos.largura * 2);

      } else if(obstaculos.canos3X <= -obstaculos.largura) {
        console.log('Entrou no 3');
        obstaculos.canos3X = (obstaculos.espacoEntreObstaculos * 3) + (obstaculos.largura * 2);

      }

      // obstáculo 1
      // cano do chao
      contexto.drawImage(
        sprites,
        obstaculos.chao.spriteX, obstaculos.chao.spriteY,
        obstaculos.largura, obstaculos.altura,
        obstaculos.canos1X, obstaculos.canoChaoY,
        obstaculos.largura, obstaculos.altura
      );

      // cano do céu
      contexto.drawImage(
        sprites,
        obstaculos.ceu.spriteX, obstaculos.ceu.spriteY,
        obstaculos.largura, obstaculos.altura,
        obstaculos.canos1X, obstaculos.canoCeuY,
        obstaculos.largura, obstaculos.altura
      );



      // obstáculo 2
      // cano do chao
      contexto.drawImage(
        sprites,
        obstaculos.chao.spriteX, obstaculos.chao.spriteY,
        obstaculos.largura, obstaculos.altura,
        obstaculos.canos2X, obstaculos.canoChaoY,
        obstaculos.largura, obstaculos.altura
      );
      
      // cano do céu
      contexto.drawImage(
        sprites,
        obstaculos.ceu.spriteX, obstaculos.ceu.spriteY,
        obstaculos.largura, obstaculos.altura,
        obstaculos.canos2X, obstaculos.canoCeuY,
        obstaculos.largura, obstaculos.altura
      );



      // obstáculo 3
      // cano do chao
      contexto.drawImage(
        sprites,
        obstaculos.chao.spriteX, obstaculos.chao.spriteY,
        obstaculos.largura, obstaculos.altura,
        obstaculos.canos3X, obstaculos.canoChaoY,
        obstaculos.largura, obstaculos.altura
      );
      
      // cano do céu
      contexto.drawImage(
        sprites,
        obstaculos.ceu.spriteX, obstaculos.ceu.spriteY,
        obstaculos.largura, obstaculos.altura,
        obstaculos.canos3X, obstaculos.canoCeuY,
        obstaculos.largura, obstaculos.altura
      );
    }
  }
  return obstaculos;
}
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
      // console.log('É preciso movimentar o chão');
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

      // console.log('[chao.x]', chao.x);
      // console.log('[repeteEm]', repeteEm);
      // console.log('[Movimentação]', movimentacao % repeteEm);

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
      // console.log('DEVO PULAR...');
      // console.log('[Antes do pulo]' + flappyBird.velocidade);
      flappyBird.velocidade = -flappyBird.pulo;
      // console.log('[Depois do pulo]' + flappyBird.velocidade);
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
    frameAtual: 0,
    atualizaOFrameAtual() {

      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao;
      }

      // console.log('[incremento]', incremento);
      // console.log('[baseRepeticao]', baseRepeticao);
      // console.log('[frame]', incremento % baseRepeticao);
    },

    desenha: function() {
      /*

      var index = 0;
      if(frames % 20 < 10){
        index = 1;
      } else if((frames - 10) % 40 < 10) {
        index = 0;
      } else if((frames - 30) % 40 < 10) {
        index = 2;
      }
      const { spriteX, spriteY } = flappyBird.movimentos[index];
      
      */

      flappyBird.atualizaOFrameAtual();
      const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

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
    inicializa() {
      globais.obstaculos = criarObstaculos();
    },
    desenha() {
      planoDeFundo.desenha();
      globais.chao.desenha();
      globais.obstaculos.desenha();
      globais.flappyBird.desenha();
    },
    click() {
      globais.flappyBird.pula();
    },
    atualiza() {
      globais.flappyBird.atualiza();
      globais.chao.atualiza();
      globais.obstaculos.atualiza();
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
  frames++;
  requestAnimationFrame(loopOfAnimation);
}












canvas.addEventListener('click', function() {
  if(telaAtiva.click){
    telaAtiva.click();
  }
});

mudarParaTela(Telas.INICIO);
loopOfAnimation();
