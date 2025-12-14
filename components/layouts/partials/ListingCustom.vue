<template>
  <article class="select-none" :class="{'max-w-sm': !large}">
    <div class="relative">
      <Sticker v-if="customItem.sticker" :label="customItem.sticker" :color-scheme="colorScheme" />

      <SiteLink v-if="customItem.buttons&&customItem.buttons.length" :to="customItem.buttons[0].link.url|replaceSiteUrl">
        <RoundedImage :shape="(square ? 'square' : 'rectangle')">
          <span v-html="customItem.image" />
        </RoundedImage>
      </SiteLink>
      <RoundedImage v-if="!(customItem.buttons&&customItem.buttons.length)" :shape="(square ? 'square' : 'rectangle')">
        <span v-html="customItem.image" />
      </RoundedImage>
    </div>
    <header class="mt-4">
      <span v-if="customItem.pre_title" class="block font-serif_italic mb-0.5" v-html="customItem.pre_title" />
      <h1 class="secondary-heading mb-1" v-html="customItem.title" />
    </header>

    <p class="font-serif text-sm mt-4" v-html="customItem.short_description" />

    <footer v-if="customItem.buttons&&customItem.buttons.length" class="flex space-x-4 mt-8 swiper-no-swiping">
      <PillButton
        v-for="(button, buttonKey) in customItem.buttons"
        :key="`customItemButton${buttonKey}`"
        :to="button.link.url|replaceSiteUrl"
        :color-scheme="colorScheme"
        :force-scheme="forceScheme"
        :outline="(buttonKey===1)"
      >
        <span v-html="button.link.title" />
      </PillButton>
    </footer>
  </article>
</template>

<script>
import ColourScheme from '~/mixins/ColourScheme'

export default {
  name: 'ListingCustom',
  mixins: [ColourScheme],
  props: {
    customItem: {
      type: Object,
      required: true
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    },
    square: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>

<style scoped>

</style>
