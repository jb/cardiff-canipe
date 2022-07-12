const scoreEl = document.querySelector('#scoreEl')
const canvas = document.querySelector('canvas')
//Get all the contexts for a 2d games
const c = canvas.getContext('2d')

//Set the sixe of the canvas
canvas.width = innerWidth
canvas.height = innerHeight

//Player class
class Player {
    constructor() {
      this.velocity = {
        x: 0,
        y: 0
      }
  
      this.rotation = 0
      this.opacity = 1
  
      const image = new Image()
      image.src = './img/bottle_large.png'
      image.onload = () => {
        const scale = 0.15
        this.image = image
        this.width = image.width * scale
        this.height = image.height * scale
        this.position = {
          x: canvas.width / 2 - this.width / 2,
          y: canvas.height - this.height - 20
        }
      }
    }
  
    draw() {
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    }
  
    update() {
      if (this.image) {
        this.draw()
        this.position.x += this.velocity.x
      }
    }
  }
  
  //Canape class
  class Canape {
    constructor() {
      this.velocity = {
        x: 0,
        y: 0
      }
  
      this.rotation = 0
      this.opacity = 1
  
      const image = new Image()
      image.src = './img/canape_small.png' //Conditional statement or function to determine size?
      image.onload = () => {
        const scale = 0.7 + randomBetween(0,1) //Spawn with random size for now (needs more work as larger canapes will need more shots so size needs tracking)
        this.image = image
        this.width = image.width * scale
        this.height = image.height * scale
        this.position = {
          //Spawn at random x value
          x: randomBetween(0,canvas.width) - this.width / 2,
          y: this.height
        }
      }
    }
  
    draw() {
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    }
  
    update() {
      if (this.image) {
        this.draw() 
        this.position.x += this.velocity.x
        this.position.y += 1.5
      }
    }
  }
  
  //Player projectile
  class Projectile {
    constructor({ position, velocity, color = 'red' }) {
      this.position = position
      this.velocity = velocity
  
      this.radius = 4
      this.color = color
    }
  
    draw() {
      c.beginPath()
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
      c.fillStyle = this.color
      c.fill()
      c.closePath()
    }
  
    update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }
  
  function randomBetween(min, max) {
    return Math.random() * (max - min) + min
  }
  
  const player = new Player()
  const canapes = []
  
  const keys = {
    a: {
      pressed: false
    },
    d: {
      pressed: false
    }
  }
  
  let frames = 0
  let game = {
    over: false,
    active: true
  }
  
  function animate() {
    if (!game.active) return
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height) 
    player.update()
  
    
    if (keys.a.pressed && player.position.x >= 0) {
      player.velocity.x = -7
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
      player.velocity.x = 7
    } else {
      player.velocity.x = 0
    }
  
    if (frames % 100 ===0) {
      canapes.push(new Canape)
    }
  
    canapes.forEach(Canape => {
      Canape.update()
    })
  
    frames++
  }
  
  animate()
  
  addEventListener('keydown', ({ key }) => {
    if (game.over) return
  
    switch (key) {
      case 'a':
        keys.a.pressed = true
        break
      case 'd':
        keys.d.pressed = true
        break
    }
  })
  
  addEventListener('keyup', ({ key }) => {
    switch (key) {
      case 'a':
        keys.a.pressed = false
        break
      case 'd':
        keys.d.pressed = false
        break
    }
  })