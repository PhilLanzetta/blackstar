<template>
  <section class="bg-black feature-text" :class="`text-${layout.text_colour} feature-text--${layout.text_colour}`">
    <Space :lg="true" />
    <Container>
      <div v-if="layout.title" class="w-full feature-heading lg:flex justify-start items-baseline lg:space-x-4 lg:pb-20">
        <SymbolArrowsDownRight class="block w-14 md:w-20 lg:w-28 xl:w-32 h-auto lg:mr-6 mb-6 lg:mb-0" /><h1 v-html="layout.title" />
      </div>
      <Space v-if="layout.title" :lg="true" />
      <CursorInteractInside>
      <div class="feature-heading"  v-html="layout.text" />
      </CursorInteractInside>
      <div v-if="layout.buttons && layout.buttons.length">
        <Space />
        <div class="flex items-start justify-start space-x-4">
          <CircleButton v-for="(button, key) in layout.buttons" :key="`button${key}`" :to="button.link.url|replaceSiteUrl" :color-scheme="layout.text_colour">
            <span v-html="button.link.title" />
          </CircleButton>
        </div>
      </div>
      <div class="pt-10 pb-20 mt-10 border-t-4 border-white border-dotted feature-text__additional-content" v-if="layout.additional_content" v-html="layout.additional_content"></div>
    </Container>
    <Space v-if="!layout.additional_content" :lg="true" />
  </section>
</template>

<script>
import layout from '~/mixins/layout'
import SymbolArrowsDownRight from '~/assets/symbol-arrows-down-right.svg?inline'

export default {
  name: 'FeatureText',
  components: { SymbolArrowsDownRight },
  mixins: [layout]
}
</script>

<style>
.feature-text p {
  @apply mb-4;
}

.feature-text em {
  @apply font-serif_italic_alt font-normal;
}

.feature-text--white p a {
  @apply text-purple;
}

.feature-text--purple p a {
  @apply text-white;
}

.feature-text__additional-content {
  @apply text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight font-medium;
}

.feature-text__additional-content ul {
  @apply block list-none m-0 p-0 w-11/12;
}

.feature-text__additional-content ul li {
  @apply inline mr-1;
}

.feature-text__additional-content ul li::after {
  @apply inline text-purple ml-2;

  content: "●";
}

.feature-text__additional-content ul li:last-child::after {
  @apply hidden;
}

.feature-text__additional-content ul li em {
  @apply font-serif_italic_alt font-normal;
}

.feature-heading a,
.feature-text__additional-content a {
  @apply break-all;
}

</style>
