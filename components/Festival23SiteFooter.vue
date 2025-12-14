<template>
  <footer id="site-footer" class="bg-black text-white relative z-10">
    <div class="pt-12 lg:py-20 text-sm 2xl:text-base 3xl:text-lg">
      <Container>
        <div class="lg:flex flex-wrap items-start">
          <div class="lg:flex items-start justify-between flex-wrap flex-grow lg:mr-8 mb-8 lg:mb-4">
            <Festival23SiteFooterNav v-for="(menu, key) in footerMenus" :key="`festivalFooterMenu${key}`" :menu="menu" />
          </div>
          <div class="lg:flex items-start lg:space-x-16 space-y-8 lg:space-y-0 justify-between flex-wrap">
            <div>
              <h3 class="font-normal mb-6 hidden lg:block">
                Follow Us
              </h3>
              <SocialNav :justify-end="false" :small="true" :margin-top="false" />
            </div>
            <Festival23NewsletterSignup />
          </div>
        </div>
      </Container>
    </div>
    <div class="lg:border-t-2 lg:border-white py-12 text-xs 2xl:text-sm">
      <Container>
        <div class="lg:flex justify-between items-center space-y-8 lg:space-y-0">
          <RawLink to="/" class-names="w-48 2xl:w-50 3xl:w-64 block">
            <Logo />
          </RawLink>
          <div class="lg:flex items-center lg:space-x-20 space-y-4 lg:space-y-0">
            <div class="lg:flex lg:space-x-6 space-y-4 lg:space-y-0">
              <span>&copy; 2023 BlackStar</span>
              <nav v-if="globalMenus">
                <ul class="lg:flex lg:space-x-6 space-y-4 lg:space-y-0">
                  <li v-for="(menuItem, key) in globalMenus.legal_menu" :key="`legalMenuItem${key}`">
                    <RawLink v-cursor-interact-alt :to="menuItem.link.url|replaceSiteUrl">
                      <span v-html="menuItem.link.title" />
                    </RawLink>
                  </li>
                </ul>
              </nav>
            </div>
            <MadeWithLove />
          </div>
        </div>
      </Container>
    </div>
  </footer>
</template>

<script>
import festivalSettings from '~/mixins/festivalSettings'

export default {
  name: 'Festival23SiteFooter',
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
