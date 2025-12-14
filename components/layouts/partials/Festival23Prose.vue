<template>
  <div class="bsf23-content"><slot /></div>
</template>

<script>
export default {
  name: 'Festival23Prose'
}
</script>

<style>
.bsf23-content {
  @apply text-base 2xl:text-lg 3xl:text-xl;
}

.bsf23-content p,
.bsf23-content ul,
.bsf23-content ol,
.bsf23-content blockquote,
.bsf23-content audio,
.bsf23-content video,
.bsf23-content img {
  @apply mb-4;
}

.bsf23-content ul {
  @apply list-disc;
}

.bsf23-content ol {
  @apply list-decimal;
}

.bsf23-content ul,
.bsf23-content ol {
  @apply pl-6;
}

.bsf23-content ul li,
.bsf23-content ol li {
  @apply mb-2;
}
</style>
