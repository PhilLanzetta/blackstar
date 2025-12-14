<template>
  <div>
    <Festival24AccordionItem
      v-for="(faq, key) in layout.items"
      :id="`faq${faq.id}`"
      :key="`faq${faq.id}`"
      :title="faq.heading"
      :index="(key+1)"
      :background="(layout.background ? layout.background : null)">
      <div class="faq" v-html="faq.content"/>
    </Festival24AccordionItem>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'

export default {
  name: 'Festival24CustomAccordion',
  mixins: [layout, livedata]
}
</script>

<style scoped>

</style>
