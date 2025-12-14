<template>
  <Container>
    <div class="flex justify-between items-center my-6">
      <div class="w-2/3 flex space-x-2 items-center">
        <span class="block w-5 h-5 rounded-full bg-black -mt-1" />
        <h3 class="font-medium text-3xl" v-html="layout.heading" />
      </div>
      <div><SymbolArrowsDownRight class="w-10" /></div>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'
import SymbolArrowsDownRight from '~/assets/symbol-arrows-down-right.svg?inline'

export default {
  name: 'SubHeading',
  components: { SymbolArrowsDownRight },
  mixins: [layout]
}
</script>

<style scoped>

</style>
