<template>
  <section class="relative z-10">
    <Container>
      <div class="relative z-10">
        <div class="flex justify-between">
          <div :class="{'mt-auto -mb-5 lg:mb-0': $store.state.theme==='bsf11'}">
            <FestivalHeading v-if="layout.title" :butted="true" class="lg:w-full">
              <span v-html="layout.title" />
            </FestivalHeading>
          </div>
          <div class="flex relative z-10" :class="{'space-x-6 2xl:space-x-12 text-navy': $store.state.theme==='festival', 'text-white': $store.state.theme==='bsf11'}">
            <button ref="arrowPostsPrev" @click.prevent="prevTab">
              <FestivalPrevArrow />
            </button>
            <button ref="arrowPostsNext" @click.prevent="nextTab">
              <FestivalNextArrow />
            </button>
          </div>
        </div>
        <div ref="tabs" class="flex relative items-stretch justify-start tabs" :class="`tabs--${$store.state.theme}`">
          <div
            v-for="(tab, key) in layout.tabs"
            :key="`tab${key}`"
            :class="`tab ${(currentTab===key) ? ' tab--active ' : ''} tab--${getTabIndex(key)} bg-${tab.colour} ${tabTextColour(tab.colour)}`"
            :aria-controls="`tab${key}`"
            :aria-expanded="(currentTab===key).toString()"
            role="button"
            @click="currentTab=key"
          >
            <div :id="`tab${key}`" class="tab__inside" :class="`bg-${tab.colour} ${tabTextColour(tab.colour)}`" :style="`width: ${tabWidth}px`">
              <button v-if="!(currentTab===key)" v-cursor-interact class="absolute top-0 left-0 w-full h-full">
                <span class="sr-only">Expand</span>
              </button>
              <RawLink v-if="(currentTab===key&&tab.link)&&tab.primary_action_style!=='button'" v-cursor-hint="tab.cursor_hint" :to="tab.link.url|replaceSiteUrl" class-names="block absolute top-0 left-0 w-full h-full">
                <span class="sr-only">{{ tab.cursor_hint }}</span>
              </RawLink>

              <FestivalProse>
                <h2 v-if="$store.state.theme==='bsf11'&&tab.title" class="font-bsf11_sans text-4xl lg:text-5xl 2xl:text-7xl uppercase mb-8" v-html="tab.title" />

                <p v-if="tab.title&&$store.state.theme==='festival'" class="mb-8">
                  <strong v-html="tab.title" />
                </p>
                <span v-html="tab.description" />
                <span v-if="tab.link&&tab.link.title&&tab.primary_action_style!=='button'" class="block mt-8">&bull; {{ tab.link.title }}</span>
                <div v-if="tab.primary_action_style==='button'" class="md:flex flex-wrap w-full mt-8">
                  <FestivalButton v-if="tab.link" :to="tab.link.url|replaceSiteUrl">
                    <span v-html="tab.cursor_hint" />
                  </FestivalButton>
                  <div v-if="tab.additional_actions" class="mt-4 md:ml-4 md:mt-0">
                    <FestivalButton v-for="(additionalAction, actionKey) in tab.additional_actions" :key="`additionalAction${key}-${actionKey}`" :to="additionalAction.button.url|replaceSiteUrl">
                      <span v-html="additionalAction.button.title" />
                    </FestivalButton>
                  </div>
                </div>
              </FestivalProse>
            </div>
          </div>
        </div>
      </div>
      <LazyRellaxShape
        v-if="$store.state.theme==='bsf11'"
        key="shapeAsterix"
        class="top-0 hidden lg:block xl:top-1/4 left-0 ml-4 z-0 w-16 xl:w-28 z-20"
      >
        <ShapeAsterix2 />
      </LazyRellaxShape>
    </Container>
  </section>
</template>

<script>
import tabs from '~/mixins/tabs'
import layout from '~/mixins/layout'
import ShapeAsterix2 from '~/assets/festival/11/shape-asterix-2.svg?inline'

export default {
  name: 'FestivalTextTabs',
  components: { ShapeAsterix2 },
  mixins: [tabs, layout],
  mounted () {
    this.totalTabs = this.layout.tabs.length
    this.currentTab = 0
  },
  methods: {
    getTabIndex (index) {
      if (this.currentTab >= index) {
        return 0
      }
      return index
    }
  }
}
</script>

<style scoped>
@import "~/assets/css/components/tabs.css";

</style>
