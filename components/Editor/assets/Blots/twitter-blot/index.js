import Quill from 'quill'

const BaseBlock = Quill.import('blots/block/embed')

class TwitterBlot extends BaseBlock {
  static create(data) {
    const node = super.create(data)
    const fallbackHtml = `
      <blockquote>
        <i style="display: block"><a href="//${data.url}">view on twitter ➜</a></i>
      </blockquote>
    `
    const twitterEmbedActivator = `
      <img
        src="dev/null" onError="event.preventDefault(); event.stopPropagation(); window.twitter();"
        style="display: none"
      />
    `
    const buildInnerHtml = async data => {
      window.twitter = async () => {
        const loadScript = async url => new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = url
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })

        if (!window.twttr) await loadScript('//platform.twitter.com/widgets.js')

        setTimeout(async () => {
          await window.twttr.widgets.load()
          node.style.display = 'flex'
          node.style.justifyContent = 'center'
        }, 200)
      }

      try {
        const response = await fetch(`/_api/help/embed-tweet?url=${data.url}`)
        const tweet = await response.json()

        return tweet.html
          ? tweet.html + twitterEmbedActivator
          : fallbackHtml
      } catch (e) {
        return fallbackHtml
      }
    }

    node.innerHTML = fallbackHtml

    buildInnerHtml(data).then(html => {
      node.innerHTML = html

      if (!node.children[0].classList.contains('blockquote')) {
        node.children[0].classList.add('blockquote')
      }
    })

    node.setAttribute('data-url', data.url)
    node.setAttribute('contenteditable', false)

    return node
  }

  static value(domNode) {
    return { url: domNode.dataset.url }
  }
}

TwitterBlot.blotName = 'twitter'
TwitterBlot.className = 'twitter'
TwitterBlot.tagName = 'div'

export default TwitterBlot
