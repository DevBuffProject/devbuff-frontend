import BaseVideoSpec from 'quill-blot-formatter/dist/specs/IframeVideoSpec'
import Actions from '../actions'

export default class VideoSpec extends BaseVideoSpec {
  getActions() {
    return [Actions.ResizeAction, Actions.AlignAction, Actions.DeleteAction]
  }
}
