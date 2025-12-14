<template>
  <div class="relative border border-black border-solid rounded-3xl p-6 lg:p-8 my-0 w-full max-w-2xl mx-auto flex flex-wrap" @mouseenter="active=true" @mouseleave="active=false">
    <div v-if="layout.image" class="[&>img]:object-cover aspect-w-16 aspect-h-10 md:aspect-w-16 md:aspect-h-8 2xl:aspect-w-16 2xl:aspect-h-10 border rounded-xl overflow-hidden w-full" v-html="layout.image" />
    <div class="mt-6 lg:mt-8 w-full">
      <Festival24PrimaryHeading v-if="layout.heading" :layout="{heading: layout.heading}" />
      <p v-if="layout.subheading" class="my-4 text-lg  lg:text-xl" v-html="layout.subheading" />
    </div>
    <Festival24Button class="self-end mt-auto mb-0" :to="layout.call_to_action.url|replaceSiteUrl" :target="layout.call_to_action.url" :active="active">
      <span
        v-html="layout.call_to_action.title"
      />
    </Festival24Button>
    <SiteLink
      :to="layout.call_to_action.url|replaceSiteUrl"
      class-names="block absolute top-0 left-0 w-full h-full z-10"
    >
      <span class="sr-only" v-html="layout.call_to_action.title" />
    </SiteLink>
  </div>
</template>
<script>
export default {
  name: 'Festival24CtaCard',
  props: {
    layout: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      active: false
    }
  }
}
</script>

<style scoped>

</style>
