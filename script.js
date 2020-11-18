function init() {

  const world = {
    width: 16,
    height: 16
  }
  

  const canvas = document.querySelector('#canvas')
  
  canvas.width = window.innerWidth * 3
  canvas.height = window.innerHeight
  
  console.log(window.innerHeight)
  
  let screenLeft = 0
  let screenRight = window.innerWidth
  let scroll = 0
  const width = 16
  
  const floorObj = {
    srcX: 0,
    srcY: 32,
    height: 16,
    width: 16
  }
  
  const marioObj = {

    large: false,
    speed: 2,
    x: 160,
    y: canvas.height - 300,
    y_velocity: 0,
    x_velocity: 0,
    jumping: false,
    // walk_state: 0,
    frame_steps: 0,
    sprites: {
      stand_r: {
        coords: [211, 0],
        dimensions: [13, 16]
      },
      stand_l: {
        coords: [181, 0],
        dimensions: [13, 16]
      },
      jumping_r: {
        coords: [359, 0],
        dimensions: [17, 16]
      },
      jumping_l: {
        coords: [29, 0],
        dimensions: [17, 16]
      },
      walk_r: [
        {
          coords: [241, 0],
          dimensions: [14, 15]
        },
        {
          coords: [272, 0],
          dimensions: [12, 16]
        },
        {
          coords: [300, 0],
          dimensions: [16, 16]
        }
      ],
      walk_l: [
        {
          coords: [150, 0],
          dimensions: [14, 15]
        },
        {
          coords: [121, 0],
          dimensions: [12, 16]
        },
        {
          coords: [89, 0],
          dimensions: [16, 16]
        }
      ]
    },

    currentSprite: null,


    drawMario() {
      const mario = new Image()
      if (this.jumping === true) {
        if (leftPressed === true) {
          this.currentSprite = this.sprites.jumping_l
        } else {
          this.currentSprite = this.sprites.jumping_r
        }
      } else if (rightPressed === true) {
        if (!this.sprites.walk_r.includes(this.currentSprite)) {
          this.currentSprite = this.sprites.walk_r[0]
        } else if (this.frame_steps >= 5) {
          if (this.sprites.walk_r.indexOf(this.currentSprite) === this.sprites.walk_r.length - 1) {
            this.currentSprite = this.sprites.walk_r[0]
          } else {
            this.currentSprite = this.sprites.walk_r[this.sprites.walk_r.indexOf(this.currentSprite) + 1]
          }
        }
      } else if (leftPressed === true) {
        if (!this.sprites.walk_l.includes(this.currentSprite)) {
          this.currentSprite = this.sprites.walk_l[0]
        } else if (this.frame_steps >= 5) {
          if (this.sprites.walk_l.indexOf(this.currentSprite) === this.sprites.walk_l.length - 1) {
            this.currentSprite = this.sprites.walk_l[0]
          } else {
            this.currentSprite = this.sprites.walk_l[this.sprites.walk_l.indexOf(this.currentSprite) + 1]
          }
        }
      } else {
        this.currentSprite = this.sprites.stand_r
      }
      if (this.large) {
        this.height = 32
      } else {
        this.height = 20
      }
      mario.src = 'sprites/mario_char_sprites.png'
      // console.log(this.sprites.stand_r[0])
      ctx.drawImage(
        mario, 
        this.currentSprite.coords[0],
        this.currentSprite.coords[1],
        this.currentSprite.dimensions[0],
        this.currentSprite.dimensions[1],
        this.x, 
        this.y,
        this.currentSprite.dimensions[0],
        this.currentSprite.dimensions[1],
      )
      this.countSteps()
    },

    countSteps() {
      this.frame_steps >= 5 ? this.frame_steps = 0 : this.frame_steps++
    }

  }


  class Brick {
    constructor(locationX, locationY) {
      this.location = [locationX, locationY]
      this.srcCoords  = [112, 272]
      // this.src = 'sprites/block_sheet.png'
    }
  }

  let bricks = [
    [21, 6],
    [23, 6],
    [25, 6] 
  ]

  bricks = bricks.map(brick => new Brick(brick[0], brick[1]))

  const brickImg = new Image()
  brickImg.src = 'sprites/block_sheet.png'

  
  let rightPressed = false
  let leftPressed = false
  var ctx = document.getElementById('canvas').getContext('2d')
  
  const block = new Image()
  block.src = 'sprites/mix_sheet.png'
  
  // const mario = new Image()
  // mario.src = 'sprites/mario-still80.png'
  
  const ground = [
    {
      height: canvas.height - (world.width * 3),
      width: [0, world.width * 69],
      start: 0,
      number: 69
    },
    {
      height: canvas.height - (world.width * 3),
      width: [world.width * 71, world.width * 86],
      start: 71,
      number: 15
    },
    {
      height: canvas.height - (world.width * 3),
      width: [world.width * 89, world.width * 153],
      start: 89,
      number: 64
    },
    {
      height: canvas.height - (world.width * 3),
      width: [world.width * 155, world.width * 299],
      start: 155,
      number: 53
    }
  ]

  function  drawBricks() {
    bricks.forEach(brick => {
      ctx.drawImage(
        brickImg,
        brick.srcCoords[0],
        brick.srcCoords[1],
        world.width,
        world.height,
        brick.location[0] * world.width,
        window.innerHeight - brick.location[0] * world.height,
        world.width,
        world.height,
      )
    })
  }
  
  
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
            i * world.width, // Destination X
            window.innerHeight - (a * world.width), // Destination Y
            floorObj.width, // Destination Height
            floorObj.height // Destionation Width
          )
        }
      }
    })
  
    
  }
  
  
  function moveX() {
    if (rightPressed) {
      if (marioObj.x_velocity < 3) marioObj.x_velocity += 0.2
      // marioObj.x += marioObj.speed // ! No Velocity
      marioObj.x += marioObj.x_velocity
    } else if (leftPressed) {
      // if (marioObj.x >= screenLeft + marioObj.speed) { // ! No Velocity
      if (marioObj.x >= screenLeft + marioObj.x_velocity) {
        // marioObj.x -= marioObj.speed // ! No Velocity
        if (marioObj.x_velocity > -3) marioObj.x_velocity -= 0.2
        // marioObj.x -= marioObj.x_velocity // ! Using - positive speed rather than + negative speed
        marioObj.x += marioObj.x_velocity
      }
    }
  }
  
  function scrollMap() {
    if (
      rightPressed === true && 
      marioObj.x >= (((screenLeft + screenRight) / 2) - ((screenRight - screenLeft) / 10)) &&
      scroll < ((ground[ground.length - 1].start + ground[ground.length - 1].number) * width) - window.innerWidth
    ) {
      // scroll += marioObj.speed
      // screenLeft += marioObj.speed
      // screenRight += marioObj.speed
      scroll += marioObj.x_velocity
      screenLeft += marioObj.x_velocity
      screenRight += marioObj.x_velocity
      canvas.style.transform = `translate(-${scroll}px, 0)`
    }
  }
  
  
  function keyUpEvent(e) {
    if (e.key === 'right' || e.key === 'ArrowRight') {
      rightPressed = false
    } else if (e.key === 'left' || e.key === 'ArrowLeft') {
      leftPressed = false
    }
  }
  
  function keyDownEvent(e) {
    if (e.key === 'right' || e.key === 'ArrowRight') {
      e.preventDefault()
      rightPressed = true
    } else if (e.key === 'left' || e.key === 'ArrowLeft') {
      e.preventDefault()
      leftPressed = true
    } else if (e.key === 'up' || e.key === 'ArrowUp') {
      if (!marioObj.jumping) {
        marioObj.jumping = true
        marioObj.y_velocity -= 10
      }
    }
  }
  
  function gravity() {
    marioObj.y_velocity += 1.1
    marioObj.y += marioObj.y_velocity
    marioObj.y_velocity *= 1
  }
  
  function floorCollision() {
    ground.forEach(groundSet => {
      if (
        marioObj.y >= groundSet.height &&
        marioObj.x >= groundSet.width[0] - marioObj.currentSprite.dimensions[0] &&
        marioObj.x <= groundSet.width[1]
      ) {
        marioObj.y = canvas.height - ((floorObj.height * 2 ) + marioObj.currentSprite.dimensions[1])
        marioObj.y_velocity = 0
        marioObj.jumping = false
      }
    })
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBricks()
    drawFloor()
    gravity()
    floorCollision()
    moveX()
    marioObj.drawMario()
    scrollMap()
    requestAnimationFrame(draw)
  }
  draw()
  
  
  
  window.addEventListener('keydown', keyDownEvent)
  window.addEventListener('keyup', keyUpEvent)
}



window.addEventListener('DOMContentLoaded', init)