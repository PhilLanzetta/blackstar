<template>
  <div class="relative">
    <div class="flex lg:hidden space-x-2 absolute top-0 right-0 z-40">
      <button ref="arrowPostsPrev" class="py-4 px-2 short-arrow" @click.prevent="prevTab">
        <PrevArrow />
      </button>
      <button ref="arrowPostsNext" class="py-4 px-2" @click.prevent="nextTab">
        <NextArrow />
      </button>
    </div>
    <div ref="tabs" class="flex relative items-stretch justify-start bg-black">
      <div
        v-for="(tab, key) in layout.tabs"
        :key="`tab${key}`"
        class="tab tab--default"
        :class="{'tab--active': currentTab===key}"
        :aria-controls="`tab${key}`"
        :aria-expanded="(currentTab===key).toString()"
        role="button"
        @click="currentTab=key"
      >
        <div
          :id="`tab${key}`"
          class="tab__inside pb-28"
          :class="`bg-${tab.colour} ${tabTextColour(tab.colour)}`"
          :style="`width: ${tabWidth}px`"
        >
          <button v-if="!(currentTab===key)" v-cursor-interact class="absolute top-0 left-0 w-full h-full" />

          <span
            v-if="!(currentTab===key)"
            class="tab__inside__title font-serif_italic_alt text-left whitespace-nowrap"
            v-html="tab.title"
          />

          <div :class="{'hidden': currentTab!==key}">
            <h2 class="font-serif_italic_alt text-3xl md:text-4xl lg:text-5xl xl:text-6xl my-5 lg:mb-10" v-html="tab.title" />
            <div class="tab__copy" v-html="tab.content" />
            <p v-if="tab.link" class="mt-10">
              <CircleButton :to="tab.link.url" color-scheme="black">
                <span v-html="tab.link.title" />
              </CircleButton>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tabs from '~/mixins/tabs'
import layout from '~/mixins/layout'

export default {
  name: 'TextTabs',
  mixins: [tabs, layout],
  mounted () {
    this.totalTabs = this.layout.tabs.length
    this.currentTab = 0
  }
}
</script>

<style>
@import "~/assets/css/components/tabs.css";

.tab__copy {
  @apply xl:text-xl font-medium max-w-screen-xl;
}

.tab__copy p, .tab__copy ul, .tab__copy ol {
  @apply my-6;
}

.tab__copy strong {
  @apply font-bold;
}

.tab__inside__title {
  writing-mode: vertical-lr;
  @apply text-3xl md:text-4xl lg:text-5xl xl:text-6xl;
}
</style>
