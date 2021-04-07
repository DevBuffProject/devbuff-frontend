const Color = require('color')

export const generateFromString = (str) => {
  let hash = 0
  let color = '#'

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  for (let i = 0; i < 3; i++) {
    // eslint-disable-next-line
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2)
  }

  return Color(color)
}

Color.generateFromString = generateFromString

Color.prototype.luminate = function (luminosity) {
  let color = Color(this.color)

  while (color.luminosity() < luminosity) {
    color = color.lighten(0.1)
  }

  while (color.luminosity() > luminosity) {
    color = color.darken(0.1)
  }

  return color
}

export default Color
