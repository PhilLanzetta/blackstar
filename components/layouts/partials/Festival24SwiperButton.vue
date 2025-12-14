<template>
  <Festival24Button :id="`${id}`" :class="{'swiper-button-disabled': disabled}" :click-handler="handleClick" modifier="default" class="flex-shrink-0 py-2 [&>a]:px-2 lg:[&>a]:px-8 pointer-events-auto">
    <div>
      <Arrow v-if="label === 'Previous'"/>
      <Arrow class="fill-black rotate-180" v-else />
    </div>
  </Festival24Button>
</template>

<script>
import Arrow from '~/assets/arrow-24.svg?inline'

export default {
  name: 'Festival24SwiperButton',
  components: { Arrow },
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'prev'
    },
    clickHandler: {
      type: Function,
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    label () {
      if (this.type === 'next') {
        return 'Next'
      }

      return 'Previous'
    }
  },
  methods: {
    handleClick (e) {
      if (this.disabled) {
        e.preventDefault()
        return
      }

      if (this.clickHandler) {
        e.preventDefault()
        this.clickHandler()
      }
    }
  }
}
</script>

<style scoped>
svg {
  @apply py-1.5 lg:py-0 w-8 h-8;
}

.active-icon {
  @apply block
}

.inactive-icon {
  @apply hidden;
}

.swiper-button-disabled {
  @apply text-black opacity-50 cursor-not-allowed;
}

.swiper-button-disabled .active-icon {
  @apply hidden;
}

.swiper-button-disabled .inactive-icon {
  @apply block;
}
</style>
