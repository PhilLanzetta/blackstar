<template>
  <section class="relative">
    <AccordionItem v-for="(faq, key) in items" :id="`faq${faq.id}`" :key="`faq${faq.id}`" :title="faq.acf.question" :index="(key+1)">
      <div class="faq" v-html="faq.content.rendered" />
    </AccordionItem>
    <div v-if="items&&page<totalPages" class="flex items-center justify-center py-10">
      <PillButton to="#" :click-handler="loadMore" color-scheme="black">
        Load More
      </PillButton>
    </div>
  </section>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import faqAccordion from '~/mixins/faqAccordion'

export default {
  name: 'FaqAccordion',
  mixins: [layout, livedata, faqAccordion]
}
</script>

<style>

</style>
