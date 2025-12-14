<template>
  <Container>
    <div class="border-t-2 border-dotted border-black lg:flex lg:items-start lg:justify-between py-8">
      <h2 v-html="layout.heading" class="font-serif_italic mb-10 lg:mb-0 lg:w-2/12" />

      <ul class="lg:w-9/12 lg:flex flex-wrap items-start lg:-mx-8">
        <li v-for="(item, key) in layout.items" :key="`listItem${key}`" class="lg:w-1/4 lg:px-4 mb-8">
          <strong v-html="item.heading" /> <span v-if="item.detail" v-html="item.detail" />
        </li>
      </ul>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'TextList',
  mixins: [layout]
}
</script>

<style scoped>
  ul li strong {
    @apply block lg:text-lg;
  }

  ul li span {
    @apply font-serif text-sm;
  }
</style>
