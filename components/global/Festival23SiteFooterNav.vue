<template>
  <nav class="lg:mr-12">
    <ul class=" border-b border-white lg:border-0">
      <li>
        <button class="lg:hidden text-base flex justify-between items-center w-full py-3" @click.prevent="toggleMenu">
          <span v-html="menu.main_item.title" />
          <svg class="w-5 h-5 block transform transition-transform duration-300" :class="{'rotate-180': subMenuOpen}">
            <use xlink:href="#icon-arrow-down" />
          </svg>
        </button>
        <Festival23FooterNavLink :to="menu.main_item.url|replaceSiteUrl" class="hidden lg:block font-medium">
          <span v-html="menu.main_item.title" />
        </Festival23FooterNavLink>

        <ul class="mt-5 lg:block text-sm" :class="{'flex flex-wrap -mx-4 lg:mx-0 pb-6 lg:pb-0': subMenuOpen, 'hidden': !subMenuOpen}">
          <li class="px-4 w-1/2 lg:w-full lg:px-0" v-for="(subItem, subItemKey) in menu.sub_items" :key="`submenuItem${subItemKey}`">
            <Festival23FooterNavLink :to="subItem.link.url|replaceSiteUrl">
              <span v-html="subItem.link.title" />
            </Festival23FooterNavLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Festival23SiteFooterNav',
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
