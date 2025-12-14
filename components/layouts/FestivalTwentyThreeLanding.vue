<template>
  <div v-if="settings" class="w-full min-h-full bg-bsf12blue">
    <FestivalTwentyThreeCallToAction :call-to-action="settings.call_to_action" />
    <div class="bg-bsf12Bg">
      <Container>
        <FestivalTwentyThreeAnimation />
      </Container>
    </div>
    <div v-if="settings.introduction" class="bg-bsf12blue py-16 lg:py-32 text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl">
      <Container>
        <p class="leading-tight" v-html="settings.introduction" />
      </Container>
    </div>
    <div
      v-if="settings.passes&&settings.passes.length"
      id="passes"
      class="bg-bsf12yellow py-10 xl:py-20 text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl overflow-hidden"
    >
      <Container>
        <p v-if="settings.passes_heading" class="leading-tight" v-html="settings.passes_heading" />

        <div ref="passes" class="md:flex flex-wrap space-y-8 md:space-y-0 md:-mx-8 mt-8 xl:-mx-16 xl:mt-16 items-stretch">
          <div
            v-for="(pass, key) in settings.passes"
            :id="`pass-${key}`"
            :key="`takeoverPass${key}`"
            class="md:w-1/2 flex items-stretch md:px-8 xl:px-16 flex-shrink-0"
            data-aos="flip-up"
            :data-aos-delay="(300*key)"
          >
            <Festival23BoxOld>
              <div class="mt-0 mb-auto">
                <h2 v-html="pass.name" />
                <h3 v-if="pass.discount_price">
                  <span class="line-through font-light">${{ pass.price }}</span> <span class="font-medium">${{ pass.discount_price }}</span>
                </h3>
                <h3 v-if="!pass.discount_price">
                  ${{ pass.price }}
                </h3>
                <p v-if="pass.description" v-html="pass.description" />
              </div>
              <div class="mt-auto mb-0">
                <div class="festival-23-btn-wrap festival-23-btn-wrap--start">
                  <button v-cursor-interact class="festival-23-btn festival-23-btn--inverse" @click.prevent="() => { openEventive(key) }">
                    <span>Buy now</span>
                  </button>
                  <div
                    :ref="`eventive-button-${pass.eventive_id}`"
                    class="eventive-button sr-only"
                    :data-pass-bucket="pass.eventive_id"
                    data-buy-label="Buy now"
                    data-quantity="1"
                    data-discount=""
                  />
                </div>
              </div>
            </Festival23BoxOld>
          </div>
        </div>
      </Container>
    </div>
    <div v-if="settings.buttons&&settings.buttons.length" class="bg-bsf12blue py-10 xl:py-20 bsf22-lp-more">
      <Container>
        <div v-if="settings.buttons_heading" class="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl mb-8 xl:mb-16">
          <p class="leading-tight" v-html="settings.buttons_heading" />
        </div>

        <div class="mx-auto flex flex-wrap md:space-x-6 justify-start items-start">
          <span
            v-for="(button, key) in settings.buttons"
            :key="`takeoverButton${key}`"
            class="festival-23-btn-wrap"
            data-aos="flip-up"
            :data-aos-delay="(100*key)"
            @click="closeModal"
          ><router-link
            v-cursor-interact
            :to="button.link.url|replaceSiteUrl"
            class="festival-23-btn"
          ><span v-html="button.link.title" /></router-link></span>
        </div>
      </Container>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FestivalTwentyThreeLanding',
  props: {
    closeModalHandler: {
      type: Function,
      default: null,
      required: false
    },
    settings: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.refreshEventive()
  },
  methods: {
    refreshEventive () {
      if (typeof window !== 'undefined' && window) {
        this.$nextTick(() => {
          setTimeout(() => {
            try {
              if (window.Eventive) {
                window.Eventive.rebuild()
              }
            } catch (e) {
            }
          }, 1000)
        })
      }
    },
    closeModal () {
      if (this.closeModalHandler) {
        this.closeModalHandler()
      }
    },
    openEventive (passId) {
      const eventiveBuyButton = this.$refs.passes.querySelector(`#pass-${passId}  .eventive-button button`)
      if (eventiveBuyButton) {
        eventiveBuyButton.click()
      } else {
        window.location = `https://festival.blackstarfest.org/passes/buy/${this.settings.passes[passId].eventive_id}`
      }
    }
  }
}
</script>

<style>
.festival-23-box-old h2,
.festival-23-box-old h3 {
  @apply text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-normal;
}

.festival-23-box-old p {
  @apply text-base xl:text-lg mt-8 mb-0 max-w-md;
}

.festival-23-box-old .festival-23-btn {
  @apply mt-16 xl:mt-32 mb-0;
}

.festival-23-btn-wrap {
  @apply flex mb-6 xl:mb-0 w-full md:w-auto justify-start;
}

@media only screen and (max-width: 767px) {
  .festival-23-btn-wrap {
    transform: none !important;
  }
}

.festival-23-btn {
  @apply flex relative;
}

.festival-23-btn:last-child {
  @apply mb-0;
}

.festival-23-btn span {
  @apply block py-6 px-4 xl:p-6 leading-none text-base xl:text-xl bg-bsf12Bg text-black flex-grow text-center;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);

  border-top: 1px solid transparent;
}

.festival-23-btn::before,
.festival-23-btn::after {
  @apply block w-4 h-full bg-bsf12Bg;

  content: " ";
}

.festival-23-btn:hover span {
  @apply bg-black text-white;
}

.festival-23-btn:hover::before,
.festival-23-btn:hover::after {
  @apply bg-black text-white;
}

.festival-23-btn::before {
  margin-right: -1px;
  clip-path: polygon(0 15%, 63% 0, 100% 0, 100% 100%, 63% 100%, 0 85%);
}

.festival-23-btn::after {
  margin-left: -1px;
  clip-path: polygon(37% 0, 100% 15%, 100% 85%, 37% 100%, 0% 100%, 0% 0%);
}

.festival-23-btn--inverse span,
.festival-23-btn--inverse::before,
.festival-23-btn--inverse::after {
  @apply bg-black text-white;
}

.festival-23-btn--inverse:hover span,
.festival-23-btn--inverse:hover::before,
.festival-23-btn--inverse:hover::after {
  @apply bg-bsf12Bg text-black;
}

.bsf22-lp-more .festival-23-btn {
  @apply w-64 md:w-auto;
}

</style>
