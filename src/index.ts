import { CanvasView } from "./view/CanvasView";
import { Chicken } from "./services/Chicken";
import { StarShip } from "./services/StarShip";
import { Collision } from "./Colision";

// Image
import STARSHIP_IMAGE from '/images/spaceship.png';
// Level and colors
import { PADDLE_WIDTH, PADDLE_HEIGHT, BALL_SPEED, PADDLE_SPEED, BALL_STARTX, BALL_STARTY, BRICK_HEIGHT, BALL_SIZE, PADDLE_STARTX, LEVEL1, LEVEL2 } from "./setup";
import { createBoss, createChickens, createHeart, hpRemaining, sumEnergyChicken } from "./extensions/helper";
import { drawAndMoveChicken, drawAndMoveEgg, drawAndMoveGift, moveStarShip, shootingBullet } from "./extensions/move.extensions";
import { SingletonStarShip } from "./design/singleton/SingletonStarShip";




let score = 0;
let gameOver = false;
let sumEnergy = 0;



function setGameOver(view: CanvasView) {
  view.drawInfo("Game Over!");
  gameOver = false;
}

function setGameWin(view: CanvasView) {
  view.drawInfo("Game Won!");
}

function gameLoop(view: CanvasView, chickens: Chicken[], starShip: SingletonStarShip, conlision: Collision) {

  view.clear();

  drawAndMoveChicken(chickens, view);
  drawAndMoveEgg(starShip, conlision, chickens, view);
  moveStarShip(starShip, view);
  shootingBullet(starShip, view, conlision, chickens);
  drawAndMoveGift(conlision, view, starShip);


  view.drawSprite(starShip);
  view.drawHeart(createHeart(starShip.heart));
  view.drawMeat(conlision.countMeat.toString());
  view.drawCoin(conlision.countCoin.toString());

  view.drawHP(hpRemaining(sumEnergy, sumEnergyChicken(chickens)));

  if(starShip.level === 0) return setGameOver(view);
  if(conlision.checkCollidingStarshipWithChickens(chickens, starShip)) return setGameOver(view);
  if(chickens.length === 0) {
    chickens = createBoss(LEVEL2);
    sumEnergy = sumEnergyChicken(chickens);
    view.drawChicken(chickens);
  }
  if(gameOver) return setGameOver(view);

  requestAnimationFrame(() => gameLoop(view, chickens, starShip, conlision))
}


function startGame(view: CanvasView) {

  // const users = userServices.getListUser();
  // console.log(users);

  score = 0;
  view.drawInfo('');
  view.drawScore("Score: 0");
  const collision = new Collision();
  const chickens = createChickens(LEVEL1);
  sumEnergy = sumEnergyChicken(chickens);
  const startShip = SingletonStarShip.getInstance(view);
  //const startShip1 = new StarShip(PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, {x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5}, STARSHIP_IMAGE, 3, -1);
  gameLoop(view, chickens, startShip, collision);
}

const view = new CanvasView("#playField"); 
view.initStartButton(startGame)


