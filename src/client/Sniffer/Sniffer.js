import axios from 'axios'
import { getMousePosition, toTwoDecimals } from './utils'

class Sniffer {
  constructor({
    mousePositionTrackInterval = 100,
    fetchInterval = 15000,
  } = {}) {
    this.mousePositionTrackInterval = mousePositionTrackInterval // In milliseconds
    this.fetchInterval = fetchInterval

    this.setIntervalLink = undefined

    this.previousMousePosition = undefined
    this.currentMousePosition = undefined
    this.previousMouseSpeed = undefined

    this.timelines = {
      mX: [],
      mY: [],
      sX: [],
      sY: [],
      aX: [],
      aY: [],
    }
  }

  setMousePosition = (event) => {
    this.currentMousePosition = getMousePosition(event)
  }

  updateTimelines = ({ mouseMovement, mouseSpeed, mouseAcceleration }) => {
    this.timelines.mX.push(mouseMovement.x)
    this.timelines.mY.push(mouseMovement.y)
    this.timelines.sX.push(mouseSpeed.x)
    this.timelines.sY.push(mouseSpeed.y)
    this.timelines.aX.push(mouseAcceleration.x)
    this.timelines.aY.push(mouseAcceleration.y)

    // If user moved mouse greater than or equal fetchInterval time
    // send timelines data to server
    if (this.timelines.mX.length * this.mousePositionTrackInterval >= this.fetchInterval) {
      // TODO: Properly handle server response
      axios.post('/api/postUserTimeline', { timelines: this.timelines })
        .then(response => console.log(response))
        .catch(error => console.error(error))

      // Clear timeline
      this.timelines = {
        mX: [],
        mY: [],
        sX: [],
        sY: [],
        aX: [],
        aY: [],
      }
    }
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
        x: toTwoDecimals(Math.abs(mouseMovement.x) * 1000 / this.mousePositionTrackInterval),
        y: toTwoDecimals(Math.abs(mouseMovement.y) * 1000 / this.mousePositionTrackInterval),
      } // In px/second

      // Acceleration
      if (this.previousMouseSpeed) {
        mouseAcceleration = {
          x: (mouseSpeed.x - this.previousMouseSpeed.x) * 1000 / this.mousePositionTrackInterval,
          y: (mouseSpeed.y - this.previousMouseSpeed.y) * 1000 / this.mousePositionTrackInterval,
        }

        // Update timelines if was some movement
        if (mouseMovement.x !== 0 || mouseMovement.y !== 0) {
          this.updateTimelines({ mouseMovement, mouseSpeed, mouseAcceleration })
        }
      }
    }

    this.previousMouseSpeed = mouseSpeed
    this.previousMousePosition = this.currentMousePosition
  }

  run = () => {
    // Start setting mouse position
    document.onmousemove = this.setMousePosition

    this.onMouseMove()
    this.setIntervalLink = setInterval(this.onMouseMove, this.mousePositionTrackInterval)

    console.log('Started sniffing...')
  }

  pause = () => {
    // Stop setting mouse position
    document.onmousemove = undefined

    // Clear interval
    clearInterval(this.setIntervalLink)
    this.setIntervalLink = undefined

    console.log('Paussed sniffing...')
  }
}

export default Sniffer
