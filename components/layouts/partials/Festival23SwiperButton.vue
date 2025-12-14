<template>
  <button :id="`${id}`" class="pointer-events-auto" :class="{'swiper-button-disabled': disabled}" @click="handleClick">
    <svg class="active-icon" :class="{'transform rotate-180': type==='next'}">
      <use xlink:href="#icon-arrow-solid" />
    </svg>
    <svg class="inactive-icon" :class="{'transform rotate-180': type==='next'}">
      <use xlink:href="#icon-arrow-outline" />
    </svg>
    <span class="sr-only">{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'Festival23SwiperButton',
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
  @apply w-8 h-8;
}

.active-icon {
  @apply block
}

.inactive-icon {
  @apply hidden;
}

.swiper-button-disabled .active-icon {
  @apply hidden;
}

.swiper-button-disabled .inactive-icon {
  @apply block;
}
</style>
