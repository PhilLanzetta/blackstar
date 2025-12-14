<template>
  <div class="lg:gap-6 lg:grid" :class="{'lg:grid-cols-2 xl:grid-cols-3': layout.columns.length > 2, 'lg:grid-cols-2': layout.columns.length === 2}">
    <div
      v-for="(column, key) in layout.columns"
      :key="`column${key}`"
    >
      <Festival24Prose><span v-html="column.content" /></Festival24Prose>
      <Festival24Buttons v-if="column.buttons&&column.buttons.length" class="mt-8" :buttons="column.buttons" />
    </div>
  </div>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Festival24Content',
  mixins: [layout]
}
</script>

<style>
</style>
