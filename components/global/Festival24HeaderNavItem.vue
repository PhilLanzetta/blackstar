<template>
  <div class="group relative">
    <RawLink :to="to" :click-handler="clickHandler">
      <span class="bsf12-header-link group-hover:underline decoration-200 underline-offset-2" :class="{'bsf12-header-link--active': active || forceActive, ['nav-' + menuItem.colour]: menuItem.colour}"><slot /></span>
    </RawLink>
    <div v-if="menuItem.submenu_items" class="invisible opacity-0 duration-300 group-hover:opacity-100 group-hover:visible group-hover:opacity-100 transition-all group-hover:block  position absolute top-5 right-2/4 translate-x-2/4 pt-5">
      <div :class="'bg-' + menuItem.colour + ' px-9 rounded-[36px] py-4' + ($store.state.theme==='bsf13' ? ' border-black border ' : '')">
        <ul v-for="(submenu_item, key) in menuItem.submenu_items" :key="key">
          <li class="my-4 text-center text-black">
            <RawLink :to="submenu_item.link.url|replaceSiteUrl">
              <span class="text-lg whitespace-nowrap" v-html="submenu_item.link.title" />
            </RawLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Festival24HeaderNavItem',
  props: {
    to: {
      type: String,
      required: false,
      default: ''
    },
    menuItem: {
      type: Object,
      required: false,
      default: () => {}
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
  computed: {
    settings () {
      return this.$store.state.settings
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
  @apply block overflow-hidden relative leading-none;
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

.nav-bsf13purple {
  @apply group-hover:text-bsf13purple
}
.nav-bsf13orange {
  @apply group-hover:text-bsf13orange
}
.nav-bsf13green {
  @apply group-hover:text-bsf13green
}
.nav-beige {
  @apply group-hover:text-beige
}

.nav-bsf14yellowTint {
  @apply group-hover:text-bsf14yellowTint
}
.nav-bsf14cherry {
  @apply group-hover:text-bsf14cherry
}
.nav-bsf14orange {
  @apply group-hover:text-bsf14orange
}
.nav-bsf14orangeTint {
  @apply group-hover:text-bsf14orangeTint
}
.nav-bsf14pink {
  @apply group-hover:text-bsf14pink
}
.nav-bsf14pinkTint {
  @apply group-hover:text-bsf14pinkTint
}
.nav-bsf14yellow {
  @apply group-hover:text-bsf14yellow
}
</style>
