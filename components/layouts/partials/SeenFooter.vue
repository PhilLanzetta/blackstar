<template>
  <Container v-if="settings">
    <Space :lg="true" />
    <div class="lg:flex flex-row-reverse justify-between items-start">
      <div class="lg:w-9/12">
        <SeenNewsletterSignup key="siteSignup" />

        <div class="flex justify-between">
          <nav class="seen-footer-nav">
            <ul>
              <li v-for="(menuItem, key) in settings.footer_menu" :key="`seenFooterMenu${key}`">
                <SiteLink :to="menuItem.link.url|replaceSiteUrl">
                  <span v-html="menuItem.link.title" />
                </SiteLink>
              </li>
            </ul>
          </nav>
          <SeenSocialNav :settings="settings.social_links" />
        </div>
      </div>
      <div class="hidden lg:block lg:w-3/12">
        &nbsp;
      </div>
    </div>
    <Space :lg="true" />
  </Container>
</template>

<script>
export default {
  name: 'SeenFooter',
  computed: {
    settings () {
      if (this.$store.state.settings) {
        return this.$store.state.settings.seen
      }

      return false
    }
  }
}
</script>

<style>
.seen-footer-nav {
  @apply font-seen_serif_light;
}
.seen-footer-nav li {
  @apply mb-0.5;
}
.seen-footer-nav a {
  @apply underline;
}
</style>
