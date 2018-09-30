import { getMousePosition, toTwoDecimals } from './utils'

class Sniffer {
  constructor({ interval = 100 } = {}) {
    this.interval = interval // In milliseconds

    this.mouseMoveInterval = undefined

    this.previousMousePosition = undefined
    this.currentMousePosition = undefined
    this.previousMouseSpeed = undefined

    this.movementTimeline = []
    this.speedTimeline = []
    this.accelerationTimeline = []
  }

  setMousePosition = (event) => {
    this.currentMousePosition = getMousePosition(event)
  }

  onMouseMove = () => {
    let mouseMovement
    let mouseSpeed
    let mouseAcceleration

    if (this.previousMousePosition) {
      mouseMovement = {
        x: this.currentMousePosition.x - this.previousMousePosition.x,
        y: this.currentMousePosition.y - this.previousMousePosition.y,
      }

      // Speed
      mouseSpeed = {
        x: toTwoDecimals(Math.abs(mouseMovement.x) * 1000 / this.interval),
        y: toTwoDecimals(Math.abs(mouseMovement.y) * 1000 / this.interval),
      } // In px/second

      // Acceleration
      if (this.previousMouseSpeed) {
        mouseAcceleration = {
          x: (mouseSpeed.x - this.previousMouseSpeed.x) * 1000 / this.interval,
          y: (mouseSpeed.y - this.previousMouseSpeed.y) * 1000 / this.interval,
        }
      }

      // Update timelines if was some movement
      if (mouseMovement.x !== 0 || mouseMovement.y !== 0) {
        this.movementTimeline.push(mouseMovement)
        this.speedTimeline.push(mouseSpeed)
        this.accelerationTimeline.push(mouseAcceleration)
      }
    }

    this.previousMouseSpeed = mouseSpeed
    this.previousMousePosition = this.currentMousePosition
  }

  run = () => {
    // Start setting mouse position
    document.onmousemove = this.setMousePosition

    this.onMouseMove()
    this.mouseMoveInterval = setInterval(this.onMouseMove, this.interval)

    console.log('Started sniffing...')
  }

  stop = () => {
    // Stop setting mouse position
    document.onmousemove = undefined

    // Clear interval
    clearInterval(this.mouseMoveInterval)
    this.mouseMoveInterval = undefined

    console.log('Stopped sniffing...')

    console.log('Timelines:')
    console.log(JSON.stringify(this.movementTimeline))
    console.log(JSON.stringify(this.speedTimeline))
    console.log(JSON.stringify(this.accelerationTimeline))
  }
}

export default Sniffer
