<template>
  <section>
    <Container>
      <CursorInteractInside>
      <div class="standard-content" v-html="layout.content"></div>
      </CursorInteractInside>
    </Container>
  </section>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Content',
  mixins: [layout]
}
</script>

<style>
.standard-content {
  @apply text-lg lg:text-xl xl:text-2xl font-medium;
}

.standard-content p {
  @apply mb-5;
}

.standard-content h1 {
  @apply text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-10;
}

.standard-content h2 {
  @apply text-2xl lg:text-4xl xl:text-5xl mb-10;
}

.standard-content h3 {
  @apply text-xl lg:text-3xl mb-5;
}

.standard-content h4 {
  @apply text-lg md:text-xl lg:text-2xl xl:text-3xl mb-5 font-serif_italic_alt;
}

.standard-content h5 {
  @apply text-base md:text-lg lg:text-xl xl:text-2xl mb-5 font-normal;
}

.standard-content h6 {
  @apply lg:text-xl font-serif_italic font-normal mb-5;
}

.standard-content blockquote {
  @apply my-10 pl-10 text-lg lg:text-2xl border-l-4 border-dotted;
}

.standard-content blockquote strong {
  @apply block text-right font-normal mt-5;
}

.standard-content a {
  @apply text-purple;
}
.standard-content ul {
  @apply block list-none p-0 m-0 mb-4;
}

.standard-content ul li {
  @apply inline mr-1;
}

.standard-content ul li::before {
  content: "●";
  @apply mr-2 text-purple inline;
}
</style>
