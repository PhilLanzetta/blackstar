<template>
  <div>
    <Festival23AccordionItem v-for="(faq, key) in layout.items" :id="`faq${faq.id}`" :key="`faq${faq.id}`" :title="faq.heading" :index="(key+1)">
      <div class="faq" v-html="faq.content" />
    </Festival23AccordionItem>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'

export default {
  name: 'Festival23Accordion',
  mixins: [layout, livedata]
}
</script>

<style scoped>

</style>
