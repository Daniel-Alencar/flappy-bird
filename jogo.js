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

// chão
const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,

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

// flappy bird
const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  velocidade: 0,
  gravidade: 0.25,
  atualiza() {
    flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    console.log(flappyBird.velocidade); 
    flappyBird.y = flappyBird.y + flappyBird.velocidade;
  },
  desenha: function() {

    contexto.drawImage(
      sprites, // referente a imagem que nós queremos
      flappyBird.spriteX, flappyBird.spriteY, // sprite x e sprite y (se refere aos pixels da imagem)
      flappyBird.largura, flappyBird.altura, // tamanho do recorte da sprite
      flappyBird.x, flappyBird.y, // se refere a posição dessa nossa imagem dentro do canvas
      flappyBird.largura, flappyBird.altura // qual vai ser o heigth e width da nossa imagem dentro do canvas
    );

  }
}

//
// [Telas]
//
let telaAtiva;

function mudarParaTela(novaTela) {
  telaAtiva = novaTela;
}

const Telas = {
  INICIO: {
    desenha() {
      planoDeFundo.desenha();
      chao.desenha();
      mensagemGetReady.desenha();
      flappyBird.desenha();
    },
    click() {
      mudarParaTela(Telas.JOGO);
    },
    atualiza() {

    }
  },

  JOGO: {
    desenha() {
      planoDeFundo.desenha();
      chao.desenha();
      flappyBird.desenha();
    },
    click() {
      mudarParaTela(Telas.INICIO);
    },
    atualiza() {
      flappyBird.atualiza();
    }
  }
}

function loop() {
  telaAtiva.atualiza();
  telaAtiva.desenha();
  requestAnimationFrame(loop);
}




canvas.addEventListener('click', function() {
  if(telaAtiva.click){
    telaAtiva.click();
  }
});

mudarParaTela(Telas.INICIO);
loop();
