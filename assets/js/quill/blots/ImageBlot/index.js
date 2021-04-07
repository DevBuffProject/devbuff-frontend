import Quill from 'quill'

const BaseImage = Quill.import('formats/image')

const ATTRIBUTES = [
  'alt',
  'height',
  'width',
  'class',
  'style', // Had to add this line because the style was inlined
]

export default class ImageBlot extends BaseImage {
  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      const copy = { ...formats }
      if (domNode.hasAttribute(attribute)) {
        copy[attribute] = domNode.getAttribute(attribute)
      }
      return copy
    }, {})
  }

  format(name, value) {
    if (ATTRIBUTES.includes(name)) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }
}
