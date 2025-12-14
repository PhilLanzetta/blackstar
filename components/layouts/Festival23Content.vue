<template>
  <Container class="flex flex-wrap overflow-hidden">
    <div class="lg:-mx-10 2xl:-mx-16 flex flex-wrap">
      <div v-for="(column, key) in layout.columns" :key="`column${key}`" class="flex-shrink my-6 lg:px-10 2xl:px-16" :class="{'w-full lg:w-1/2 xl:w-1/3': layout.columns.length > 2, 'w-full lg:w-1/2': layout.columns.length>1, 'w-full': layout.columns.length===1}">
        <Festival23Prose><span v-html="column.content" /></Festival23Prose>
        <Festival23Buttons v-if="column.buttons&&column.buttons.length" class="mt-8" :buttons="column.buttons" />
      </div>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Festival23Content',
  mixins: [layout]
}
</script>

<style>
</style>
