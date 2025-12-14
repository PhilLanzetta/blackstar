<template>
  <div>
    <FestivalFlexibleLayouts v-if="post&&post.template==='views/festival-flexible-layouts.blade.php'" :key="`flexibleFestivalLayouts${post.id}`" :post="post" />
    <SeenFlexibleLayouts v-if="post&&post.template==='views/seen-flexible-layouts.blade.php'" :key="`flexibleSeenLayouts${post.id}`" :post="post" />
    <FlexibleLayouts v-if="post&&!post.template" :key="`flexibleLayouts${post.id}`" :post="post" />
    <FestivalSchedulePage v-if="post&&post.template==='views/festival-schedule.blade.php'" :key="`festivalSchedulePage${post.id}`" :post="post" />
    <FestivalVirtualGuidePage v-if="post&&post.template==='views/festival-virtual-guide.blade.php'" :key="`festivalVirtualGuide${post.id}`" :post="post" />
    <FestivalEventGuidePage v-if="post&&post.template==='views/festival-event-guide.blade.php'" :key="`festivalEventGuide${post.id}`" :post="post" />
    <FestivalFilmGuidePage v-if="post&&post.template==='views/festival-film-guide.blade.php'" :key="`festivalFilmGuide${post.id}`" :post="post" />
    <FestivalMySchedulePage v-if="post&&post.template==='views/festival-my-schedule.blade.php'" :key="`festivalMySchedule${post.id}`" :post="post" />
  </div>
</template>
<script>
import FestivalFlexibleLayouts from '~/templates/FestivalFlexibleLayouts'
import FlexibleLayouts from '~/templates/FlexibleLayouts'
import SeenFlexibleLayouts from '~/templates/SeenFlexibleLayouts'
import FestivalSchedulePage from '~/templates/FestivalSchedulePage'

export default {
  name: 'Page',
  components: {
    SeenFlexibleLayouts,
    FestivalFlexibleLayouts,
    FlexibleLayouts,
    FestivalSchedulePage
  },
  props: {
    post: {
      type: Object,
      required: false,
      default: null
    }
  }
}
</script>
