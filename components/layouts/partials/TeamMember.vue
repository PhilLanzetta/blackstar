<template>
  <div class="org-team-member relative">
    <div class="relative">
      <TeamMemberImage :image="(teamMember.featured_image_rendered ? teamMember.featured_image_rendered : null)" />
      <TeamMemberHeading
        :title="teamMember.title.rendered"
        :pronouns="teamMember.acf.pronouns"
        :position="position"
        :moderator="moderator"
      />
      <button
        v-if="teamMember.acf.show_single_page"
        v-cursor-hint="'Read More'"
        class="hidden w-full h-full absolute top-0 left-0 lg:block"
        @click.prevent="handleClick"
      >
        <span class="sr-only">Read more about {{ teamMember.title.rendered }}</span>
      </button>
    </div>
    <div class="flex flex-wrap items-start pt-4">
      <PillButton
        v-if="teamMember.acf.show_single_page"
        :to="`/about/${teamMember.slug}`"
        color-scheme="white"
        :force-scheme="true"
        :click-handler="handleClick"
        :outline="true"
        class="block w-full md:w-auto mb-2 md:mb-0 md:mr-2"
      >
        Read More
      </PillButton>
      <PillButton
        v-if="teamMember.acf.email_address"
        :to="`mailto:${teamMember.acf.email_address}`"
        color-scheme="white"
        class="block w-full md:w-auto mb-2 md:mb-0"
        :force-scheme="true"
      >
        Get in touch
      </PillButton>
    </div>
  </div>
</template>

<script>
import bio from '~/mixins/bio'

export default {
  name: 'TeamMember',
  mixins: [bio],
  props: {
    teamMember: {
      type: Object,
      required: true
    },
    clickHandler: {
      type: Function,
      required: false,
      default: null
    },
    eventId: {
      type: Number,
      required: false,
      default: null
    }
  },
  methods: {
    handleClick () {
      if (this.clickHandler) {
        this.clickHandler(this.teamMember)
        return
      }

      this.goToBio()
    },
    goToBio () {
      this.$router.push(`/about/${this.teamMember.slug}`)
    }
  }
}
</script>

<style>
@import "~/assets/css/components/team-member.css";
</style>
