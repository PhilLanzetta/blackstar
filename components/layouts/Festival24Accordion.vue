<template>
  <div>
    <Festival24AccordionItem
      v-for="(faq, key) in items"
      :id="`faq${faq.id}`"
      :key="`faq${faq.id}`"
      :title="faq.title.rendered"
      :index="(key+1)"
      :background="(layout.background ? layout.background : null)"
    >
      <div class="faq" v-html="faq.content.rendered" />
    </Festival24AccordionItem>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import faqAccordion from '~/mixins/faqAccordion'

export default {
  name: 'Festival24Accordion',
  mixins: [layout, livedata, faqAccordion]
}
</script>

<style scoped>

</style>
