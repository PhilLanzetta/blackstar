<template>
  <Container class="flex justify-between items-end">
    <h2 :class="headingSizes" class="mb-4" v-html="layout.heading" />
    <div v-if="layout.links&&layout.links.length" class="hidden md:flex space-x-4 text-lg 2xl:text-xl mb-7">
      <Festival23HeaderNavItem :active="true" v-for="(link, key) in layout.links" :key="`link${key}`" :to="link.link.url|replaceSiteUrl">
        <span v-html="link.link.title" />
      </Festival23HeaderNavItem>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'
import festival23HeadingSizes from '~/mixins/festival23HeadingSizes'

export default {
  name: 'Festival23Heading',
  mixins: [layout, festival23HeadingSizes]
}
</script>

<style scoped>

</style>
