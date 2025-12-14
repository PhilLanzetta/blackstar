<script>
import forceBsf12Layout from '~/mixins/forceBsf12Layout'

export default {
  name: 'Festival23MySchedule',
  mixins: [forceBsf12Layout],
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
    <ClientOnly>
      <Festival23Section :key="($store.state.festival.loggedInLocal ? `userSchedule${$store.state.festival.eventiveUser.localUserId}` : 'userScheduleGuest')" :background="post.acf.background">
        <template v-if="!ready">
          <Container>
            <div v-if="$store.state.festival.localScheduleError" class="min-h-screen">
              <Festival23H2 size="xl">
                Error loading your schedule
              </Festival23H2>
              <Space />
              <Festival23Prose>
                <p>Sorry but there was an error loading your schedule, please try again.</p>
              </Festival23Prose>
              <Space />
              <div class="flex">
                <Festival23Button :click-handler="tryAgain">
                  Try again
                </Festival23Button>
              </div>
            </div>
            <div v-else class="min-h-screen">
              <Festival23Loader />
            </div>
          </Container>
        </template>
        <template v-else>
          <Festival23ScheduleByTime v-if="$route.query && $route.query.view && $route.query.view === 'time'" :post="post" :section-colour="post.acf.background" :my-schedule="true" />
          <Festival23Schedule v-else :section-colour="post.acf.background" :post="post" :show-time-view="true" :my-schedule="true" />
        </template>
      </Festival23Section>
    </ClientOnly>
    <Festival23Sections v-if="post.acf.layouts&&post.acf.layouts.length" class="relative z-10" :layouts="post.acf.layouts" />
  </div>
</template>

<style scoped>

</style>
