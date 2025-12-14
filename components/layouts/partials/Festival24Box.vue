<template>
  <div
    class="relative rounded-3xl"
    :class="dynamicClasses"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Festival24Box',
  props: {
    size: {
      type: String,
      required: false,
      default: 'md'
    },
    background: {
      type: String,
      required: false,
      default: null
    },
    gradientStyle: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    dynamicClasses () {
      const classes = []
      if (this.size === 'md') {
        if (this.$store.state.theme === 'bsf14') {
          classes.push('p-6 lg:p-8')
        } else {
          classes.push('p-3 md:p-6 lg:p-8')
        }
      }

      if (this.size === 'sm') {
        classes.push('p-3 lg:p-4')
      }

      if (this.size === 'xs') {
        classes.push('p-2')
      }

      if (this.$store.state.theme === 'bsf13') {
        classes.push('border-inherit border')
      }

      if (this.gradientStyle && this.gradientStyle !== 'none' && this.background) {
        if (this.gradientStyle === 'top') {
          classes.push(`bg-gradient-to-b from-${this.background.replace('Tint', '')}Tint to-${this.background.replace('Tint', '')}`)
        } else {
          classes.push(`bg-gradient-to-t from-${this.background.replace('Tint', '')}Tint to-${this.background.replace('Tint', '')}`)
        }
      } else if (this.background) {
        classes.push(`bg-${this.background}`)
      }

      return classes
    }
  }
}
</script>

<style scoped>

</style>
