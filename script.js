function init() {

  const world = {
    width: 16,
    height: 16
  }
  

  const canvas = document.querySelector('#canvas')
  
  canvas.width = window.innerWidth * 3
  canvas.height = window.innerHeight
  
  
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

    // gravity: true,

    large: false,
    speed: 0,
    roi: 1,
    x: 160,
    y: canvas.height - 300,
    y_velocity: 0,
    x_velocity: 0,
    jumping: false,
    jump_val: 0,
    upPressed: false,
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
      slide_r: {
        coords: [331, 0],
        dimensions: [14, 16]
      },
      slide_l: {
        coords: [60, 0],
        dimensions: [14, 16]
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

    initialise() {
      this.currentSprite = this.sprites.stand_r
    },

    jump() {
      if (this.jumping && this.jump_val > -5) {
        this.jump_val -= 0.5
      }
      this.y_velocity -= this.jump_val
    },


    drawMario() {
      const mario = new Image()
      if (this.jumping === true) {
        if (leftPressed === true) {
          this.currentSprite = this.sprites.jumping_l
        } else {
          this.currentSprite = this.sprites.jumping_r
        }
      } else if (rightPressed === true) {
        if (this.x_velocity < 0) {
          this.currentSprite = this.sprites.slide_r
        } else if (!this.sprites.walk_r.includes(this.currentSprite)) {
          this.currentSprite = this.sprites.walk_r[0]
        } else if (this.frame_steps >= 5) {
          if (this.sprites.walk_r.indexOf(this.currentSprite) === this.sprites.walk_r.length - 1) {
            this.currentSprite = this.sprites.walk_r[0]
          } else {
            this.currentSprite = this.sprites.walk_r[this.sprites.walk_r.indexOf(this.currentSprite) + 1]
          }
        }
      } else if (leftPressed === true) {
        if (this.x_velocity > 0) {
          this.currentSprite = this.sprites.slide_l
        } else if (!this.sprites.walk_l.includes(this.currentSprite)) {
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

  class Pipe {
    constructor(locationX, locationY, height) {
      this.location = [locationX, locationY]
      this.srcCoordsCenter = [0, 144]
      this.srcCoordsTop = [0, 128],
      this.height = height
    }
  }

  let pipes = [
    [28, 3, 1],
    [38, 3, 2],
    [46, 3, 3],
    [57, 3, 3]
  ]


  class Brick {
    constructor(locationX, locationY) {
      this.location = [locationX, locationY]
      this.srcCoords  = [272, 112]
      // this.src = 'sprites/block_sheet.png'
    }
  }

  let bricks = [
    [20, 6],
    [22, 6],
    [24, 6],
    [77, 6],
    [79, 6],
    [80, 10],
    [81, 10],
    [81, 10],
    [82, 10],
    [83, 10],
    [84, 10],
    [85, 10],
    [86, 10],
    [87, 10]
  ]

  bricks = bricks.map(brick => new Brick(brick[0], brick[1]))

  pipes = pipes.map(pipe => new Pipe(pipe[0], pipe[1], pipe[2]))

  const pipeImg = new Image()
  pipeImg.src = 'sprites/tiles.png'

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
        // 0,
        // 0,
        brick.srcCoords[0],
        brick.srcCoords[1],
        world.width,
        world.height,
        brick.location[0] * world.width,
        window.innerHeight - brick.location[1] * world.height,
        world.width,
        world.height,
      )
    })
  }

  function drawPipes() {
    pipes.forEach(pipe => {
      for (let i = 0; i < pipe.height; i++) {
        ctx.drawImage(
          pipeImg,
          pipe.srcCoordsCenter[0],
          pipe.srcCoordsCenter[1],
          world.width * 2,
          world.height,
          pipe.location[0] * world.width,
          window.innerHeight - (pipe.location[1] + i) * world.height,
          world.width * 2,
          world.height,
        )
      }
      ctx.drawImage(
        pipeImg,
        pipe.srcCoordsTop[0],
        pipe.srcCoordsTop[1],
        world.width * 2,
        world.height,
        pipe.location[0] * world.width,
        window.innerHeight - (pipe.location[1] + pipe.height) * world.height,
        world.width * 2,
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
      

      if (marioObj.x_velocity < 0) {
        marioObj.x_velocity += 0.1
      } else if (marioObj.x_velocity < 2) {
        marioObj.x_velocity += 0.05
        
      }
      if (pipeSideCollision(marioObj.x + marioObj.x_velocity)) {
        marioObj.x = pipeSideCollision(marioObj.x + marioObj.x_velocity) - marioObj.currentSprite.dimensions[0] - 1
        return
      }

      marioObj.x += marioObj.x_velocity

      // if (pipeCollision()) marioObj.x -= marioObj.x_velocity
      
    } else if (leftPressed) {

      
      if (marioObj.x >= screenLeft + marioObj.x_velocity) {
        
        if (marioObj.x_velocity > 0) {
          
          marioObj.x_velocity -= 0.1
        } else if (marioObj.x_velocity > -2) marioObj.x_velocity -= 0.05

        if (pipeSideCollision(marioObj.x + marioObj.x_velocity)) {
          marioObj.x_velocity = 0
          return
        }
        
        marioObj.x += marioObj.x_velocity
      }
    } else {
      if (marioObj.x_velocity > 0.1) {
        marioObj.x_velocity -= 0.1
        if (pipeSideCollision(marioObj.x + marioObj.x_velocity)) {
          return
        }

        marioObj.x += marioObj.x_velocity
      } else if (marioObj.x_velocity < -0.1) {
        marioObj.x_velocity += 0.1
        if (pipeSideCollision(marioObj.x + marioObj.x_velocity)) {
          marioObj.x_velocity = 0
          return
        }
        marioObj.x += marioObj.x_velocity
      } else {
        marioObj.x_velocity = 0
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
    } else if (e.key === 'up' || e.key === 'ArrowUp') {
      marioObj.upPressed = false
    }
  }
  
  function keyDownEvent(e) {
    if (e.key === 'right' || e.key === 'ArrowRight') {
      e.preventDefault()
      // if (!rightPressed) marioObj.x_velocity = 0
      rightPressed = true
    } else if (e.key === 'left' || e.key === 'ArrowLeft') {
      e.preventDefault()
      // if (!leftPressed) marioObj.x_velocity = 0
      leftPressed = true
    } else if (e.key === 'up' || e.key === 'ArrowUp') {
      if (!marioObj.jumping) {
        // marioObj.gravity = true
        marioObj.jumping = true
        marioObj.y_velocity -= 3
        marioObj.upPressed = true
      }
    }
  }
  
  function gravity() {
    // if (marioObj.gravity) {
    marioObj.y_velocity += 0.2
    if (marioObj.upPressed && marioObj.y_velocity > -2.25) marioObj.y_velocity -= 0.15
    marioObj.y += marioObj.y_velocity
    // marioObj.y_velocity *= 1
    // }
  }

  function pipeSideCollision(newPos) {
    let collision
    pipes.forEach(pipe => {
      if (
        marioObj.y + marioObj.currentSprite.dimensions[1] >= window.innerHeight - (pipe.height * world.height) - (world.height * 2) &&
        newPos + marioObj.currentSprite.dimensions[0] >= pipe.location[0] * world.width &&
        newPos <= (pipe.location[0] * world.width) + (world.width * 2)
      ) {
        collision = pipe.location[0] * world.width
      }
    }) 
    return collision
  }

  function pipeTopCollision() {
    let collision
    pipes.forEach(pipe => {
      if (
        marioObj.y + marioObj.currentSprite.dimensions[1] >= window.innerHeight - ((pipe.height + 1) * world.height) - (world.height * 2) &&
        marioObj.x + marioObj.currentSprite.dimensions[0] >= pipe.location[0] * world.width &&
        marioObj.x <= (pipe.location[0] * world.width) + (world.width * 2)
      ) {
        console.log(marioObj.x + marioObj.currentSprite.dimensions[0], pipe.location[0] * world.width)
        // marioObj.gravity = false
        marioObj.y = window.innerHeight - ((pipe.height + 1) * world.height) - (floorObj.height * 2 ) - marioObj.currentSprite.dimensions[1]
        marioObj.y_velocity = 0
        marioObj.jumping = false
      }
    }) 
    return collision
  }
  
  function floorCollision() {
    ground.forEach(groundSet => {
      if (
        marioObj.y >= groundSet.height &&
        marioObj.x >= groundSet.width[0] - marioObj.currentSprite.dimensions[0] &&
        marioObj.x <= groundSet.width[1]
      ) {
        // marioObj.gravity = false
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
    drawPipes()
    gravity()
    floorCollision()
    moveX()
    pipeTopCollision()
    // marioObj.jump()
    marioObj.drawMario()
    scrollMap()
    requestAnimationFrame(draw)
  }

  marioObj.initialise()
  draw()
  
  
  
  window.addEventListener('keydown', keyDownEvent)
  window.addEventListener('keyup', keyUpEvent)
}



window.addEventListener('DOMContentLoaded', init)