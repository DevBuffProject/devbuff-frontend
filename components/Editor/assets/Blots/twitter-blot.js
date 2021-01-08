import Quill from 'quill'

const BaseBlock = Quill.import('blots/block/embed');

class TwitterBlot extends BaseBlock {
  static create(data) {
    const node = super.create(data);
    const buildInnerHtml = (data) => {
      window.twitter = () => {
        const loadScript = function (url) {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = function () {
              resolve(true);
            };
            script.onerror = function () {
              reject();
            };
            document.head.appendChild(script);
          });
        };
        if (!window.twttr) {
          loadScript('//platform.twitter.com/widgets.js').then(() => {
            setTimeout(() => {
              window.twttr.widgets.load();
            }, 100);
          });
        } else {
          setTimeout(() => {
            window.twttr.widgets.load();
          }, 100);
        }
      };

      return `
					<div contenteditable="false" style="display: flex; max-width: 100%;">
						<blockquote class="twitter-tweet"><a tabindex="-1" href="${data.url}"></a></blockquote>
						<img src="*" onerror="event.stopPropagation(); event.preventDefault(); window.twitter();" style="display: none;"/>
					</div>
				`;
    }

    const innerHTML = buildInnerHtml(data);
    node.innerHTML = innerHTML;
    // node.setAttribute('contenteditable', false);
    // store data
    node.setAttribute('data-url', data.url);
    return node;
  }

  static value(domNode) {
    const { url } = domNode.dataset;
    return { url };
  }

  index() {
    return 1;
  }

}

TwitterBlot.blotName = 'twitter';
TwitterBlot.className = 'ql-twitter';
TwitterBlot.tagName = 'div';

export default TwitterBlot
