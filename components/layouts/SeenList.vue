<template>
  <Container>
    <SeenHeadingSmall :heading="layout.heading" />
    <ul class="lg:flex flex-wrap lg:-mx-8">
      <li class="lg:px-8 mb-8 lg:w-1/5" v-for="(listItem, listItemKey) in layout.list_items" :key="`listItem${listItemKey}`">
        <p><strong v-html="listItem.line_1"></strong> <span v-if="listItem.line_2" v-html="listItem.line_2"></span></p>
      </li>
    </ul>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'
import SeenHeadingSmall from '~/components/layouts/partials/SeenHeadingSmall'

export default {
  name: 'SeenList',
  components: { SeenHeadingSmall },
  mixins: [layout]
}
</script>

<style scoped>
ul li {
  @apply text-lg font-seen_serif_light_italic;
}

ul li strong {
  @apply font-seen_serif_light block;
}
</style>
