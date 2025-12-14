<template>
  <section class="bg-purple text-3xl font-medium">
    <ScrollMarquee symbol="arrows-down" word2="Location" word1="Details" force-colour="black" />

    <Container>
      <div class="lg:flex lg:space-x-10 items-start pb-20 pt-5 lg:py-20">
        <div class="lg:w-7/12 md:flex md:space-x-10 items-start mb-8 lg:mb-0">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h2 v-if="layout.column_one.title" v-html="layout.column_one.title"></h2>
            <h2 v-if="!layout.column_one.title">Where</h2>
            <p v-if="layout.column_one.content" v-html="layout.column_one.content"></p>
            <p v-if="!layout.column_one.content" v-html="post.acf.location"></p>
          </div>
          <div class="md:w-1/2">
            <h2 v-if="layout.column_two.title" v-html="layout.column_two.title"></h2>
            <h2 v-if="!layout.column_two.title">Starts</h2>
            <p v-if="layout.column_two.content" v-html="layout.column_two.content"></p>
            <p v-if="!layout.column_two.content">{{ post.acf.start_time|formatDate }}</p>
          </div>
        </div>
        <div class="lg:w-5/12">
          <h2 v-if="layout.column_three.title" v-html="layout.column_three.title"></h2>
          <h2 v-if="!layout.column_three.title">Ends</h2>
          <p v-if="layout.column_three.content" v-html="layout.column_three.content"></p>
          <p v-if="!layout.column_three.content">{{ post.acf.end_time|formatDate }}</p>
        </div>
      </div>
    </Container>
  </section>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'EventDetails',
  mixins: [layout],
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
h2 {
  @apply font-serif_italic text-sm mb-4;
}
</style>
