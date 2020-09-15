<script>
import Color from '~/kernel/UI/colors.js'

const cachedColors = {}
const getTextBasedColors = text => {
  if (cachedColors[text]) {
    return cachedColors[text]
  }

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
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    mixClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  computed: {
    colors() {
      return getTextBasedColors(this.text)
    }
  },

  render(h, { props }) {
    const colors = getTextBasedColors(props.text)
    console.log(props);
    return h('span', {
        class: [
          'chip',
          (props.type && 'chip--type-' + props.type),
          props.mixClass
        ],
        style: props.type === 'auto' && {
          backgroundColor: colors.bg,
          color: colors.text
        }
      },
      [props.text, h('span', { staticClass: 'chip__hole' })]
    )
  }
}
</script>

<style lang="scss" scoped>
.chip {
  background-color: var(--color-muted);
  padding: 0 .5rem 0 1rem;
  display: inline-flex;
  align-items: center;
  font-size: .8rem;
  line-height: 1;
  height: 1.5rem;
  border-radius: 10rem;
  &__hole {
    display: inline-block;
    background-color: var(--color-background);
    width: .5rem;
    height: .5rem;
    border-radius: 10rem;
    margin-left: .5rem;
  }

  &--type-primary {
    background-color: var(--color-primary);
    color: var(--color-background-contrast);
  }
}
</style>
