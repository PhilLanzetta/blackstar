<template>
  <Container>
    <div class="seen-article__content" v-html="layout.content" />
  </Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'SeenContent',
  mixins: [layout]
}
</script>

<style>
.seen-article__content {
  @apply max-w-2xl mx-auto text-lg;
}

.seen-article__content p {
  @apply my-4;
}

.seen-article__content blockquote {
  @apply my-16 py-10 text-center lg:-mx-8 font-seen_serif_light text-3xl lg:text-4xl font-light relative;
}

.seen-article__content blockquote::before,
.seen-article__content blockquote::after {
  @apply absolute w-1/3 h-0.5 bg-black block top-4 left-1/2 transform -translate-x-1/2;
  content: " ";
}

.seen-article__content blockquote::after {
  @apply top-auto bottom-4;
}

.seen-article__content a {
  @apply underline;
}
</style>
