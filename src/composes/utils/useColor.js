import Color from 'color'
import Stc from 'string-to-color'

const isColor = (color) => {
  const opt = new Option().style
  opt.color = color
  return color === opt.color
}

export const useColor = (colorString) => {
  let color
  if (isColor(colorString)) color = Color(colorString)
  else color = Color(Stc(colorString))

  return {
    isColor,
    color,
  }
}
