var dog, eat, dogimg, eatimg;
var database, food = 0, foodstock;

function preload() {
	dogimg = loadImage("images/dogImg.png");
  eatimg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(225, 350, 10, 10);
  dog.addImage(dogimg);
  dog.scale = 0.2;
  foodstock = database.ref("Food").on("value", Read_Stock);
}

function draw() {
  background(46, 139, 87);
  fill("black");
  textSize(20);
  text("Food - " + food, 175, 225);
  if(keyWentDown("UP_ARROW")) {
    dog.addImage(eatimg);
    Write_Stock();
    console.log("UP ARROW");
  } else {
    dog.addImage(dogimg);
  }
  text("NOTE: Press UP Arrow Key to Feed Drago Milk", 50, 50);
  drawSprites();
}

function Read_Stock(data) {
  food = data.val();
}

function Write_Stock() {
  if(food > 0) {
    database.ref("/").update({'Food': food-1});
  }
}