<template>
  <Container>
    <SeenHeadingSmall :heading="layout.heading" />
    <div class="-mt-4">
      <SeenAccordionItem
        v-for="(item, key) in layout.accordion_sections"
        :id="key"
        :key="`item${key}`"
        :title="item.heading"
        :index="(key+1)"
      >
        <div class="flex space-x-20 items-start justify-between">
          <div v-for="(column, columnKey) in item.columns" :key="`item${key}Column${columnKey}`">
            <h3 class="font-seen_serif underline mb-2" v-html="column.heading"></h3>
            <div v-html="column.content"></div>
          </div>
        </div>
      </SeenAccordionItem>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'SeenAccordion',
  mixins: [layout]
}
</script>

<style scoped>

</style>
