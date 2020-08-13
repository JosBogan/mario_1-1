


// // let currentSprite = 0
// // const marioWalkCycle = ['sprites/mario-walk-1.png', 'sprites/mario-walk-2.png', 'sprites/maio-walk-3.png', 'sprites/maio-walk-4.png']

// var mario = new Image()
// mario.src = 'sprites/mario-still80.png'


const canvas = document.querySelector('#canvas')

canvas.width = window.innerWidth * 2
canvas.height = window.innerHeight

console.log(window.innerHeight)

let screenLeft = 0
let screenRight = window.innerWidth
let scroll = 0

const marioObj = {
  x: 160,
  y: canvas.height - 240,
  y_velocity: 0,
  x_velocity: 0,
  jumping: false,
  image_state: 1,
  frame_steps: 0
}

let rightPressed = false
let leftPressed = false
var ctx = document.getElementById('canvas').getContext('2d')

const block = new Image()
block.src = 'sprites/ground_block80.png'

const mario = new Image()
mario.src = 'sprites/mario-still80.png'

const ground = [
  {
    height: canvas.height -  240,
    width: [0, 80 * 69]
  }
]

function drawFloor(){
  for (var a = 1; a < 3; a++) {
    for (var i = 0; i < 69; i++) {
      ctx.drawImage(block, i * 80, window.innerHeight - (a * 80))
    }
  }
  
}

function drawMario() {
  const mario = new Image()
  if (rightPressed === true) {
    console.log(marioObj.frame_steps)
    if (marioObj.frame_steps < 5) {
      mario.src = 'sprites/mario-walk-1.png'
    } else if (marioObj.frame_steps < 10) {
      mario.src = 'sprites/mario-walk-2.png'
    } else if (marioObj.frame_steps < 15) {
      mario.src = 'sprites/mario-walk-3.png'
    } else if (marioObj.frame_steps < 20) {
      mario.src = 'sprites/mario-walk-4.png'
    } else {
      mario.src = 'sprites/mario-walk-1.png'
      marioObj.frame_steps = 0
    }
    marioObj.frame_steps += 1
  } else {
    mario.src = 'sprites/mario-still80.png'
  }
  ctx.drawImage(mario, marioObj.x, marioObj.y)
}

function moveX() {
  if (rightPressed) {
    marioObj.x += 10
  } else if (leftPressed) {
    if (marioObj.x >= screenLeft + 10) {
      marioObj.x -= 10
    }
  }
}

function scrollMap() {
  if (
    rightPressed === true && 
    marioObj.x >= (((screenLeft + screenRight) / 2) - ((screenRight - screenLeft) / 10))
  ) {
    scroll += 10
    screenLeft += 10
    screenRight += 10
    canvas.style.transform = `scale(0.7) translate(-${scroll}px, 0)`
  }
}


function keyUpEvent() {
  if (event.key === 'right' || event.key === 'ArrowRight') {
    rightPressed = false
    // mario.src = 'sprites/mario-still80.png'
  } else if (event.key === 'left' || event.key === 'ArrowLeft') {
    leftPressed = false
    // mario.src = 'sprites/mario-still80.png'
  }
}

function keyDownEvent() {
  if (event.key === 'right' || event.key === 'ArrowRight') {
    event.preventDefault()
    rightPressed = true
  } else if (event.key === 'left' || event.key === 'ArrowLeft') {
    event.preventDefault()
    leftPressed = true
  } else if (event.key === 'up' || event.key === 'ArrowUp') {
    if (!marioObj.jumping) {
      marioObj.jumping = true
      marioObj.y_velocity -= 30
    }
  }
}

function gravity() {
  marioObj.y_velocity += 1.3
  marioObj.y += marioObj.y_velocity
  marioObj.y_velocity *= 1
}

function floorCollision() {
  ground.forEach(groundSet => {
    if (
      marioObj.y >= groundSet.height &&
      marioObj.x >= groundSet.width[0] &&
      marioObj.x <= groundSet.width[1]
    ) {
      marioObj.y = canvas.height -  240
      marioObj.y_velocity = 0
      marioObj.jumping = false
    }
  })
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawFloor()
  gravity()
  floorCollision()
  moveX()
  drawMario()
  scrollMap()
  requestAnimationFrame(draw)
}
draw()



window.addEventListener('keydown', keyDownEvent)
window.addEventListener('keyup', keyUpEvent)