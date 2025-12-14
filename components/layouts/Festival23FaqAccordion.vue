<template>
  <div>
    <Festival23AccordionItem v-for="(faq, key) in items" :id="`faq${faq.id}`" :key="`faq${faq.id}`" :title="faq.acf.question_plain" :index="(key+1)">
      <div v-html="faq.content.rendered" />
    </Festival23AccordionItem>
    <Container class="mt-16 flex" v-if="items&&page<totalPages">
      <Festival23Button to="#" :click-handler="loadMore">
        Load More
      </Festival23Button>
    </Container>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import faqAccordion from '~/mixins/faqAccordion'

export default {
  name: 'Festival23FaqAccordion',
  mixins: [layout, livedata, faqAccordion]
}
</script>

<style scoped>

</style>
