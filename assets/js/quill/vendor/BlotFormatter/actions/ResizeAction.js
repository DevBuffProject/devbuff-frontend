import BaseResizeAction from 'quill-blot-formatter/dist/actions/ResizeAction'

export default class AlignAction extends BaseResizeAction {
  onUpdate() {
    super.onUpdate()
    const target = this.formatter.currentSpec.getTargetElement()

    if (!target) {
      return false
    }

    setTimeout(() => {
      target.style.width = target.getAttribute('width') + 'px'
      target.style.height = target.getAttribute('height') + 'px'
    })
  }
}
