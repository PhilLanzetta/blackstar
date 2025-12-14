<template>
  <ul v-if="links.length" :class="{'space-y-4': !inline, 'flex -mx-2': inline}">
    <li
      v-for="(link, key) in links"
      :key="`link${key}`"
      class="flex"
      :class="{'px-2': inline}"
    >
      <Festival23HeaderNavItem :active="true" :to="link.link.url|replaceSiteUrl">
        <span v-html="link.link.title" />
      </Festival23HeaderNavItem>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Festival23Links',
  props: {
    links: {
      type: Array,
      required: true
    },
    inline: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
