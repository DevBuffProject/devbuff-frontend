import BaseImageSpec from 'quill-blot-formatter/dist/specs/ImageSpec'
import Actions from '../actions'

export default class ImageSpec extends BaseImageSpec {
  getActions() {
    return [ Actions.ResizeAction, Actions.AlignAction ]
  }
}
