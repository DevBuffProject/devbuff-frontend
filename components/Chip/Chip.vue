<script>
import Color from '~/helpers/colors.js'

const cachedColors = {}
const getTextBasedColors = text => {
  if (cachedColors[text])
    return cachedColors[text]

  const colorInstance = Color(Color.generateFromString(text))
  const colors = {
    text: colorInstance.luminate(.15),
    bg: colorInstance.luminate(.85)
  }

  return cachedColors[text] = colors
}

export default {
  name: 'v-chip',

  functional: true,

  props: {
    text: {
      type: [String],
      default: null
    },
    type: {
      type: String,
      default: null
    }
  },

  render(h, { props }) {
    const colors = getTextBasedColors(props.text)

    return h('span', {
        class: [
          'chip',
          props.type && 'chip--type-' + props.type,
        ],
        style: props.type === 'auto' && {
          backgroundColor: colors.bg,
          color: colors.text
        }
      },
      props.text
    )
  }
}
</script>

<style lang="scss" scoped>
.chip {
  background-color: var(--color-muted);
  display: inline-flex;
  align-items: center;
  line-height: 1;
  font-size: .7rem;
  padding: 0 .7rem;
  height: 1rem;
  border-radius: 10rem;
  font-weight: 400;
  color: rgba(0, 0, 0, .5);
  transition: background-color .3s var(--base-transition);

  &--type-muted {
    background-color: var(--color-muted);
  }
}
</style>
