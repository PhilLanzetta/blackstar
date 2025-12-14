<template>
  <Container>
    <div class="seen-article__content">
      <div class="seen-article__footnotes">
        <p>Footnotes:</p>
        <div v-html="layout.footnotes"></div>
      </div>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'SeenFootnotes',
  mixins: [layout]
}
</script>

<style>
.seen-article__footnotes {
  @apply relative py-10 mt-10 border-t-2 border-dotted border-gray text-sm lg:text-xs font-seen_serif;
}

.seen-article__footnotes ol {
  @apply pl-5 list-decimal;
}

</style>
