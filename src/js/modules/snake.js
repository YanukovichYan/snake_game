export class Snake {

    currentDirection = 'right'

    snake = [
        {x: 10, y: 20},
    ]

    context = null
    positionsCount = null
    positionsSize = null

    constructor(context, positionsCount, positionsSize) {
        this.context = context
        this.positionsCount = positionsCount
        this.positionsSize = positionsSize

        this.addKeyboardHandler()

    }

    addKeyboardHandler() {
        document.addEventListener('keydown', (event) => {
            // switch (event.key) {
            //     case 'ArrowUp' && this.currentDirection !== 'down':
            //         this.currentDirection = 'up'
            //         break
            //     case 'ArrowDown' && this.currentDirection !== 'up':
            //         this.currentDirection = "down"
            //         break
            //     case 'ArrowLeft':
            //         this.currentDirection = "left"
            //         break
            //     case 'ArrowRight':
            //         this.currentDirection = "right"
            //         break
            // }

            if (event.key === 'ArrowUp' && this.currentDirection !== 'down') {
                this.currentDirection = 'up'
            } else if (event.key === 'ArrowDown' && this.currentDirection !== 'up') {
                this.currentDirection = 'down'
            } else if (event.key === 'ArrowLeft' && this.currentDirection !== 'right') {
                this.currentDirection = 'left'
            } else if (event.key === 'ArrowRight' && this.currentDirection !== 'left') {
                this.currentDirection = 'right'
            }
        })
    }

    showSnake(foodPosition) {

        let result = {
            gotFood: false,
            collision: false
        }

        for (let i = 0; i < this.snake.length; i++) {
            this.context.fillStyle = 'black'
            this.context.beginPath()
            this.context.fillRect(
                ((this.snake[i].x * this.positionsSize) - this.positionsSize),
                ((this.snake[i].y * this.positionsSize) - this.positionsSize),
                this.positionsSize, this.positionsSize)
        }

        let newHeadPosition = {
            x: this.snake[0].x,
            y: this.snake[0].y,
        }

        if (foodPosition && foodPosition.x === newHeadPosition.x && foodPosition.y === newHeadPosition.y) {
            result.gotFood = true
            console.log('ЕДА')
        } else {
            this.snake.pop()
        }
        // console.log(foodPosition)
        if (this.currentDirection === 'left') {

            if (newHeadPosition.x === 1) {
                newHeadPosition.x = this.positionsCount
            } else {
                newHeadPosition.x -= 1
            }
        } else if (this.currentDirection === 'right') {
            if (newHeadPosition.x === this.positionsCount) {
                newHeadPosition.x = 1
            } else {
                newHeadPosition.x += 1
            }
        } else if (this.currentDirection === 'up') {
            if (newHeadPosition.y === 1) {
                newHeadPosition.y = this.positionsCount
            } else {
                newHeadPosition.y -= 1
            }
        } else if (this.currentDirection === 'down') {
            if (newHeadPosition.y === this.positionsCount) {
                newHeadPosition.y = 1
            } else {
                newHeadPosition.y += 1
            }
        }

        if (!this.checkNewHeadPositionForCollision(newHeadPosition)) {
            this.snake.unshift(newHeadPosition)
        } else {
            result.collision = true
        }

        return result

        // console.log(newHeadPosition)
        // console.log(this.currentDirection)
        // console.log(this.snake)
    }


    checkNewHeadPositionForCollision(newHeadPosition) {
        for (let i = 0; i < this.snake.length; i++) {
            if (newHeadPosition.x === this.snake[i].x && newHeadPosition.y === this.snake[i].y) {
                return true
            }
        }
        return false
    }
}