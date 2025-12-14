<template>
  <ClientOnly>
    <template v-if="useTooltip">
      <Festival24Tooltip v-show="ready" :tooltip="label">
        <button :class="`${(large ? ' save-lg ' : '')}  ${(alt ? ' alt ' : '' )} ${($store.state.theme==='bsf14' ? ` bsf14-save-btn bsf14-save-btn--${modifier} `  : '')} `" @click.prevent="handleClick">
          <svg v-if="saved">
            <use xlink:href="#icon-heart-solid" />
          </svg>
          <svg v-if="!saved">
            <use xlink:href="#icon-heart-outline" />
          </svg>
          <span class="sr-only">{{ label }}</span>
        </button>
      </Festival24Tooltip>
    </template>
    <template v-else>
      <button v-show="ready" :class="`${(large ? ' save-lg ' : '')}  ${(alt ? ' alt ' : '' )} ${($store.state.theme==='bsf14' ? ` bsf14-save-btn bsf14-save-btn--${modifier} `  : '')}`" @click.prevent="handleClick">
        <svg v-if="saved">
          <use xlink:href="#icon-heart-solid" />
        </svg>
        <svg v-if="!saved">
          <use xlink:href="#icon-heart-outline" />
        </svg>
        <span class="sr-only">{{ label }}</span>
      </button>
    </template>
  </ClientOnly>
</template>

<script>

export default {
  name: 'Festival24SaveButton',
  props: {
    event: {
      type: Object,
      required: true
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    },
    useTooltip: {
      type: Boolean,
      required: false,
      default: true
    },
    alt: {
      type: Boolean,
      required: false,
      default: false
    },
    modifier: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  data () {
    return {
      retry: true
    }
  },
  computed: {
    label () {
      if (this.saved) {
        return 'Remove from My Schedule'
      }

      return 'Add to My Schedule'
    },
    saved () {
      return this.$store.state.festival.loggedInLocal && this.$store.state.festival.saved.includes(this.event.id)
    },
    ready () {
      return typeof window !== 'undefined' && window.Eventive && this.event && this.event.acf.eventive_id
    }
  },
  methods: {
    handleClick () {
      if (!this.$store.state.festival.loggedInLocal) {
        if (this.retry) {
          this.retry = false // load local user if not loaded first time
          this.$store.dispatch('festival/getOrCreateLocalUser', { event_id: this.event.id, eventive_id: this.event.acf.eventive_id })
          return
        }
        alert('Sorry, there was an error saving the event, please try again.')
        return
      }

      const config = this.$axiosConfig.config
      config.withCredentials = true
      const endpoint = `${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/eventive-users/saved`
      const args = {
        user_id: this.$store.state.festival.eventiveUser.localUserId,
        event_id: this.event.id,
        nonce: this.$store.state.festival.eventiveUser.nonce
      }

      this.$axios.post(endpoint, args, config).then((response) => {
        this.$store.commit('festival/setSaved', response.data.saved)

        try {
          if (response.data.saved) {
            if (response.data.saved?.includes(this.event.id)) {
              window.Eventive.wishlist.add({
                type: 'events',
                id: this.event.acf.eventive_id
              })
            }
          }

          if (response.data.removed) {
            window.Eventive.wishlist.remove({
              type: 'events',
              id: this.event.acf.eventive_id
            })
          }

        } catch (e) {
          // console.log(e.message)
        }
      }).catch(() => {
        alert('Sorry, there was an error saving the event, please try again.')
      })
    }
  }
}
</script>

<style scoped>
svg {
  @apply block w-6 h-5;
}

button {
  @apply w-9 h-9 flex items-center justify-center rounded-full border border-black;
}

button.save-lg {
  @apply w-[42px] h-[42px];
}

button.save-lg svg {
  @apply block w-7 h-6;
}

button.bsf14-save-btn.alt {
  @apply border-bsf14pink bg-bsf14pink;
}

button.bsf14-save-btn.alt.bsf14-save-btn--event-guide {
  @apply border-bsf14orangeTint bg-bsf14orangeTint;
}

button.bsf14-save-btn.alt.bsf14-save-btn--film-guide {
  @apply border-bsf14yellow bg-bsf14yellow;
}
</style>
