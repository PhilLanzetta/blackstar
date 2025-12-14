<template>
  <div class="min-h-[400px]">
    <ClientOnly v-if="settings&&settings.show_passes">
      <div>
        <Festival24Heading v-if="settings.passes_heading" :layout="{heading: settings.passes_heading}" />
        <Space />
        <Space />

        <div ref="passes" class="md:grid md:gap-10 md:grid-cols-2 items-stretch space-y-12 md:space-y-0">
          <div
            v-for="(pass, key) in settings.passes"
            :id="`pass-${key}`"
            :key="`takeoverPass${key}`"
            class="w-full flex items-stretch flex-shrink-0"
          >
            <Festival24Box :outline="true" :background="(pass.background ? pass.background : null)" :gradient-style="(pass.gradient_style ? pass.gradient_style : null)" class="w-full">
              <div>
                <Festival24SecondaryHeading :layout="{heading: pass.name}" />
                <template v-if="pass.price">
                  <p v-if="pass.discount_price" class="text-2xl font-medium">
                    <span class="line-through font-light">${{ pass.price }}</span> <span
                      class="font-medium"
                    >${{ pass.discount_price }}</span>
                  </p>
                  <p v-if="!pass.discount_price" class="text-2xl font-medium">
                    ${{ pass.price }}
                  </p>
                </template>
                <p v-if="pass.description" class="my-6 text-lg" v-html="pass.description" />
                <Space />
              </div>
              <div class="mt-auto mb-0 flex justify-start">
                <Festival24Button :click-handler="() => { openEventive(key) }">
                  <span v-if="pass.button_label_override" v-html="pass.button_label_override" /><span v-else>Buy Pass</span>
                </Festival24Button>
                <div
                  :ref="`eventive-button-${pass.eventive_id}`"
                  class="eventive-button sr-only"
                  :data-pass-bucket="pass.eventive_id"
                  data-buy-label="Buy now"
                  data-quantity="1"
                  data-discount=""
                />
              </div>
            </Festival24Box>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import festivalSettings from '~/mixins/festivalSettings'

export default {
  name: 'Festival24Passes',
  mixins: [layout, festivalSettings],
  props: {
    sectionColour: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.refreshEventive()
  },
  methods: {
    refreshEventive () {
      if (typeof window !== 'undefined' && window) {
        this.$nextTick(() => {
          setTimeout(() => {
            try {
              if (window.Eventive) {
                window.Eventive.rebuild()
              }
            } catch (e) {
            }
          }, 1000)
        })
      }
    },
    closeModal () {
      if (this.closeModalHandler) {
        this.closeModalHandler()
      }
    },
    openEventive (passId) {
      const eventiveBuyButton = this.$refs.passes.querySelector(`#pass-${passId}  .eventive-button button`)
      if (eventiveBuyButton) {
        eventiveBuyButton.click()
      } else {
        window.location = `https://festival.blackstarfest.org/passes/buy/${this.settings.passes[passId].eventive_id}`
      }
    }
  }
}
</script>

<style scoped>

</style>
