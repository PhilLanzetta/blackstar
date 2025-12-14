<template>
  <div class="min-h-[400px]">
    <ClientOnly v-if="settings&&settings.show_passes">
      <div>
        <Festival23Heading v-if="settings.passes_heading" :layout="{heading: settings.passes_heading}" size="xl" />
        <Container>
          <div ref="passes" class="md:flex flex-wrap md:-mx-8 xl:-mx-16 space-y-10 md:space-y-0 items-stretch">
            <div
              v-for="(pass, key) in settings.passes"
              :id="`pass-${key}`"
              :key="`takeoverPass${key}`"
              class="md:w-1/2 flex items-stretch md:px-8 xl:px-16 flex-shrink-0"
              data-aos="flip-up"
              :data-aos-delay="(300*key)"
            >
              <Festival23Box :outline="true" :bg="`bg-${sectionColour}`">
                <div class="mt-0 mb-auto px-10 py-10">
                  <Festival23H2 size="xl" v-html="pass.name" />
                  <Festival23H3 v-if="pass.discount_price" size="lg">
                    <span class="line-through font-light">${{ pass.price }}</span> <span
                      class="font-medium"
                    >${{ pass.discount_price }}</span>
                  </Festival23H3>
                  <Festival23H3 size="lg" v-if="!pass.discount_price">
                    ${{ pass.price }}
                  </Festival23H3>
                  <p v-if="pass.description" class="my-6 text-lg" v-html="pass.description" />
                </div>
                <div class="mt-auto mb-0 px-10 pb-6 flex justify-start">
                  <Festival23Button :click-handler="() => { openEventive(key) }">
                    <span>Buy Pass</span>
                  </Festival23Button>
                  <div
                    :ref="`eventive-button-${pass.eventive_id}`"
                    class="eventive-button sr-only"
                    :data-pass-bucket="pass.eventive_id"
                    data-buy-label="Buy now"
                    data-quantity="1"
                    data-discount=""
                  />
                </div>
              </Festival23Box>
            </div>
          </div>
        </Container>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import festivalSettings from '~/mixins/festivalSettings'
import festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23Passes',
  mixins: [layout, festivalSettings, festival23SectionColors],
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
