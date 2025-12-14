<template>
  <nav class="lg:mr-28">
    <ul>
      <li>
        <Festival24FooterNavLink :to="menu.main_item.url|replaceSiteUrl" class="lg:block text-base font-medium">
          <span v-html="menu.main_item.title" />
        </Festival24FooterNavLink>
        <ul class="lg:block flex flex-wrap lg:mx-0 py-3 lg:pt-5 lg:pb-0">
          <li class="pr-4 lg:w-full lg:px-0" v-for="(subItem, subItemKey) in menu.sub_items" :key="`submenuItem${subItemKey}`">
            <Festival24FooterNavLink :to="subItem.link.url|replaceSiteUrl">
              <span class="text-base" v-html="subItem.link.title" />
            </Festival24FooterNavLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Festival24SiteFooterNav',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      subMenuOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.subMenuOpen = !this.subMenuOpen
    }
  }
}
</script>

<style scoped>
ul li ul li {
  @apply mb-2;
}
</style>
