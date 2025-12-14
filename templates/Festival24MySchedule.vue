<script>
import forceBsf13Layout from '~/mixins/forceBsf13Layout'

export default {
  name: 'Festival24MySchedule',
  mixins: [forceBsf13Layout],
  props: {
    post: {
      type: Object,
      required: true
    },
    tryAgain: {
      type: Function,
      required: true
    },
    ready: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<template>
  <div>
    <Festival24Section :key="($store.state.festival.loggedInLocal ? `userSchedule${$store.state.festival.eventiveUser.localUserId}` : 'userScheduleGuest')" :section="{background: post.acf.background, layouts: [], style: 'full'}" :extra-padding="true">
      <template v-if="!ready">
        <Container>
          <div v-if="$store.state.festival.localScheduleError" class="min-h-screen text-center">
            <Festival24SecondaryHeading :layout="{heading: 'Error loading your schedule'}" />
            <Space />
            <Festival24Prose>
              <p>Sorry but there was an error loading your schedule, please try again.</p>
            </Festival24Prose>
            <Space />
            <div class="flex items-center justify-center">
              <Festival24Button :click-handler="tryAgain">
                Try again
              </Festival24Button>
            </div>
          </div>
          <div v-else class="min-h-screen">
            <Festival24Loader />
          </div>
        </Container>
      </template>
      <template v-else>
        <Festival24ScheduleByTime v-if="$route.query && $route.query.view && $route.query.view === 'time'" :post="post" :my-schedule="true" />
        <Festival24Schedule v-else :post="post" :show-time-view="true" :my-schedule="true" />
      </template>
    </Festival24Section>
    <Festival24Sections :layouts="post.acf.layouts" />
  </div>
</template>

<style scoped>

</style>
