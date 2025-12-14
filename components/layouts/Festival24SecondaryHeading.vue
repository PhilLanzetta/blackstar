<template>
  <h3 class="text-2xl lg:text-3xl 2xl:text-4xl font-sans font-normal mt-6 mb-3" v-html="layout.heading" />
</template>

<script>
export default {
  name: 'Festival24SecondaryHeading',
  props: {
    layout: {
      type: Object,
      required: true
    }
  }
}
</script>
