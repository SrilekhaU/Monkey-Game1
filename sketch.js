//varibles for:
//monkey
var monkey , monkey_running, monkey_stop;

//ground
var ground;

//banana
var banana ,bananaImage;

//obstacles
var obstacle, obstacleImage;

//groups
var bananaGroup, obstacleGroup;

//invisible sprite
var invisprite;

//scores
var score = 0;

//game state
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  //loading images for:
  //monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_stop = loadAnimation("sprite_7.png");

  //banana
  bananaImage = loadImage("banana.png");
  
  //obstacles
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //creating the canvas
  createCanvas(400,400);
  
  //creating the monkey
  monkey = createSprite(100,300,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  //creating the ground
  ground = createSprite(200,370,800,10);
  ground.velocityX = -3;
  
  //creating the groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  //setting the background to light green
  background("lightgreen");
  
  if(gameState == PLAY){
  //making the monkey jump when space key is pressed
  if(keyDown("space") && monkey.y >= 200){
    monkey.velocityY = -14;
  }
  
    //making the monkey take the bananas
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
  }
    
  //giving the gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.8;

  //giving the scrolling ground
  if(ground.x < 0){
  ground.x = ground.width/2;
  }
  
  //making the monkey collide to the ground
  monkey.collide(ground);

  //giving the score by time
  score = score + Math.round(getFrameRate()/60);
  textSize(20);
  fill("black");
  text("Survival Time : " + score,10,30);

  //presenting the functions
  food();
  obstacles();
  }
  
  if(gameState == END){
    //obstacles, bananas and ground
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.destroyEach();
    bananaGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    
    //text addition
    textSize(20);
    fill("black");
    text("Oh no! Click on monkey to restart", 50, 200);
    
    //monkey
    monkey.collide(ground);
    monkey.velocityY = monkey.velocityY + 0.8;
    
    //scores
    text("Survival Time : " + score,10,30);
  }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  
  //making the game restart
  if(mousePressedOver(monkey) && gameState == END){
    gameState = PLAY;
    score = 0;
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
  }
  
  //draw sprites
  drawSprites();
}

function food(){
  
  //creating the banana after every 80 frames
  if(frameCount%80 == 0){
    banana = createSprite(200,100,10,10);
    banana.addImage("food", bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120,200));
    banana.velocityX = -3;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}

function obstacles(){
  
  //creating the obstacles
  if(frameCount%300 == 0){
    obstacle = createSprite(200,350,10,10);
    obstacle.addImage("breaks", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}



