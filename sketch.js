
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var PLAY=1;
var END=0;
var gameState = PLAY;
function preload(){
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  monkey_collided = loadAnimation("sprite_0.png")
  restartimg= loadImage("restart1.jpg")
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  
  monkey = createSprite(50,height-80,20,50);
  monkey.addAnimation("running",monkey_running);
  
  monkey.scale = 0.1;
  
  ground = createSprite(width/2,height-70,width,2);
  
  ground.x = ground.width /10;

  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();

  monkey.setCollider("circle",0,0,300);
  monkey.debug=true;
  score = 0;
  restart = createSprite(width/2,height/2,20,20)
  restart.addImage("res",restartimg)
  restart.visible=false
}

function draw() {
  
  background("white");
  //displaying score
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
    ground.velocityX = -(6 + score/100)
    if(monkey.isTouching(bananaGroup)){
      score = score + 1;
      bananaGroup[0].destroy();
    }
    if (ground.x < 400){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& monkey.y >=  300) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    if(monkey.isTouching(obstaclesGroup)){
        gameState = END;
    }
    spawnBananas();
    spawnObstacles();
    
  }
   else if (gameState === END) {
     textSize(20)
     stroke("black")
     fill("black")
     text("GAME OVER",width/2-60,width/2-50)
     restart.visible=true
     if(mousePressedOver(restart)&& gameState===END){
       reset();
     }
      ground.velocityX = 0;
      monkey.velocityY = 0;
      obstaclesGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0); 
     //monkey.addAnimation("running",monkey_collided)
   }
  monkey.collide(ground);
  drawSprites();
}
function reset(){
  gameState = PLAY;
  monkey.addAnimation("running",monkey_running);
  obstaclesGroup.destroyEach ();
  bananaGroup.destroyEach();
  score =0;
  
  restart.visible=false
}

function spawnObstacles(){
 if (frameCount % 70 === 0){
   var obstacle = createSprite(600,height-80,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage("stone",obstaceImage)          
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }
}

function spawnBananas() {
 
  if (frameCount % Math.round(random(80,110)) === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(height-150,height-200));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -(6 + score/100);
    banana.lifetime = 200;
     
    bananaGroup.add(banana);
  }
}