<template>
  <div class="flex flex-wrap w-full">
    <div v-for="(layout, key) in layouts" :key="`layout${key}`" class="w-full" :class="{'flex items-stretch flex-wrap': layout.acf_fc_layout==='card'||layout.acf_fc_layout==='cta_card', 'self-start': !( layout.acf_fc_layout==='card'||layout.acf_fc_layout==='cta_card')}">
      <Festival24Card v-if="layout.acf_fc_layout==='card'" :layout="layout" />
      <Festival24Buttons v-if="layout.acf_fc_layout==='buttons'" :layout="layout" />
      <Festival24Content v-if="layout.acf_fc_layout==='content'" :layout="layout" />
      <Festival24Heading v-if="layout.acf_fc_layout==='heading'" :layout="layout" />
      <Festival24PrimaryHeading v-if="layout.acf_fc_layout==='primary_heading'" :layout="layout" />
      <Festival24PrimaryContent v-if="layout.acf_fc_layout==='primary_content'" :layout="layout" />
      <Festival24Media v-if="layout.acf_fc_layout==='media'" :layout="layout" />
      <Festival24NewsArticles v-if="layout.acf_fc_layout==='news_articles'" :layout="layout" />
      <Festival24CtaCard v-if="layout.acf_fc_layout==='cta_card'" :layout="layout" />
      <Festival24Hero v-if="layout.acf_fc_layout==='hero'" :layout="layout" />
      <Festival24Accordion v-if="layout.acf_fc_layout==='faq_accordion'" :layout="layout" />
      <Space v-if="layout.acf_fc_layout==='spacer'" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Festival24Layouts',
  props: {
    layouts: {
      type: Array,
      required: true
    }
  }
}
</script>
