const scoreEl = document.querySelector('#scoreEl')
const canvas = document.querySelector('canvas')
//Get all the contexts for a 2d game
const context = canvas.getContext('2d')

//Set the sixe of the canvas
canvas.width = innerWidth
canvas.height = innerHeight

//Create a player
class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = './img/spaceship.png'
        image.onload= () => {
            const scale = 0.15
            this.image = image
            this.width = image.width  * scale
            this.height = image.height * scale
            this.position = {
                //left right
                x: canvas.width / 2 - this.width / 2,
                //up down
                y: canvas.height - this.height - 30
            }
        }
    }
    draw() {
        // context.fillStyle = 'red'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)
        if (this.image) {
            context.drawImage(this.image, this.position.x, this.position.y,
                this.width = 100, this.height = 100)
        }
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
    }
}

const player = new Player()
player.draw()

function animate() {
    requestAnimationFrame(animate)
    //set the background colour
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)

    player.draw()
}

animate()

addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'a':
            console.log('left')
            break
        case 'd':
            console.log('right')
            break
        case ' ':
            console.log('shoot')
            break
    }
})