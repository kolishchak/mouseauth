import { getMousePosition, isStandBy } from './utils'

class Sniffer {
  constructor({ interval = 100 } = {}) {
    this.interval = interval

    this.mouseMoveInterval = null
    this.previousMousePosition = null
    this.currentMousePosition = null
  }

  setMousePosition = (event) => {
    this.currentMousePosition = getMousePosition(event)
  }

  onMouseMove = () => {
    let mousePositionDelta

    if (this.previousMousePosition !== null) {
      mousePositionDelta = {
        x: this.currentMousePosition.x - this.previousMousePosition.x,
        y: this.currentMousePosition.y - this.previousMousePosition.y,
      }

      if (!isStandBy(mousePositionDelta)) {
        console.log(mousePositionDelta)
      }
    }

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
    document.onmousemove = null

    // Clear interval
    clearInterval(this.mouseMoveInterval)
    this.mouseMoveInterval = null

    // Set defaults
    this.previousMousePosition = null
    this.currentMousePosition = null

    console.log('Stopped sniffing...')
  }
}

export default Sniffer
