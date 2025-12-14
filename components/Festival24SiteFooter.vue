<template>
  <footer id="site-footer" class="bg-black text-white relative z-10 rounded-t-3xl lg:rounded-t-4xl">
    <div class="pt-4 lg:pt-20 lg:pb-24 text-sm 2xl:text-base 3xl:text-lg">
      <Container>
        <div class="lg:flex flex-wrap items-start pb-5 lg:pb-0">
          <div class="lg:flex items-start justify-between flex-wrap lg:mr-8">
            <Festival24SiteFooterNav class="border-b last:border-b-0 border-white lg:border-0 pt-5 mx-0" v-for="(menu, key) in footerMenus" :key="`festivalFooterMenu${key}`" :menu="menu" />
          </div>
        </div>
      </Container>
    </div>
    <div class="text-black pt-4 rounded-t-3x " :class="{'bg-bsf13purple': $store.state.theme==='bsf13', 'bg-bsf14yellowTint': $store.state.theme==='bsf14'}">
      <Container class="">
        <div class="flex flex-col-reverse justify-between items-center lg:space-y-0 pb-10 pt-4 lg:pt-6 lg:pb-8 lg:px-0">
          <div class="lg:flex lg:flex-row-reverse mr-auto lg:w-full lg:justify-between items-center space-y-2 lg:space-y-0">
            <div class="hidden lg:block">
              <MadeWithLove />
            </div>
            <div class="text-base lg:text-sm lg:flex lg:space-x-6 space-y-2 lg:space-y-0 lg:mx-6">
              <nav v-if="globalMenus">
                <ul class="lg:flex lg:flex-row-reverse lg:last:[&>li]:ml-0 lg:first:[&>li]:ml-6 lg:space-x-6 space-y-2 lg:space-y-0">
                  <li class="lg:whitespace-nowrap" v-for="(menuItem, key) in globalMenus.legal_menu" :key="`legalMenuItem${key}`">
                    <RawLink v-cursor-interact-alt :to="menuItem.link.url|replaceSiteUrl">
                      <span v-html="menuItem.link.title" />
                    </RawLink>
                  </li>
                  <li>
                    <span class="lg:whitespace-nowrap">&copy; 2025 All Rights Reserved</span>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="lg:hidden">
              <MadeWithLove />
            </div>
            <RawLink to="/" class-names="block mt-10 lg:mt-0">
              <div class="max-w-[340px]">
                <Logo />
              </div>
            </RawLink>
          </div>
        </div>
      </Container>
    </div>
  </footer>
</template>

<script>
import festivalSettings from '~/mixins/festivalSettings'

export default {
  name: 'Festival24SiteFooter',
  mixins: [festivalSettings],
  computed: {
    footerMenus () {
      if (this.settings && this.settings.footer_menus) {
        return this.settings.footer_menus
      }

      return []
    },
    globalMenus () {
      return this.$store.state.settings.footer_menus
    }
  }
}
</script>

<style scoped>
</style>
