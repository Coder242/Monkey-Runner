var play = 1 , end = 0;
var gamestate = play;
var monkey , monkey_running , ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score=0 , surtime=0 ;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,500);
  
  monkey = createSprite(50,450,20,20);
  monkey.setCollider("rectangle",0,0,550,600);
  monkey.addAnimation("running", monkey_running);
  
  monkey.scale = 0.15;
  
  ground = createSprite(300,490,1200,20);
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  
}


function draw() {
  
  background(220);
  
  text("Survival Time: "+surtime,10,30);
  
  if(gamestate == play){
    
    surtime = surtime + Math.round(getFrameRate()/40);
    
    ground.velocityX = -6;
    
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&&monkey.y>=435){
    
      monkey.velocityY = -20;
    
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    food();
    ob();
    
  }
  
  if(monkey.isTouching(foodGroup)){
    
    score = score+1;
    foodGroup.destroyEach();
    
  }
  
  if(monkey.isTouching(obstacleGroup)){
    
    gamestate = end;
    
  }
  
  if(gamestate == end){
    
    monkey.velocityY = 0;
    
    ground.velocityX = 0;
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
  }
  
  monkey.collide(ground);
  
  drawSprites();
  
  text("Score: "+score,490,30);
  
}

function food(){
  
  if(frameCount % 80 == 0){
    
    banana = createSprite(620,random(150,380),10,10)
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
    
    banana.lifetime = 120;
    
    foodGroup.add(banana);
    
  }
  
}

function ob(){
  
  if(frameCount % 120 == 0){
    
    obstacle = createSprite(620,440,100,100)
    obstacle.setCollider("circle",0,0,200)
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.21;
    obstacle.velocityX = -6;
    
    obstacle.lifetime = 120;
    
    obstacleGroup.add(obstacle);
    
  }   
  
}


