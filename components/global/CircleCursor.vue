<template>
  <div
    v-if="!$store.state.touch&&!$store.state.cursor.hidden"
    class="fixed top-0 left-0 w-screen h-screen z-50 pointer-events-none"
  >
    <span class="block absolute top-0 left-0" :style="`transform: translate(${left}px, ${top}px)`"><span
      class="w-10 h-10 border-2 rounded-full block transform -translate-x-1/2 -translate-y-1/2 transition-all motion-reduce:transition-none scale-100 duration-200 transform-gpu  overflow-hidden"
      :class="pointerStyles"
    ><span
      v-if="$store.state.cursor.hint"
      class="absolute top-0 left-0 p-4 flex items-center text-center justify-center block w-full h-full font-medium leading-none"
      :class="hintTextStyles"
    >{{ $store.state.cursor.hint }}</span>
    </span></span>
  </div>
</template>

<script>
export default {
  name: 'CircleCursor',
  data () {
    return {
      top: -100,
      left: -100
    }
  },
  computed: {
    pointerStyles () {
      let classNames = ''
      if (this.$store.state.cursor.pointer) {
        classNames = ' opacity-50 '

        if (this.$store.state.theme === 'festival') {
          classNames += ' border-navy '
        } else if (this.$store.state.theme === 'seen' || this.$store.state.theme === 'bsf11') {
          classNames += ' border-black '
        } else {
          classNames += ' border-brightYellow '
        }
      }

      if (this.$store.state.cursor.pointerAlt) {
        classNames += ' scale-150 bg-white opacity-30 border-white '

        return classNames
      }

      if (this.$store.state.cursor.hint || this.$store.state.cursor.hintAlt) {
        if (this.$store.state.theme === 'festival') {
          classNames += '  w-28 h-28 border-pink bg-navy transform rotate-12 font-festival_sans text-base '
        } else if (this.$store.state.theme === 'bsf11') {
          classNames += '  w-28 h-28 border-black bg-white border-4 text-3xl font-bsf11_sans '
        } else if (this.$store.state.theme === 'seen') {
          classNames += '  w-20 h-20 border-black bg-black font-seen_serif_light_italic text-base '
        } else {
          classNames += '  w-28 h-28 border-black bg-brightYellow text-base '
        }

        return classNames
      }

      if (this.$store.state.theme === 'festival') {
        classNames += ' bg-navy border-pink '
      } else if (this.$store.state.theme === 'bsf11') {
        classNames += ' bg-white border-black border-4 '
      } else if (this.$store.state.theme === 'seen') {
        classNames += ' bg-black border-white '
      } else {
        classNames += ' bg-brightYellow border-white '
      }

      return classNames
    },
    hintTextStyles () {
      if (this.$store.state.theme === 'festival') {
        return ' text-beige uppercase '
      }

      if (this.$store.state.theme === 'seen') {
        return ' text-white '
      }

      return ' text-black uppercase '
    }
  },
  watch: {
    '$store.state.cursor.hint' (to) {
      if (to) {
        if (this.$store.state.touch) {
          setTimeout(() => {
            this.$store.commit('cursor/leave')
            this.$store.commit('cursor/hint', false)
          }, 5000)
        }
      }
    }
  },
  mounted () {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('touchstart', this.setTouchDevice)
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('touchstart', this.setTouchDevice)
  },
  methods: {
    handleMouseMove (e) {
      let offset = 0

      if (this.$store.state.cursor.hint || this.$store.state.cursor.hintAlt) {
        offset = 20
      }
      this.top = e.clientY - offset
      this.left = e.clientX - offset
    },
    setTouchDevice () {
      if (this.$store.state.touch) {
        return
      }

      this.$store.commit('isTouch')
      document.querySelector('html').classList.add('is-touch')
    }
  }
}
</script>

<style scoped>

</style>
