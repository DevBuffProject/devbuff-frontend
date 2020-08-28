const Color = require('color')

export const fromString = (str) => {
  let hash = 0
  let color = '#'

  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash)

  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF
    color += ('00' + value.toString(16)).substr(-2)
  }

  return color
}

// export const luminate = (mainColorString, luminosity) => {
//   let mainColor = createColor(mainColorString)
//
//   while (mainColor.luminosity() < luminosity)
//     mainColor = mainColor.lighten(0.1)
//
//   while (mainColor.luminosity() > luminosity)
//     mainColor = mainColor.darken(0.1)
//
//   return mainColor
// }

Color.generateFromString = (str) => {
  let hash = 0
  let color = '#'

  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash)

  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF
    color += ('00' + value.toString(16)).substr(-2)
  }

  return Color(color)
}

Color.prototype.luminate = function(luminosity) {
  let color = Color(this.color)

  while (color.luminosity() < luminosity)
    color = color.lighten(0.1)

  while (color.luminosity() > luminosity)
    color = color.darken(0.1)

  return color
}

export default Color
