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

    this.timeline = []
  }

  setMousePosition = (event) => {
    this.currentMousePosition = getMousePosition(event)
  }

  updateTimelines = ({ mouseMovement, mouseSpeed, mouseAcceleration }) => {
    this.timeline.push({
      mX: mouseMovement.x,
      mY: mouseMovement.y,
      sX: mouseSpeed.x,
      sY: mouseSpeed.y,
      aX: mouseAcceleration.x,
      aY: mouseAcceleration.y,
    })

    // If user moved mouse greater than or equal fetchInterval time
    // send timelines data to server
    if (this.timeline.length * this.mousePositionTrackInterval >= this.fetchInterval) {
      // TODO: Properly handle server response
      axios.post('/api/postUserTimeline', { timeline: this.timeline })
        .then(response => console.log(response))
        .catch(error => console.error(error))

      // Clear timeline
      this.timeline = []
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
