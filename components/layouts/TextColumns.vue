<template>
  <div class="relative">
    <div ref="textColumns" class="lg:flex relative items-stretch justify-start bg-black">
      <div
        v-for="(textColumn, key) in layout.columns"
        :key="`textColumn${key}`"
        class="textColumn textColumn--default textColumn--active"
        :class="(textColumn.colour !== 'custom' ? `bg-${textColumn.colour} ${textColumnTextColour(textColumn.colour)}` : '')"
        :style="(textColumn.colour === 'custom' ? `background: ${textColumn.custom_colour}; color: ${textColumn.custom_text_colour};` : '')"
      >
        <h2
          class="font-serif_italic_alt text-3xl md:text-4xl lg:text-5xl xl:text-6xl my-5 lg:mb-10"
          v-html="textColumn.title"
        />
        <div class="textColumn__copy" v-html="textColumn.content"/>
        <p v-if="textColumn.link" class="mt-10">
          <CircleButton :to="textColumn.link.url|replaceSiteUrl" color-scheme="black">
            <span v-html="textColumn.link.title"/>
          </CircleButton>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'TexttextColumns',
  mixins: [layout],
  methods: {
    textColumnTextColour (bgColour) {
      if (bgColour === 'navy' || bgColour === 'blue' || bgColour === 'red') {
        return 'text-white'
      }

      return 'text-black'
    }
  }
}
</script>

<style>
.textColumn {
  @apply p-5 xl:px-20 xl:py-28 w-full;
}
.textColumn__copy {
  @apply xl:text-xl font-medium max-w-screen-xl;
}

.textColumn__copy p, .textColumn__copy ul, .textColumn__copy ol {
  @apply my-6;
}

.textColumn__copy strong {
  @apply font-bold;
}
</style>
