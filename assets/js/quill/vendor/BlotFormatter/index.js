import BaseBlotFormatter from 'quill-blot-formatter'
import Specs from './specs'
import { faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/free-solid-svg-icons'
import theme from '~/tailwind.config'

const buildSvg = ({ icon }) => {
  return `
    <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="items-center"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 ${icon[0]} ${icon[1]}"
        class="svg-inline--fa fa-items-center fa-w-14"
      >
      <path d="${icon[4]}"></path>
    </svg>
  `
}

export default class BlotFormatter extends BaseBlotFormatter {
  constructor(quill) {
    const options = {
      specs: [ Specs.VideoSpec, Specs.TwitterSpec, Specs.ImageSpec ],
      overlay: {
        className: 'blot-formatter__overlay',
        style: {
          position: 'absolute',
          boxSizing: 'content-box',
          border: `2px solid ${theme.theme.colors.primary.DEFAULT}`,
          padding: '2px',
          borderRadius: '8px',
          transform: 'translate(-6px, -6px)'
        },
      },
      resize: {
        handleStyle: {
          background: 'var(--color-background-contrast)',
          borderRadius: '10px',
          border: '2px solid var(--color-primary)',
          opacity: 1
        },
      },
      align: {
        icons: {
          left: buildSvg(faAlignLeft),
          center: buildSvg(faAlignCenter),
          right: buildSvg(faAlignRight)
        },
        toolbar: {
          buttonStyle: {
            backgroundColor: 'var(--color-background-contrast)',
            boxShadow: '0px 4px 8px -3px rgba(0, 0, 0, 0.5)',
            transform: 'translateY(-25%)',
            cursor: 'pointer',
            border: 0,
            borderRadius: '50px',
            width: '30px',
            height: '20px',
            margin: '0 .5rem',
            padding: '5px'
          },
          svgStyle: {
            border: 0,
            width: '15px',
            height: '20px',
            fill: 'var(--color-text)'
          }
        }
      }
    }

    super(quill, options)
  }
}
