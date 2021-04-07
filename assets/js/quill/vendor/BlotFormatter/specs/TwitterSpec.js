import UnclickableBlotSpec from 'quill-blot-formatter/dist/specs/UnclickableBlotSpec'
import Actions from '../actions'

export default class TwitterSpec extends UnclickableBlotSpec {
  constructor(formatter) {
    super(formatter, '.twitter-blot')
  }

  getActions() {
    return [Actions.DeleteAction]
  }
}
