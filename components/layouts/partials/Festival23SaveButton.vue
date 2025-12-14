<template>
  <ClientOnly>
    <template v-if="useTooltip">
      <Festival23Tooltip v-show="ready" :tooltip="label">
        <button :class="{'save-lg': large}" @click.prevent="handleClick">
          <svg v-if="saved">
            <use xlink:href="#icon-heart-solid"/>
          </svg>
          <svg v-if="!saved">
            <use xlink:href="#icon-heart-outline"/>
          </svg>
          <span class="sr-only">{{ label }}</span>
        </button>
      </Festival23Tooltip>
    </template>
    <template v-else>
      <button v-show="ready" :class="{'save-lg': large}" @click.prevent="handleClick">
        <svg v-if="saved">
          <use xlink:href="#icon-heart-solid"/>
        </svg>
        <svg v-if="!saved">
          <use xlink:href="#icon-heart-outline"/>
        </svg>
        <span class="sr-only">{{ label }}</span>
      </button>
    </template>
  </ClientOnly>
</template>

<script>

export default {
  name: 'Festival23SaveButton',
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
      return typeof window !== 'undefined' && window.Eventive && this.event && this.event.acf.eventive_id && this.$store.state.festival.loggedInLocal
    }
  },
  methods: {
    handleClick () {
      if (!this.$store.state.festival.loggedInLocal) {
        if (this.retry) {
          this.retry = false // load local user if not loaded first time
          this.$store.dispatch('festival/getOrCreateLocalUser', true).then(() => {
            this.handleClick()
          })
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
            window.Eventive.wishlist.add({
              type: 'events',
              id: this.event.acf.eventive_id
            })
          } else {
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
  @apply block w-8 h-7;
}

.save-lg svg {
  @apply 2xl:w-11 2xl:h-10;
}
</style>
