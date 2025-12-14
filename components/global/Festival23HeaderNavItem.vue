<template>
  <RawLink :to="to" :click-handler="clickHandler">
    <span class="bsf12-header-link" :class="{'bsf12-header-link--active': active||forceActive}"><slot /></span>
  </RawLink>
</template>

<script>
export default {
  name: 'Festival23HeaderNavItem',
  props: {
    to: {
      type: String,
      required: false,
      default: ''
    },
    clickHandler: {
      type: Function,
      required: false,
      default: null
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      forceActive: false
    }
  },
  watch: {
    '$route.path' (to) {
      this.$nextTick(() => {
        this.checkActive()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.checkActive()
    })
  },
  methods: {
    checkActive () {
      const to = this.$route.path
      if (this.to.includes('/festival/schedule') && (to.includes('/festival/schedule') || to.includes('/festival/virtual-guide') || to.includes('/festival/film-guide') || to.includes('/festival/event-guide') || to.includes('/festival/events/') || to.includes('/festival/my-schedule'))) {
        this.forceActive = true
        return
      }

      this.forceActive = false
    }
  }
}
</script>

<style scoped>
.bsf12-header-link {
  @apply block overflow-hidden relative leading-none underline xl:no-underline;
}

.bsf12-header-link::after {
  @apply hidden xl:block border-b-2 border-inherit w-full absolute bottom-0 left-0 transition-all duration-200 -translate-x-full opacity-0;

  content: " ";
}

.bsf12-header-link:hover::after,
.nuxt-link-exact-active .bsf12-header-link::after,
.bsf12-header-link--active::after {
  @apply translate-x-0 opacity-100;
}

.bsf12-header-link--active:hover::after {
  @apply translate-x-full opacity-0;
}

</style>
