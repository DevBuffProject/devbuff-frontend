import Color from 'colorjs.io'
import Stc from 'string-to-color'

const isColor = (color) => {
  const opt = new Option().style
  opt.color = color
  return color === opt.color
}

export const useColor = (colorString) => {
  const color = new Color(isColor(colorString) ? colorString : Stc(colorString))

  return {
    isColor,
    Color,
    color,
  }
}
