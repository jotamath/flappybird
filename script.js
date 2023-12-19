var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Carregando imagens
var bird = new Image();
bird.src = "images/bird.png"
var bg = new Image();
bg.src = "images/bg.png"
var chao = new Image();
chao.src = "images/chao.png"
var canocima = new Image();
canocima.src = "images/canocima.png"
var canobaixo = new Image();
canobaixo.src = "images/canobaixo.png"

// variáveis
var eec = 100;
var constant;
var bX = 33;
var bY = 200;
var gravity = 1.4;
var Pontos = 0;
var cano = [];

cano[0] = {
    x: canvas.width,
    y: 0
}

//Sons
var fly = new Audio();
fly.src = "sounds/fly.mp3";
var score = new Audio();
score.src = "sounds/score.mp3";

    //captura de tecla
    document.addEventListener("keydown", voa);

    //voando
    function voa(){
        bY = bY-28;
        fly.play();
    }

function jogo(){
    //fundo do jogo
    ctx.drawImage(bg, 0, 0);

    //criando os canos
    for(let i=0; i< cano.length; i++){
        //posição do cano de baixo
        constant = canocima.height + eec;
        //config do cano de cima
        ctx.drawImage(canocima, cano[i].x, cano[i].y);
        //config do cano de baixo
        ctx.drawImage(canobaixo, cano[i].x, cano[i].y+constant);
        //movimentação do cano
        cano[i].x = cano[i].x - 1
        if(cano[i].x == 125){
            cano.push({
                x: canvas.width,
                y: Math.floor(Math.random()*canocima.height)-canocima.height
            })
        }
        //COLISÕES
        //Pássaro entre as bordas do cano
        if(bX + bird.width >= cano[i].x && bX <= cano[i].x + canocima.width 
            //colisão com o cano de cima ou o de baixo
            && (bY<= cano[i].y+canocima.height || bY+bird.height>= cano[i].y+constant)
            //ou se encostar no chão
            || bY + bird.height >= canvas.height - chao.height){
            location.reload();
        }

        //marcando os pontos
        if(cano[i].x == 5){
            Pontos++;
            score.play();
        }
    }
   

    //desenhando o chão
    ctx.drawImage(chao,0,canvas.height-chao.height);

    //passaro
    ctx.drawImage(bird,bX,bY);
    bY += gravity;
    
    //Criando o placar
    ctx.fillStyle = "#20162B";
    ctx.font = "20px Arial";
    ctx.fillText("Placar: "+ Pontos, 10, canvas.height-20);


    requestAnimationFrame(jogo);
}

jogo();
