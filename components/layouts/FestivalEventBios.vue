<template>
  <ClientOnly>
    <div
      class="relative"
    >
      <Container class="relative z-30">
        <Space :lg="true" />
        <span :class="{'hidden md:block': $store.state.theme==='festival'}">
          <FestivalHeading border-class="-mb-border">
            <h2 v-html="layout.title" />
          </FestivalHeading>
        </span>
        <div class="" :class="{'md:border-5 md:border-navy bg-blue relative overflow-hidden  -mx-4 sm:-mx-8 md:-mx-0': $store.state.theme==='festival'}">
          <div class="relative" :style="(teamMember ? `min-height: ${height}px` : '')">
            <MqLayout :mq="['sm']">
              <h2 v-if="$store.state.theme==='festival'" class="text-2xl text-lime mt-4" v-html="layout.title" />

              <div class="overflow-hidden -mx-4 pl-4">
                <PostsCarousel>
                  <swiper-slide v-for="(bio, key) in bios" :key="`teamMemberSlider${bio.ID}`">
                    <FestivalTeamMember
                      class="lg:px-6"
                      :team-member="bio"
                      :index="key"
                      :alt="(key%2===1)"
                      :show-photo="true"
                      :click-handler="(bio.post_content ? () => { setActiveBio(bio) } : null)"
                    />
                  </swiper-slide>
                </PostsCarousel>
              </div>
              <transition name="fade-in-down">
                <FestivalTeamMemberExpanded
                  v-if="teamMember&&$store.state.theme==='bsf11'"
                  :team-member="teamMember"
                  :team-member-index="teamMemberIndex"
                  :previous-bio="previousBio"
                  :next-bio="nextBio"
                  :set-active-bio="setActiveBio"
                  :close-bio="closeBio"
                  :set-height="null"
                  :alt-style="true"
                />
              </transition>
            </MqLayout>
            <MqLayout mq="md+">
              <div class="flex flex-wrap -px-6">
                <div
                  v-for="(bio, key) in bios"
                  :key="`eventBio${bio.ID}`"
                  class="w-1/2 lg:w-1/3 2xl:w-1/4 px-6"
                  :class="{'relative z-10': $store.state.theme==='festival'}"
                >
                  <FestivalTeamMember
                    :team-member="bio"
                    :index="key"
                    :alt="(key%2===1)"
                    :show-photo="true"
                    :show-email="false"
                    :alt-style="true"
                    :event-id="eventId"
                    :click-handler="(bio.post_content ? () => { setActiveBio(bio) } : null)"
                    :active="teamMember&&teamMember.ID===bio.ID"
                  />
                  <transition name="fade-in-down">
                    <FestivalTeamMemberExpanded
                      v-if="teamMember&&teamMember.ID===bio.ID&&$store.state.theme==='bsf11'"
                      :team-member="teamMember"
                      :team-member-index="teamMemberIndex"
                      :previous-bio="previousBio"
                      :next-bio="nextBio"
                      :set-active-bio="setActiveBio"
                      :close-bio="closeBio"
                      :set-height="null"
                      :alt-style="true"
                    />
                  </transition>
                </div>
                <LazyRellaxShape v-if="$store.state.theme==='festival'" key="shape7" class="top-0 left-1/4 z-0 w-60">
                  <ShapeSeven />
                </LazyRellaxShape>
              </div>
            </MqLayout>
            <Space :md="true" />
          </div>
          <transition name="fade-in-down">
            <FestivalTeamMemberExpanded
              v-if="teamMember&&$store.state.theme==='festival'"
              :team-member="teamMember"
              :team-member-index="teamMemberIndex"
              :previous-bio="previousBio"
              :next-bio="nextBio"
              :set-active-bio="setActiveBio"
              :close-bio="closeBio"
              :set-height="setHeight"
            />
          </transition>
        </div>
        <LazyRellaxShape v-if="$store.state.theme==='festival'" key="shape8" class="top-2/3 right-1/4 z-10 w-60">
          <ShapeEight />
        </LazyRellaxShape>
      </Container>
      <LazyRellaxShape  v-if="$store.state.theme==='bsf11'" key="ExtraSquiggle3" class="bottom-0 right-0 z-0 w-full max-w-4xl">
        <ShapeSquiggle3 />
      </LazyRellaxShape>
      <LazyRellaxShape  v-if="$store.state.theme==='bsf11'" key="ShapeFlower" class="hidden lg:block bottom-0 left-32 z-0 w-full max-w-md">
        <ShapeFlower />
      </LazyRellaxShape>
    </div>
  </ClientOnly>
</template>

<script>
import layout from '~/mixins/layout'
import bio from '~/mixins/bio'
import ShapeSeven from '~/assets/festival/shape-7.svg?inline'
import ShapeEight from '~/assets/festival/shape-8.svg?inline'
import bios from '~/mixins/bios'
import ShapeSquiggle3 from '~/assets/festival/11/shape-squiggle3.svg?inline'
import ShapeFlower from '~/assets/festival/11/shape-flower.svg?inline'
export default {
  name: 'FestivalEventBios',
  components: { ShapeSeven, ShapeEight, ShapeSquiggle3, ShapeFlower },
  mixins: [layout, bio, bios],
  props: {
    eventId: {
      type: Number,
      required: false,
      default: null
    }
  }
}
</script>
