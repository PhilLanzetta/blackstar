<template>
  <div class="bsf13-prose" :class="{'bsf13-prose--small': small}">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Festival24Prose',
  props: {
    small: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style>
.bsf13-prose {
  @apply text-base 2xl:text-lg 3xl:text-xl;
}

.bsf13-prose--small {
  @apply text-sm 2xl:text-base 3xl:text-base;
}

.bsf13-prose p,
.bsf13-prose ul,
.bsf13-prose ol,
.bsf13-prose blockquote,
.bsf13-prose audio,
.bsf13-prose video,
.bsf13-prose img {
  @apply mb-4;
}

.bsf13-prose strong {
  @apply font-medium;
}

.bsf13-prose h1,
.bsf13-prose h2,
.bsf13-prose h3,
.bsf13-prose h4 {
  @apply font-sans font-normal mb-6 last:mb-0;
}

.bsf13-prose h1,
.bsf13-prose h2 {
  @apply text-2xl lg:text-3xl 2xl:text-4xl;
}

.bsf13-prose h3,
.bsf13-prose h4 {
  @apply text-xl lg:text-2xl 2xl:text-3xl;
}

.bsf13-prose a {
  @apply underline;
}

.bsf13-prose ul {
  @apply list-disc;
}

.bsf13-prose ol {
  @apply list-decimal;
}

.bsf13-prose ul,
.bsf13-prose ol {
  @apply pl-6;
}

.bsf13-prose ul li,
.bsf13-prose ol li {
  @apply mb-2;
}
</style>
