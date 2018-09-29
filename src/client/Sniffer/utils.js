export const getMousePosition = event => ({
  x: event.clientX,
  y: event.clientY,
})

export const isStandBy = (mousePositionDelta) => {
  return mousePositionDelta.x === 0 && mousePositionDelta.y === 0
}
