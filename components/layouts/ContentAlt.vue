<template>
  <Container>
    <div class="flex justify-between items-center my-6 space-x-8">
      <CursorInteractInside>
        <div class="content-alt" v-html="layout.content" />
      </CursorInteractInside>
      <div v-if="layout.arrows">
        <SymbolArrowsDownRight class="w-10" />
      </div>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'
import SymbolArrowsDownRight from '~/assets/symbol-arrows-down-right.svg?inline'
import CursorInteractInside from '~/components/global/CursorInteractInside'

export default {
  name: 'ContentAlt',
  components: { CursorInteractInside, SymbolArrowsDownRight },
  mixins: [layout]
}
</script>
