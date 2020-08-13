


// // let currentSprite = 0
// // const marioWalkCycle = ['sprites/mario-walk-1.png', 'sprites/mario-walk-2.png', 'sprites/maio-walk-3.png', 'sprites/maio-walk-4.png']

// var mario = new Image()
// mario.src = 'sprites/mario-still80.png'


const canvas = document.querySelector('#canvas')

canvas.width = window.innerWidth * 3
canvas.height = window.innerHeight

console.log(window.innerHeight)

let screenLeft = 0
let screenRight = window.innerWidth
let scroll = 0
const currentFrame = 0
const width = 16

const floorObj = {
  srcX: 0,
  srcY: 32,
  height: 16,
  width: 16
}

const marioObj = {
  large: false,
  srcX: 15,
  srcY: 1,
  height: 32,
  width: 12,
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

// ! size 80
// const block = new Image()
// block.src = 'sprites/ground_block80.png'

// ! Size 16
const block = new Image()
block.src = 'sprites/mix_sheet.png'

const mario = new Image()
mario.src = 'sprites/mario-still80.png'

// ! Size 80
// const ground = [
//   {
//     height: canvas.height -  240,
//     width: [0, 80 * 69]
//   }
// ]

// ! Size 16
const ground = [
  {
    height: canvas.height - (width * 3),
    width: [0, width * 69],
    start: 0,
    number: 69
  },
  {
    height: canvas.height - (width * 3),
    width: [width * 71, width * 86],
    start: 71,
    number: 15
  },
  {
    height: canvas.height - (width * 3),
    width: [width * 89, width * 153],
    start: 89,
    number: 64
  },
  {
    height: canvas.height - (width * 3),
    width: [width * 155, width * 299],
    start: 155,
    number: 53
  }
]


// ! Size 16
function drawFloor(){

  ground.forEach(groundSet => {
    for (let a = 1; a < 3; a++) {
      for (let i = groundSet.start; i < (groundSet.start + groundSet.number); i++) {
        ctx.drawImage(
          block, // Item
          floorObj.srcX, // SourceX
          floorObj.srcY,  // SourceY
          floorObj.width, // SourceWidth
          floorObj.height, // SourceHeight
          i * width, // Destination X
          window.innerHeight - (a * width), // Destination Y
          floorObj.width, // Destination Height
          floorObj.height // Destionation Width
        )
      }
    }
  })

  
}

function drawMario() {
  const mario = new Image()
  if (rightPressed === true) {
    console.log('right')
  }
  if (marioObj.large) {
    marioObj.height = 32
  } else {
    marioObj.height = 16
  }
  mario.src = 'sprites/character_sheet.png'
  ctx.drawImage(
    mario, 
    19,
    0,
    // marioObj.large ? marioObj.srcY * marioObj.height : (marioObj.srcY * marioObj.height) + (marioObj.height / 2),
    marioObj.width,
    marioObj.height,
    marioObj.x, 
    marioObj.y,
    marioObj.width,
    marioObj.height
  )
}

// function updateFrame() {
//   currentFrame = ++currentFrame
// }

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
    marioObj.x >= (((screenLeft + screenRight) / 2) - ((screenRight - screenLeft) / 10)) &&
    scroll < ((ground[ground.length - 1].start + ground[ground.length - 1].number) * width) - window.innerWidth
  ) {
    scroll += 10
    screenLeft += 10
    screenRight += 10
    canvas.style.transform = `translate(-${scroll}px, 0)`
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
      marioObj.y_velocity -= 10
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
      marioObj.x >= groundSet.width[0] - marioObj.width &&
      marioObj.x <= groundSet.width[1]
    ) {
      marioObj.y = canvas.height - 48
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