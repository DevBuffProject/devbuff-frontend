import { merge } from 'lodash'
import Quill from 'quill'
import hljs from 'highlight.js'
import MagicUrl from 'quill-magic-url'
import ImageUploader from 'quill-image-uploader'
import BlotFormatter from './vendor/BlotFormatter'
import TwitterBlot from './blots/TwitterBlot'
import ImageBlot from './blots/ImageBlot'

const Codeblock = Quill.import('formats/code-block')
const Quoteblock = Quill.import('formats/blockquote')
const Header = Quill.import('formats/header')
const List = Quill.import('formats/list')
const Align = Quill.import('attributors/style/align')

Codeblock.className = 'codeblock'
Codeblock.tags = 'pre code'
Quoteblock.className = 'blockquote'
Header.className = 'heading'
List.className = 'list'

Quill.register('modules/magicUrl', MagicUrl)
Quill.register('modules/imageUploader', ImageUploader)
Quill.register('modules/blotFormatter', BlotFormatter)

Quill.register('formats/twitter', TwitterBlot)
Quill.register('formats/image', ImageBlot)
Quill.register(Align, true)

const createQuill = (container, options = {}) => {
  const baseOptions = {
    modules: {
      toolbar: '#toolbar',
      clipboard: true,
      history: true,
      magicUrl: true,
      blotFormatter: true,
      syntax: { highlight: (text) => hljs.highlightAuto(text).value },
    },
  }

  return new Quill(container, merge(baseOptions, options))
}

export default createQuill
