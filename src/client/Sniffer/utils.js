export const getMousePosition = event => ({
  x: event.clientX,
  y: event.clientY,
})

export const toTwoDecimals = number => Number(number.toFixed(2))
