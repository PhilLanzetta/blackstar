<template>
  <article class="single-bio">
    <header class="single-bio__header bg-black text-white">
      <Container>
        <div class="single-bio__header__title">
          <SiteLink class="single-bio__header__back" to="/about#staff">
            <span class="flex items-baseline space-x-4 leading-none"><span
              class="single-bio__header__back__arrow"
            >&larr;&larr;</span> <span>Back to all staff</span></span>
          </SiteLink>
          <span v-if="post.acf.pronouns" class="block text-sm mb-1 font-serif_italic" v-html="post.acf.pronouns" />

          <h1 class="feature-heading" v-html="post.title.rendered" />
          <h2 class="secondary-heading" v-html="post.acf.position" />
        </div>
      </Container>
    </header>
    <div class="bg-teal">
      <Container>
        <div :key="`postExpanded${post.ID}`" class="text-white lg:flex justify-between items-start lg:space-x-32 py-8 lg:pb-20 lg:pt-40">
          <div class="lg:w-6/12 relative">
            <TeamMemberImage :lg="true" :image="(post.featured_image_rendered_large ? post.featured_image_rendered_large : null)" />
          </div>

          <div class="lg:w-6/12">
            <div class="lg:mt-8">
              <nav v-if="post.acf.social_profiles" class="social-nav mt-8">
                <ul class="flex space-x-6 items-center justify-start">
                  <li v-if="post.acf.social_profiles.instagram">
                    <a v-cursor-interact-alt :href="post.acf.social_profiles.instagram" target="_blank" class="w-8"><IconInstragram /><span
                      class="sr-only"
                    >Instagram</span></a>
                  </li>
                  <li v-if="post.acf.social_profiles.twitter">
                    <a v-cursor-interact-alt :href="post.acf.social_profiles.twitter" target="_blank" class="w-8"><IconTwitter /><span class="sr-only">Twitter</span></a>
                  </li>
                  <li v-if="post.acf.social_profiles.linkedin">
                    <a v-cursor-interact-alt :href="post.acf.social_profiles.linkedin" target="_blank" class="w-6"><IconLinkedIn /><span
                      class="sr-only"
                    >LinkedIn</span></a>
                  </li>
                  <li v-if="post.acf.social_profiles.facebook">
                    <a v-cursor-interact-alt :href="post.acf.social_profiles.facebook" target="_blank" class="w-3.5"><IconFacebook /><span
                      class="sr-only"
                    >Facebook</span></a>
                  </li>
                  <li v-if="post.acf.social_profiles.youtube">
                    <a v-cursor-interact-alt :href="post.acf.social_profiles.youtube" target="_blank" class="w-9"><IconYoutube /><span
                      class="sr-only"
                    >YouTube</span></a>
                  </li>
                  <li v-if="post.acf.social_profiles.website">
                    <a v-cursor-interact-alt :href="post.acf.social_profiles.website" target="_blank" class="w-6"><IconLink /><span
                      class="sr-only"
                    >Website</span></a>
                  </li>
                </ul>
              </nav>
              <CursorInteractInside>
                <div class="font-medium xl:text-xl org-bio__content" v-html="(post.post_content ? post.post_content : post.content.rendered)" />
              </CursorInteractInside>
              <div class="flex mt-8 flex-wrap justify-start">
                <PillButton
                  v-if="post.acf.email_address"
                  :to="`mailto:${post.acf.email_address}`"
                  color-scheme="white"
                  class="w-full md:w-auto mt-2 mb-2 md:mb-0 md:mr-2"
                  :force-scheme="true"
                >
                  Get in touch
                </PillButton>
                <PillButton
                  to="/about#staff"
                  :outline="true"
                  color-scheme="white"
                  class="w-full md:w-auto mt-2 mb-2 md:mb-0"
                  :force-scheme="true"
                >
                  Back to staff
                </PillButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  </article>
</template>
<script>

export default {
  name: 'Biography',
  props: {
    post: {
      type: Object,
      required: false,
      default: null
    }
  }
}
</script>

<style>
@import "~/assets/css/components/team-member.css";

.single-bio__header__title {
  @apply py-10;
}

.single-bio__header__back {
  @apply font-medium text-purple text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 block;
}

.single-bio__header__back__arrow {
  @apply font-light text-2xl lg:text-4xl xl:text-6xl;
}
</style>
